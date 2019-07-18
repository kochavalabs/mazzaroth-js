import Debug from 'debug'
import axios from 'axios'
import { sign, fromPrivate } from '../crypto/ecc-ed25519.js'
import * as types from 'mazzaroth-xdr'

const debug = Debug('mazzeltov:node-client')

const dPub = '0'.repeat(64)
const dPriv = dPub

function attributeToIdentifier (attribute) {
  if (attribute.length !== 64) {
    return {
      enum: 1,
      value: attribute
    }
  }
  return {
    enum: 2,
    value: attribute
  }
}

class Client {
  constructor (host, privateKey, signFunc) {
    debug('host: %o', host)
    debug('private key: %o', privateKey)
    debug('sign: %o', sign)

    this.privateKey = Buffer.from(privateKey || dPriv, 'hex')
    // Get Public key
    const publicKey = fromPrivate(this.privateKey)

    debug('public key: %o', publicKey.toString('hex'))
    this.host = host || 'http://localhost:8081'
    this.host = this.host.replace(/\/+$/, '')
    this.publicKey = publicKey
    this.transactionLookupRoute = '/transaction/lookup'
    this.transactionSubmitRoute = '/transaction/submit'
    this.ReadonlyRoute = '/readonly'
    this.blockLookupRoute = '/block/lookup'
    this.blockHeaderLookupRoute = '/block/header/lookup'
    this.receiptLookupRoute = '/receipt/lookup'
    this.nonceLookupRoute = '/account/nonce/lookup'
    this.accountInfoLookupRoute = '/account/info/lookup'
    this.sign = signFunc || sign
  }

  transactionSubmit (action) {
    debug('Sending transaction')
    debug('action: %o', action)
    debug('address: %o', this.publicKey.toString('hex'))
    const req = types.TransactionSubmitRequest()
    const actionXdr = types.Action()
    actionXdr.fromJSON(action)
    req.fromJSON({
      transaction: {
        signature: this.sign(this.privateKey, actionXdr.toXDR()).toString('hex'),
        address: this.publicKey.toString('hex'),
        action: action
      }
    })
    const body = req.toXDR('base64')
    return axios
      .post(this.host + this.transactionSubmitRoute, body)
      .then(res => {
        const result = types.TransactionSubmitResponse()
        return result.fromXDR(res.data, 'base64')
      })
  }

  readonlySubmit (call) {
    debug('Sending readonly request')
    debug('call: %o', call)
    const req = types.ReadonlyRequest()
    req.fromJSON({
      call: call
    })
    const body = req.toXDR('base64')
    return axios
      .post(this.host + this.ReadonlyRoute, body)
      .then(res => {
        const result = types.ReadonlyResponse()
        return result.fromXDR(res.data, 'base64')
      })
  }

  transactionLookup (txID) {
    debug('Looking up transaction with: %o', txID)
    const req = types.TransactionLookupRequest()
    req.fromJSON({
      transactionID: txID
    })
    const body = types.TransactionLookupRequest().toXDR('base64')
    return axios
      .post(this.host + this.transactionLookupRoute, body)
      .then(res => {
        const result = types.TransactionLookupResponse()
        return result.fromXDR(res.data, 'base64')
      })
  }

  blockLookup (attribute) {
    debug('Looking up block with: %o', attribute)
    const req = types.BlockLookupRequest()
    req.fromJSON({
      ID: attributeToIdentifier(attribute)
    })
    const body = req.toXDR('base64')
    return axios
      .post(this.host + this.blockLookupRoute, body)
      .then(res => {
        const result = types.BlockLookupResponse()
        return result.fromXDR(res.data, 'base64')
      })
  }

  blockHeaderLookup (attribute) {
    debug('Looking up block header with: %o', attribute)
    const req = types.BlockHeaderLookupRequest()
    req.fromJSON({
      ID: attributeToIdentifier(attribute)
    })
    const body = req.toXDR('base64')
    return axios
      .post(this.host + this.blockHeaderLookupRoute, body)
      .then(res => {
        const result = types.BlockHeaderLookupResponse()
        return result.fromXDR(res.data, 'base64')
      })
  }

  receiptLookup (txID) {
    debug('Looking up receipt for txID: %o', txID)
    const requestXdr = types.ReceiptLookupRequest()
    requestXdr.fromJSON({
      transactionID: txID
    })
    const body = requestXdr.toXDR('base64')
    return axios
      .post(this.host + this.receiptLookupRoute, body)
      .then(res => {
        const result = types.ReceiptLookupResponse()
        return result.fromXDR(res.data, 'base64')
      })
  }

  nonceLookup () {
    debug('Looking up nonce for account: %o', this.publicKey.toString('hex'))
    const nonceLookupRequest = types.AccountNonceLookupRequest()
    nonceLookupRequest.fromJSON({
      account: this.publicKey.toString('hex')
    })
    const body = nonceLookupRequest.toXDR('base64')
    return axios
      .post(this.host + this.nonceLookupRoute, body)
      .then(res => {
        const result = types.AccountNonceLookupResponse()
        return result.fromXDR(res.data, 'base64')
      })
  }

  accountInfoLookup () {
    debug('Looking up info for account: %o', this.publicKey.toString('hex'))
    const infoLookupRequest = types.AccountInfoLookupRequest()
    infoLookupRequest.fromJSON({
      account: this.publicKey.toString('hex')
    })
    const body = infoLookupRequest.toXDR('base64')
    return axios
      .post(this.host + this.accountInfoLookupRoute, body)
      .then(res => {
        const result = types.AccountInfoLookupResponse()
        return result.fromXDR(res.data, 'base64')
      })
  }
}

export default Client
