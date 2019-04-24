import Debug from 'debug'
import axios from 'axios'
import { pb } from 'mazzaroth-proto'
import { sign } from '../crypto/ecc-ed25519.js'
import { TransactionFromObject, ActionFromObject } from '../../src/xdr/convert.js'
import types from 'mazzaroth-xdr'

const debug = Debug('mazzeltov:node-client')

const dPub = '0000000000000000000000000000000000000000000000000000000000000000'
const dPriv = dPub

function getBlockLookupRequestBody (attribute) {
  let requestBody = ''
  if ((typeof attribute) === 'number') {
    const request = pb.BlockLookupRequest.fromObject({ number: attribute })
    requestBody = JSON.stringify(request)
    debug('Looking up block by number: ' + requestBody)
  } else {
    const id = Buffer.from(attribute, 'base64')
    const request = pb.BlockLookupRequest.fromObject({ id: id })
    requestBody = JSON.stringify(request)
    debug('Looking up block by ID: ' + requestBody)
  }
  return requestBody
}

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

    const body = request.toXDR('base64')
    return axios
      .post(this.host + this.transactionSubmitRoute, body)
      .then(res => {
        return types.TransactionSubmitResponse.fromXDR(res.data, 'base64')
      })
  }

  transactionLookup (txID) {
    debug('Looking up transaction: ' + txID)
    const request = pb.TransactionLookupRequest.fromObject({ id: txID })
    debug(request)
    const body = JSON.stringify(request)
    return axios
      .post(this.host + this.transactionLookupRoute, body)
      .then(res => {
        return pb.TransactionLookupResponse.fromObject(res.data)
      })
  }

  blockLookup (attribute) {
    const body = getBlockLookupRequestBody(attribute)
    return axios
      .post(this.host + this.blockLookupRoute, body)
      .then(res => {
        return pb.BlockLookupResponse.fromObject(res.data)
      })
  }

  blockHeaderLookup (attribute) {
    const body = getBlockLookupRequestBody(attribute)
    return axios
      .post(this.host + this.blockHeaderLookupRoute, body)
      .then(res => {
        return pb.BlockHeaderLookupResponse.fromObject(res.data)
      })
  }
}

export default Client
