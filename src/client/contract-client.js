import types from 'mazzaroth-xdr'
import Debug from 'debug'
import { XdrToJson } from '../xdr/convert.js'

const debug = Debug('mazzeltov:contract-client')

function pollResult (txID, resolve, reject, nodeClient, resultFormat, xdrConfig, lookupRetries, lookupTimeout) {
  nodeClient.receiptLookup(txID).then(res => {
    if (lookupRetries === 0) {
      return reject(new Error('Request timeout.'))
    }
    if (res.status() === types.ReceiptLookupStatus.FOUND()) {
      if (res.receipt().status() === types.ReceiptStatus.SUCCESS()) {
        return resolve(XdrToJson(res.receipt().result(), resultFormat, xdrConfig))
      } else {
        return reject(new Error('Receipt status is FAILURE'))
      }
    }
    setTimeout(() => {
      pollResult(txID, resolve, reject, nodeClient, lookupRetries - 1, lookupTimeout)
    }, lookupTimeout)
  }).catch(err => reject(err))
}

class Client {
  constructor (abiJson, xdrConfig, nodeClient, lookupRetries, lookupTimeout) {
    debug('ABI Json: %o', abiJson)
    debug('XDR Config: %o', xdrConfig)
    debug('Retries %o', lookupRetries)
    debug('Timeout %o', lookupTimeout)
    lookupRetries = lookupRetries || 5
    lookupTimeout = lookupTimeout || 500

    abiJson.forEach((abiEntry) => {
      if (abiEntry.type === 'function') {
        this[abiEntry.name] = function (...args) {
          return new Promise((resolve, reject) => {
            debug('Calling contract fucntion: %o', abiEntry.name)
            debug('Call arguments: %o', args)
            if (args.length !== abiEntry.inputs.length) {
              return reject(new Error('Incorrect number of arguments.'))
            }
            nodeClient.nonceLookup().then(result => {
              debug('Nonce lookup returned with: %o', result)
              if (result.status() !== types.NonceLookupStatus.FOUND()) {
                return reject(new Error('Nonce lookup failed.'))
              }
              const action = {
                channelID: '0'.repeat(64),
                nonce: result.nonce(),
                call: {
                  function: abiEntry.name,
                  parameters: [[]]
                }
              }
              nodeClient.transactionSubmit(action).then(result => {
                debug('Transaction submit returned with: %o', result)
                if (result.status() !== types.TransactionStatus.ACCEPTED()) {
                  return reject(new Error('Transaction submission not accepted.'))
                }
                const txID = result.transactionID()
                pollResult(txID, resolve, reject, nodeClient, abiEntry.outputs[0], xdrConfig, lookupRetries, lookupTimeout)
              }).catch(err => reject(err))
            }).catch(err => reject(err))
          })
        }
      }
    })
  }
}

export default Client
