/**
 * Client that provides a further abstraction for interacting with Mazzaroth
 * nodes on top of the node-client. The idea is to build an object that you can
 * call contract functions on abstracting the details of the blockchain.
 *
 * For more information on building a rust contract with our provided libraries
 * that will help with the output needed for constructing a Contract Client,
 * see: https://github.com/kochavalabs/mazzaroth-rs
 *
 * For more information on using custom xdrTypes:
 * https://github.com/kochavalabs/mazzaroth-js
 *
*/
import fs from 'fs'
import types from 'xdr-js-serialize'
import Debug from 'debug'

const debug = Debug('mazzaroth-js:contract-client')

/**
 * Class that dynamically builds a new object with functions that can be called
 * in an rpc-like fashion to interact with a Mazzaroth node.
 *
*/
class Client {
  /**
   * Handles some basic setup of metadata necessary for contract-client
   * operations.
   *
   * @param abiJson Javascript object describing the ABI of the contract being
   *                called. An abiJSON is output when using mazzaroth-rs to
   *                build contracts.
   * @param nodeClient Node-client to use for node operations.
   * @param xdrTypes If using custom xdr types, xdr-codegen output is provided
   *                 here.
   * @param channelID Hex string, 64 chars, that is the ID of the channel being
   *                  called.
   * @param onBehalfOf Hex string, 64 chars, ID for the account being acted on
   *                   behalf of when using account authorization.
   * @param receiptTimeout Total amount of time to wait before giving up on receipt
  */
  constructor (abiJson, nodeClient, xdrTypes, channelID, onBehalfOf, receiptTimeout) {
    debug('ABI Json: %o', abiJson)
    debug('XDR Config: %o', xdrTypes)
    debug('Timeout %o', receiptTimeout)
    this.receiptTimeout = receiptTimeout || 3000
    this.channelID = channelID || '0'.repeat(64)
    this.onBehalfOf = onBehalfOf
    this.xdrTypes = xdrTypes || {}
    this.abiJson = abiJson
    this.nodeClient = nodeClient

    const functions = abiJson.filter(x => x.type === 'function')
    const readonlys = abiJson.filter(x => x.type === 'readonly')
    this._buildFunctions(functions)
    this._buildReadonlys(readonlys)
  }

  /**
   * Builds, dynamically defining for the contract-client, all the write
   * functions from the abiJson. These functions can be called on the contract
   * client as if they were normal functions and return promises that return
   * the end result (after subscribing to a receipt) of a contract execution.
   * General process is:
   *
   * Lookup the account nonce -> translate the args to XDR calls -> send a
   * transaction to the network -> subscribe to receipt -> return the result.
   *
   * @param functions The extracted write functions from the abiJson.
   *
   * @return none
  */
  _buildFunctions (functions) {
    functions.forEach((abiEntry) => {
      this[abiEntry.name] = async function (...args) {
        debug('Calling contract function: %o', abiEntry.name)
        debug('Call arguments: %o', args)
        if (args.length !== abiEntry.inputs.length) {
          throw new Error('Incorrect number of arguments.')
        }
        const nonceResult = await this.nodeClient.nonceLookup(this.onBehalfOf).then(x => x.toJSON())
        debug('Nonce lookup returned with: %o', nonceResult)
        if (nonceResult.status !== 1) {
          throw new Error('Nonce lookup failed.')
        }
        const params = []
        for (let i = 0; i < args.length; i++) {
          const type = abiEntry.inputs[i].type
          let arg = args[i]
          if (type === 'string' || type === 'uint64' || type === 'int64') {
            params.push(arg)
          } else if (this.xdrTypes[type] !== undefined) {
            const p = getXDRObject(abiEntry.inputs[i], this.xdrTypes)
            if (p === undefined) {
              throw new Error('Type not identified: ' + type)
            }
            if (typeof arg === 'object') {
              arg = processObjectArg(arg)
              if (arg instanceof Error) {
                throw arg
              }
            }
            if (typeof arg === 'string') {
              arg = JSON.parse(arg)
            }
            p.fromJSON(arg)
            params.push(JSON.stringify(p.toJSON()))
          }
        }
        const action = {
          channelID: this.channelID,
          nonce: nonceResult.nonce,
          category: {
            enum: 1,
            value: {
              function: abiEntry.name,
              parameters: params
            }
          }
        }
        const receipt = await this.nodeClient.transactionForReceipt(action, this.onBehalfOf, this.receiptTimeout).then(x => x.toJSON())
        const returnType = abiEntry.outputs[0].type
        if (receipt.status !== 1) {
          throw new Error('Receipt had bad status: ' + receipt.status)
        }
        if (returnType === 'string' || returnType === 'uint64' || returnType === 'int64') {
          return receipt.result
        }
        const r = getXDRObject(abiEntry.outputs[0], this.xdrTypes)
        if (r === undefined) {
          throw new Error('Type not identified: ' + returnType)
        }
        const jsResult = JSON.parse(receipt.result)
        r.fromJSON(jsResult)
        return jsResult
      }
    })
  }

  /**
   * Builds, dynamically defining for the contract-client, all the readonly
   * functions from the abiJson. These functions can be called on the contract
   * client as if they were normal functions and return promises that return
   * the end result of the readonly request.
   *
   * Translate the args to XDR calls -> send a readonly request to the
   * Mazzaroth node specified in the node-client -> parse and return the
   * response.
   *
   * transaction to the network -> return the result.
   *
   * @param functions The extracted readonly functions from the abiJson.
   *
   * @return none
  */
  _buildReadonlys (readonlys) {
    readonlys.forEach((abiEntry) => {
      this[abiEntry.name] = async function (...args) {
        debug('Calling readonly function: %o', abiEntry.name)
        debug('Call arguments: %o', args)
        if (args.length !== abiEntry.inputs.length) {
          throw new Error('Incorrect number of arguments.')
        }
        const params = []
        for (let i = 0; i < args.length; i++) {
          const type = abiEntry.inputs[i].type
          let arg = args[i]
          if (type === 'string' || type === 'uint64' || type === 'int64') {
            params.push(arg)
          } else if (this.xdrTypes[type] !== undefined) {
            const p = getXDRObject(abiEntry.inputs[i], this.xdrTypes)
            if (p === undefined) {
              throw new Error('Type not identified: ' + type)
            }
            if (typeof arg === 'object') {
              arg = processObjectArg(arg)
              if (arg instanceof Error) {
                throw arg
              }
            }
            if (typeof arg === 'string') {
              arg = JSON.parse(arg)
            }
            p.fromJSON(arg)
            params.push(p.toJSON('base64'))
          }
        }

        const call = {
          function: abiEntry.name,
          parameters: params
        }
        const res = await this.nodeClient.readonlySubmit(call).then(x => x.toJSON())
        debug('Redonly submit response: %o', res)
        if (res.status !== 1) {
          throw new Error('Readonly status was bad: ' + res.status)
        }
        const resultFormat = abiEntry.outputs[0]
        // If the return is not a special type, just resolve the result
        if (resultFormat.type === 'string' || resultFormat.type === 'uint64' || resultFormat.type === 'int64') {
          return res.result
        }

        // Otherwise parse the json result
        const r = getXDRObject(resultFormat, this.xdrTypes)
        if (r === undefined) {
          throw new Error('Type not identified: ' + resultFormat.type)
        }
        const jsDict = JSON.parse(res.result)
        r.fromJSON(jsDict)
        return jsDict
      }
    })
  }
}

/**
 * Returns an XDR type based on the type defined in the abiJson.
 *
 * @param output The string defined in abijson for the contract type.
 * @param xdrTypes The custom xdr types for the contract
 *
 * @return XDR type for the specified type.
*/
export function getXDRObject (output, xdrTypes) {
  if (!output) {
    return new types.Void()
  }
  const typeStr = output.type
  const baseType = typeStr.replace('[]', '')
  let XdrType
  switch (baseType) {
    case 'bool':
      XdrType = types.Bool
      break
    case 'int32':
      XdrType = types.Int
      break
    case 'uint32':
      XdrType = types.UInt
      break
    case 'int64':
      XdrType = types.Hyper
      break
    case 'uint64':
      XdrType = types.UHyper
      break
    case 'f32':
      XdrType = types.Float
      break
    case 'f64':
      XdrType = types.Double
      break
    case 'string':
      XdrType = types.Str
      break
    case 'bytes':
      return new types.VarOpaque()
    default:
      XdrType = xdrTypes[baseType]
  }
  if (XdrType === undefined) {
    return undefined
  }
  if (baseType + '[]' === typeStr) {
    return new types.VarArray(Math.pow(2, 32) - 1, () => { return new XdrType() })
  }
  return new XdrType()
}

/**
 * There are custom types that can be passed to the contract client. For example
 * some contracts define complex types as argument which can be passed as a file
 * path to be read and used as an argument. This is primarily used with the
 * contract-cli. https://github.com/kochavalabs/mazzaroth-cli
 *
 * @param custom arg type, currently only supporting a 'file' type.
 *
 * @return Javascript object or error on failure.
*/
function processObjectArg (arg) {
  // For a 'file' type argument, read the file and return it as parsed JSON.
  if (arg._type === 'file') {
    const fileContent = fs.readFileSync(arg.value).toString('utf-8')
    return JSON.parse(fileContent)
  }
  return arg
}

export default Client
