import Debug from 'debug'
import axios from 'axios'
import { pb } from 'mazzaroth-proto'
import { sign } from '../crypto/ecc-ed25519.js'

const debug = Debug('mazzeltov:node-client')

function getBlockLookupRequestBody (attribute) {
  let requestBody = ''
  if ((typeof attribute) === 'number') {
    const request = pb.BlockLookupRequest.fromObject({ number: attribute })
    requestBody = JSON.stringify(request)
    debug('Looking up transaction by number: ' + requestBody)
  } else {
    const id = Buffer.from(attribute, 'base64')
    const request = pb.BlockLookupRequest.fromObject({ id: id })
    requestBody = JSON.stringify(request)
    debug('Looking up transaction by ID: ' + requestBody)
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
    this.privateKey = Buffer.from(privateKey || '', 'hex')
    this.publicKey = Buffer.from(publicKey || '', 'hex')
    this.transactionLookupRoute = '/transaction/lookup'
    this.transactionSubmitRoute = '/transaction/submit'
    this.blockLookupRoute = '/block/lookup'
    this.sign = signFunc || sign
  }

  transactionSubmit (txObj) {
    debug('Sending transaction: ' + txObj)
    const txProto = pb.Transaction.fromObject(txObj)
    const txBytes = pb.Transaction.encode(txProto).finish()
    const signedTx = pb.SignedTransaction.fromObject({
      transaction: txBytes,
      senderId: this.publicKey,
      signature: this.sign(this.privateKey, txBytes)
    })

    const request = pb.TransactionSubmitRequest.fromObject({
      transaction: signedTx
    })
    const body = JSON.stringify(request)
    return axios
      .post(this.host + this.transactionSubmitRoute, body)
      .then(res => {
        return pb.TransactionSubmitResponse.fromObject(res.data)
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
}

export default Client
