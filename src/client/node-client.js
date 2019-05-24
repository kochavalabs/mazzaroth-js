import Debug from 'debug'
import axios from 'axios'
import { sign } from '../crypto/ecc-ed25519.js'
import { TransactionFromObject, ActionFromObject, BlockLookupRequestFromAttribute, LargeToXDR } from '../xdr/convert.js'
import types from 'mazzaroth-xdr'

const debug = Debug('mazzeltov:node-client')

const dPub = '0'.repeat(64)
const dPriv = dPub

class Client {
  constructor (host, privateKey, publicKey, signFunc) {
    debug('host: %o', host)
    debug('private key: %o', privateKey)
    debug('public key: %o', privateKey)
    debug('sign: %o', sign)
    this.host = host || 'http://localhost:8081'
    this.host = this.host.replace(/\/+$/, '')
    this.privateKey = Buffer.from(privateKey || dPub, 'hex')
    this.publicKey = Buffer.from(publicKey || dPriv, 'hex')
    this.transactionLookupRoute = '/transaction/lookup'
    this.transactionSubmitRoute = '/transaction/submit'
    this.blockLookupRoute = '/block/lookup'
    this.blockHeaderLookupRoute = '/block/header/lookup'
    this.receiptLookupRoute = '/receipt/lookup'
    this.nonceLookupRoute = '/nonce/lookup'
    this.sign = signFunc || sign
  }

  transactionSubmit (action) {
    debug('Sending transaction')
    debug('action: %o', action)
    const actionXdr = ActionFromObject(action)
    const txObj = {
      signature: this.sign(this.privateKey, actionXdr.toXDR()),
      address: this.publicKey,
      action: action
    }
    const txXdr = TransactionFromObject(txObj)
    const request = new types.TransactionSubmitRequest()
    request.transaction(txXdr)

    const body = LargeToXDR(request, types.TransactionSubmitRequest).toString('base64')
    return axios
      .post(this.host + this.transactionSubmitRoute, body)
      .then(res => {
        return types.TransactionSubmitResponse.fromXDR(res.data, 'base64')
      })
  }

  transactionLookup (txID) {
    debug('Looking up transaction with: %o', txID)
    const requestXdr = new types.TransactionLookupRequest()
    requestXdr.transactionID(Buffer.from(txID, 'hex'))
    const body = requestXdr.toXDR('base64')
    return axios
      .post(this.host + this.transactionLookupRoute, body)
      .then(res => {
        return types.TransactionLookupResponse.fromXDR(res.data, 'base64')
      })
  }

  blockLookup (attribute) {
    debug('Looking up block with: %o', attribute)
    const body = BlockLookupRequestFromAttribute(attribute).toXDR('base64')
    return axios
      .post(this.host + this.blockLookupRoute, body)
      .then(res => {
        return types.BlockLookupResponse.fromXDR(res.data, 'base64')
      })
  }

  blockHeaderLookup (attribute) {
    debug('Looking up block header with: %o', attribute)
    const body = BlockLookupRequestFromAttribute(attribute).toXDR('base64')
    return axios
      .post(this.host + this.blockHeaderLookupRoute, body)
      .then(res => {
        return types.BlockHeaderLookupResponse.fromXDR(res.data, 'base64')
      })
  }

  receiptLookup (txID) {
    debug('Looking up receipt for txID: %o', txID)
    const requestXdr = new types.ReceiptLookupRequest()
    requestXdr.transactionID(Buffer.from(txID, 'hex'))
    const body = requestXdr.toXDR('base64')
    return axios
      .post(this.host + this.receiptLookupRoute, body)
      .then(res => {
        return types.ReceiptLookupResponse.fromXDR(res.data, 'base64')
      })
  }

  nonceLookup () {
    debug('Looking up nonce for account: %o', this.publicKey.toString('hex'))
    const nonceLookupRequest = new types.AccountNonceLookupRequest()
    nonceLookupRequest.account(this.publicKey)
    const body = nonceLookupRequest.toXDR('base64')
    return axios
      .post(this.host + this.nonceLookupRoute, body)
      .then(res => {
        return types.AccountNonceLookupResponse.fromXDR(res.data, 'base64')
      })
  }
}

export default Client
