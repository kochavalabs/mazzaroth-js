import types from 'js-xdr'
import Debug from 'debug'

const debug = Debug('mazzeltov:contract-client')
class Client {
  constructor (abiJson, nodeClient, xdrTypes, channelID, lookupRetries, lookupTimeout) {
    debug('ABI Json: %o', abiJson)
    debug('XDR Config: %o', xdrTypes)
    debug('Retries %o', lookupRetries)
    debug('Timeout %o', lookupTimeout)
    this.lookupRetries = lookupRetries || 5
    this.lookupTimeout = lookupTimeout || 500
    this.channelID = channelID || '0'.repeat(64)
    this.xdrTypes = xdrTypes || {}
    this.abiJson = abiJson
    this.nodeClient = nodeClient

    const functions = abiJson.filter(x => x.type === 'function')
    const readonlys = abiJson.filter(x => x.type === 'readonly')
    this._buildFunctions(functions)
    this._buildReadonlys(readonlys)
  }

  _buildFunctions (functions) {
    functions.forEach((abiEntry) => {
      if (abiEntry.type === 'function') {
        this[abiEntry.name] = function (...args) {
          return new Promise((resolve, reject) => {
            debug('Calling contract fucntion: %o', abiEntry.name)
            debug('Call arguments: %o', args)
            if (args.length !== abiEntry.inputs.length) {
              return reject(new Error('Incorrect number of arguments.'))
            }
            this.nodeClient.nonceLookup().then(result => {
              result = result.toJSON()
              debug('Nonce lookup returned with: %o', result)
              if (result.status !== 1) {
                return reject(new Error('Nonce lookup failed.'))
              }
              const params = []
              for (let i = 0; i < args.length; i++) {
                const type = abiEntry.inputs[i].type
                let p = getBaseType(abiEntry.inputs[i])
                if (this.xdrTypes[type] !== undefined) {
                  p = this.xdrTypes[type]()
                }
                if (p === undefined) {
                  return reject(Error('Type not identified: ' + type))
                }
                p.fromJSON(args[i])
                params.push(p.toXDR('base64'))
              }
              const action = {
                channelID: this.channelID,
                nonce: result.nonce,
                category: {
                  enum: 1,
                  value: {
                    function: abiEntry.name,
                    parameters: params
                  }
                }
              }
              this.nodeClient.transactionSubmit(action).then(result => {
                result = result.toJSON()
                debug('Transaction submit returned with: %o', result)
                if (result.status !== 1) {
                  return reject(new Error('Transaction submission not accepted.'))
                }
                const txID = result.transactionID
                pollResult(txID, resolve, reject, this.nodeClient, abiEntry.outputs[0], this.xdrTypes, this.lookupRetries, this.lookupTimeout)
              }).catch(err => reject(err))
            }).catch(err => reject(err))
          })
        }
      }
    })
  }

  _buildReadonlys (readonlys) {
    console.log(readonlys)
  }
}

function getBaseType (output) {
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
      return undefined
  }
  if (baseType + '[]' === typeStr) {
    return new types.VarArray(Math.pow(2, 32) - 1, () => { return new XdrType() })
  }
  return new XdrType()
}

function pollResult (txID, resolve, reject, nodeClient, resultFormat, xdrTypes, lookupRetries, lookupTimeout) {
  nodeClient.receiptLookup(txID).then(res => {
    res = res.toJSON()
    debug('Receipt lookup result: %o', res)
    if (lookupRetries === 0) {
      return reject(new Error('Request timeout.'))
    }
    if (res.status === 1) {
      if (res.receipt.status === 1) {
        let r = getBaseType(resultFormat)
        if (xdrTypes[resultFormat] !== undefined) {
          r = xdrTypes[resultFormat]()
        }
        if (r === undefined) {
          return reject(Error('Type not identified: ' + resultFormat))
        }
        r.fromXDR(res.receipt.result)
        return resolve(r.toJSON())
      } else {
        return reject(new Error('Receipt status is FAILURE'))
      }
    }
    setTimeout(() => {
      pollResult(txID, resolve, reject, nodeClient, resultFormat, xdrTypes, lookupRetries - 1, lookupTimeout)
    }, lookupTimeout)
  }).catch(err => reject(err))
}

export default Client
