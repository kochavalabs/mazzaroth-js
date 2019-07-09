import Debug from 'debug'
import NodeClient from './node-client.js'
import { ExecutionPlan } from 'mazzaroth-xdr'

const debug = Debug('mazzeltov:client-utils')

function pollResult (txID, resolve, reject, nodeClient, lookupRetries, lookupTimeout) {
  nodeClient.receiptLookup(txID).then(res => {
    res = res.toJSON()
    debug('Receipt lookup result: %o', res)
    if (lookupRetries === 0) {
      return reject(new Error('Request timeout.'))
    }
    if (res.status === 1) {
      if (res.receipt.status === 1) {
        return resolve(res.receipt.result)
      } else {
        return reject(new Error('Receipt status is FAILURE'))
      }
    }
    setTimeout(() => {
      pollResult(txID, resolve, reject, nodeClient, lookupRetries - 1, lookupTimeout)
    }, lookupTimeout)
  }).catch(err => reject(err))
}

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

export function RunExecutionPlan (plan, privKey, progress, client) {
  if ((typeof plan) === 'string') {
    plan = JSON.parse(plan)
  }
  const nodeClient = client || new NodeClient(plan.host, privKey)
  ExecutionPlan().fromJSON(plan)
  if (plan.calls.length === 0) {
    throw new Error('Execution plan must have at least one call.')
  }
  let p = Promise.resolve()
  const prog = progress || function () {}
  plan.calls.forEach((call) => {
    p = p.then((res) => {
      prog(res)
      const action = {
        channelID: plan.channelID,
        nonce: null,
        category: {
          enum: 1,
          value: call
        }
      }
      return TransactionForResult(nodeClient, action)
    })
  })
  p = p.then(res => {
    prog(res)
    return res
  })
  return p
}
