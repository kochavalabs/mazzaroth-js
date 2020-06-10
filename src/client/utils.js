/**
 * Common utility functions used by the Mazzaroth Client.
 *
*/
import Debug from 'debug'
import NodeClient from './node-client.js'
import * as types from 'mazzaroth-xdr'

const debug = Debug('mazzaroth-js:client-utils')

/**
 * Polls a node for the result of a specific transaction. Does this by
 * repeatedly checking for a transaction's receipt. Calls the resolve/reject
 * functions based on the results of the polling.
 *
 * @param txID The hex identifier of the transaction to look up a receipt for.
 * @param resolve Promise function to resolve upon success.
 * @param reject Promise function to reject upon failure.
 * @param nodeClient Client to use during receipt lookup.
 * @param lookupRetries Number of times to poll before returning a failure.
 * @param lookupTimeout Ammount of time in ms to wait between requests.
 *
 * @return none
*/
function pollResult (txID, resolve, reject, nodeClient, lookupRetries, lookupTimeout) {
  nodeClient.receiptLookup(txID).then(res => {
    res = res.toJSON()
    debug('Receipt lookup result: %o', res)
    if (res.status === 1) {
      if (res.receipt.status === 1) {
        return resolve(res.receipt.result)
      } else {
        return reject(new Error('Receipt status is FAILURE'))
      }
    }
    if (lookupRetries === 0) {
      return reject(new Error('Request timeout.'))
    }
    setTimeout(() => {
      pollResult(txID, resolve, reject, nodeClient, lookupRetries - 1, lookupTimeout)
    }, lookupTimeout)
  }).catch(err => reject(err))
}

/**
 * It is common that a user of Mazzaroth would like to execute a transaction and
 * get the results of the transaction. This requires looking up the account
 * nonce as well as collecting the results of the transaction.
 *
 * @param nodeClient Node-client to use for node operations.
 * @param action Javascript dict to be converted into an XDR Action.
 * @param lookupRetries Number of times to poll before returning a failure.
 * @param lookupTimeout Ammount of time in ms to wait between requests.
 *
 * @return Promise that on success provides an XDR ReceiptLookupResponse
*/
export function TransactionForResult (nodeClient, action, lookupRetries = 5, lookupTimeout = 500) {
  return new Promise((resolve, reject) => {
    nodeClient.nonceLookup().then(result => {
      result = result.toJSON()
      debug('Nonce lookup returned with: %o', result)
      if (result.status !== 1) {
        return reject(new Error('Nonce lookup failed.'))
      }
      action.nonce = result.nonce
      nodeClient.transactionSubmit(action).then(result => {
        result = result.toJSON()
        debug('Transaction submit returned with: %o', result)
        if (result.status !== 1) {
          return reject(new Error('Transaction submission not accepted.'))
        }
        const txID = result.transactionID
        pollResult(txID, resolve, reject, nodeClient, lookupRetries, lookupTimeout)
      }).catch(err => reject(err))
    }).catch(err => reject(err))
  })
}

/**
 * Runs a Mazzaroth execution plan. An execution plan is a series of function
 * calls to be executed against a channel contract. It is defined as an XDR
 * object in the mazzaroth-xdr repository.
 *
 * @param plan XDR execution plan.
 * @param privKey Private key to use in the node-client construction.
 * @param progress Callback that returns the result of each execution in the
 *                 plan.
 * @param client Node-client to use for node operations.
 *
 * @return A promise that fails/succeeds base on the success of the execution
 *         plan.
*/
export function RunExecutionPlan (plan, privKey, progress, client) {
  if ((typeof plan) === 'string') {
    plan = JSON.parse(plan)
  }
  const nodeClient = client || new NodeClient(plan.host, privKey)
  types.ExecutionPlan().fromJSON(plan)
  if (plan.actions.length === 0) {
    throw new Error('Execution plan must have at least one call.')
  }
  let p = Promise.resolve()
  const prog = progress || function () {}
  plan.actions.forEach((action) => {
    p = p.then((res) => {
      prog(res)
      return TransactionForResult(nodeClient, action)
    })
  })
  p = p.then(res => {
    prog(res)
    return res
  })
  return p
}

/**
 * Translates a json string to a base64 XDR representation of the supplied data
 * type. If the json string is not complete, the function will do its best to
 * interpolate the json properties into a default XDR object.
 *
 * @param input string json string to convert to XDR
 * @param type string xdr object from mazzaroth-xdr i.e. 'Transaction'
 * @return string base64 representation of XDR binary
*/
export function JSONtoXDR (input, type) {
  if (types[type] === undefined) {
    throw new Error(`Could not identify type '${type}'`)
  }
  const xdrObj = types[type]()
  const xdrJSON = xdrObj.toJSON()
  const result = Object.assign(
    {},
    xdrJSON,
    JSON.parse(input)
  )
  xdrObj.fromJSON(result)
  return JSON.stringify(result)
}

/**
 * Translates an xdr string to a json string  XDR representation of the
 * supplied data  type.
 *
 * @param input string xdr representation matching the arg format
 * @param type string xdr object from mazzaroth-xdr i.e. 'Transaction'
 * @param format data string format base64/hex
 * @return string json string representation of XDR object
*/
export function XDRtoJSON (input, type, format) {
  if (types[type] === undefined) {
    throw new Error(`Could not identify type '${type}'`)
  }
}

/**
 * Translates a simpler javascript object to the proper xdr object necessary to
 * subscribe to receipts on a Mazzaroth readonly Node. Format:
 *
 * {
 *  receiptFilter: { status: 1, stateRoot: '0'.repeat(64)   }
 *  transactionFilter: {
 *    signature: '0'.repeat(128),
 *    signer: '0'.repeat(64),
 *    address: '0'.repeat(64),
 *    channelID: '0'.repeat(64),
 *    nonce: '123',
 *    contractFilter: {version: '.*'},
 *    configFilter: {},
 *    permissionFilter: {key: '0'.repeat(64), action: 1 },
 *    callFilter: {function: '.*'},
 *  }
 * }
 *
 * @param sub Javascript object to be translated to an xdr ReceiptSubscription
 * @return ReceiptSubscription
*/
export function BuildReceiptSubscription (sub) {
  const r = types.ReceiptSubscription().toJSON()
  if (sub.receiptFilter !== undefined) {
    r.receiptFilter.enum = 1
    r.receiptFilter.value = {}
    r.receiptFilter.value.status = valFil(5, sub.receiptFilter.status)
    r.receiptFilter.value.stateRoot = valFil(2, sub.receiptFilter.stateRoot)
  }

  if (sub.transactionFilter === undefined) {
    return types.ReceiptSubscription().fromJSON(r)
  }

  const actionFilter = {}
  actionFilter.signature = valFil(3, sub.transactionFilter.signature)
  actionFilter.signer = valFil(2, sub.transactionFilter.signer)
  actionFilter.address = valFil(2, sub.transactionFilter.address)
  actionFilter.channelID = valFil(2, sub.transactionFilter.channelID)
  actionFilter.nonce = valFil(4, sub.transactionFilter.nonce)

  r.transactionFilter.enum = 1
  r.transactionFilter.value = actionFilter

  if (sub.transactionFilter.contractFilter !== undefined) {
    r.transactionFilter.enum = 2
    r.transactionFilter.value = {}
    r.transactionFilter.value.actionFilter = actionFilter
    r.transactionFilter.value.version = valFil(1, sub.transactionFilter.contractFilter.version)
  }

  if (sub.transactionFilter.configFilter !== undefined) {
    r.transactionFilter.enum = 3
    r.transactionFilter.value = {}
    r.transactionFilter.value.actionFilter = actionFilter
  }

  if (sub.transactionFilter.permissionFilter !== undefined) {
    r.transactionFilter.enum = 4
    r.transactionFilter.value = {}
    r.transactionFilter.value.actionFilter = actionFilter
    r.transactionFilter.value.key = valFil(2, sub.transactionFilter.permissionFilter.key)
    r.transactionFilter.value.action = valFil(5, sub.transactionFilter.permissionFilter.action)
  }

  if (sub.transactionFilter.callFilter !== undefined) {
    r.transactionFilter.enum = 5
    r.transactionFilter.value = {}
    r.transactionFilter.value.actionFilter = actionFilter
    r.transactionFilter.value.function = valFil(1, sub.transactionFilter.callFilter.function)
  }

  return types.ReceiptSubscription().fromJSON(r)
}

/**
 * Helper function contructing a value filter from a value.
 *
 *   NONE = 0,
 *   STRING = 1,
 *   HASH32 = 2,
 *   HASH64 = 3,
 *   UHYPER = 4,
 *   INT = 5,
*/
function valFil (enu, val) {
  if (val === undefined) {
    return types.ValueFilter().toJSON()
  }
  return { enum: enu, value: val }
}
