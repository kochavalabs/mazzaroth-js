/**
 * Common utility functions used by the Mazzaroth Client.
 *
*/
import Debug from 'debug'
import NodeClient from './node-client.js'
import { ExecutionPlan } from 'mazzaroth-xdr'

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
  ExecutionPlan().fromJSON(plan)
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
