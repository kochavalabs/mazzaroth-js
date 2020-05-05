import NodeClient from './client/node-client.js'
import ContractClient from './client/contract-client.js'
import { ReceiptSubscriptionResult } from 'mazzaroth-xdr'
import { RunExecutionPlan, BuildReceiptSubscription } from './client/utils.js'
import { fromPrivate, generateKeys } from './crypto/ecc-ed25519.js'

let Socket = WebSocket

if (Socket === null) {
  Socket = require('ws')
}

function AccountGenerate () {
  return generateKeys()
}

function AddressFromPrivate (priv) {
  return fromPrivate(priv)
}

function ReceiptSubscribe (host, subscriptionObject, onMessage) {
  const ws = new Socket(`ws://${host}/subscribe/receipt`)
  ws.onopen = function () {
    const subscription = BuildReceiptSubscription(subscriptionObject)
    ws.send(subscription.toXDR('base64'))
  }
  ws.onmessage = function (e) {
    const result = ReceiptSubscriptionResult()
    result.fromXDR(e.data, 'base64')
    onMessage(result.toJSON())
  }
}

export { NodeClient, ContractClient, AccountGenerate, RunExecutionPlan, AddressFromPrivate, ReceiptSubscribe }
