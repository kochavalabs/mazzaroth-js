/**
 * Client abstracting the typical actions taken to interact with the Mazzaroth
 * network. For the specifics of the XDR objects used in requests and response
 * for this client see: https://github.com/kochavalabs/mazzaroth-xdr.
 *
 * This client is a lower level tool for interacting with a node. If you would
 * like to simply call your contract with a simpler rpc-like client, consider
 * using the contract-client.
 *
*/
import Debug from 'debug'
import axios from 'axios'
import { sign, fromPrivate } from '../crypto/ecc-ed25519.js'
import * as types from 'mazzaroth-xdr'

const debug = Debug('mazzaroth-js:node-client')

const dPriv = '0'.repeat(64)

/**
 * Helper function using a heuristic to determine if the ID being used for a
 * function is a 64 char hex string or an int. This is necessary because we have
 * the ability to look up blocks by either the block number or the block ID.
 *
 * @param attribute Either an int or a hex string representing the identifying
 *                  property used to look up a block or block header
 *
 * @return JavaScript dict that can be used to create the XDR union used to lookup
 *         blocks.
*/
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

/**
 * Client used to interact with a Mazzaroth node by abstracting some of the
 * standard node operations. This includes encapsulating the node HTTP
 * endpoints, signing operations, and the creation of a properly formed HTTP
 * body.
 *
 * Operations available through the client include:
 *
 * - Transaction submission
 * - Block and Block Header lookup
 * - Read-only transaction lookup
 * - Transaction lookup
 * - Receipt lookup
 * - Account Info lookup
*/
class Client {
  /**
   * Handles some basic setup of metadata necessary for node-client operations.
   *
   * @param host HTTP endpoint for the Mazzaroth node to interact with. Defaults
   *             to http://localhost:8081.
   * @param privateKey Private account key for the Mazzaroth account interacting
   *                   with the mazzaroth node, not necessary for read-only
   *                   transactions.
   * @param signFunc Cryptographic function used to sign transactions sent to
   *                 the mazzaroth node. This defaults to the correct ed25519
   *                 signing function and should typically not be changed.
  */
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
    // Setup the routes for each of the node endpoints.
    this.transactionLookupRoute = '/transaction/lookup'
    this.transactionSubmitRoute = '/transaction/submit'
    this.ReadonlyRoute = '/readonly'
    this.blockLookupRoute = '/block/lookup'
    this.blockHeaderLookupRoute = '/block/header/lookup'
    this.receiptLookupRoute = '/receipt/lookup'
    this.nonceLookupRoute = '/account/nonce/lookup'
    this.accountInfoLookupRoute = '/account/info/lookup'
    this.contractInfoLookupRoute = '/contract/info/lookup'
    this.sign = signFunc || sign
  }

  /**
   * Submits a write transaction to a Mazzaroth node. These are transactions
   * that must be signed and will eventually be sent to the backing census
   * pool to be submitted to the blockchain. This includes transactions that
   * update channel state including contract updates and authorization
   * transactions. Write transactions are submitted asynchronously and the
   * results must be looked up by querying the Receipt for the transaction.
   *
   * @param action JavaScript dict to be converted into an XDR Action.
   * @param onBehalfOf Public key for the account that this transaction is being
   *                   sent on behalf of if transaction authorization is being
   *                   used.
   *
   * @return Promise that on success provides an XDR TransactionSubmitResponse
  */
  transactionSubmit (action, onBehalfOf) {
    debug('Sending transaction')
    debug('action: %o', action)
    debug('address: %o', this.publicKey.toString('hex'))
    debug('on behalf of: %o', onBehalfOf)
    let authority = { enum: 0, value: '' }
    action.address = this.publicKey.toString('hex')
    if (onBehalfOf) {
      authority = { enum: 1, value: this.publicKey.toString('hex') }
      action.address = onBehalfOf
    }
    const req = types.TransactionSubmitRequest()
    const actionXdr = types.Action()
    actionXdr.fromJSON(action)
    req.fromJSON({
      transaction: {
        signature: this.sign(this.privateKey, actionXdr.toXDR()).toString('hex'),
        signer: authority,
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

  /**
   * Submits a read-only transaction to a Mazzaroth node. Read-only transactions
   * do not update channel state so they will return a result immediately
   * without hitting the consensus pool.
   *
   * @param call JavaScript dict representing the XDR call, function name and
   *             args, to be sent to the read-only node.
   *
   * @return Promise that on success provides an XDR ReadonlyResponse
  */
  readonlySubmit (call) {
    debug('Sending read-only request')
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

  /**
   * Used to look up the status of a submitted write transaction.
   *
   * This is a synchronous read-only request hat will get the latest state based
   * on the non-consensus node that this lookup hits.
   *
   * @param txID Hex string (64 chars) identifier for the transaction submitted
   *             to the Mazzaroth consensus pool.
   *
   * @return Promise that on success provides an XDR TransactionLookupResponse
  */
  transactionLookup (txID) {
    debug('Looking up transaction with: %o', txID)
    const req = types.TransactionLookupRequest()
    req.fromJSON({
      transactionID: txID
    })
    const body = req.toXDR('base64')
    return axios
      .post(this.host + this.transactionLookupRoute, body)
      .then(res => {
        const result = types.TransactionLookupResponse()
        return result.fromXDR(res.data, 'base64')
      })
  }

  /**
   * Used to look up and return a block.
   *
   * This is a synchronous read-only request hat will get the latest state based
   * on the non-consensus node that this lookup hits.
   *
   * @param attribute Either a Number or a 64 char hex string identifying the
   *                  block to look up.
   *
   * @return Promise that on success provides an XDR BlockLookupResponse
  */
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

  /**
   * Used to look up and return a block header.
   *
   * This is a synchronous read-only request hat will get the latest state based
   * on the non-consensus node that this lookup hits.
   *
   * @param attribute Either a Number or a 64 char hex string identifying the
   *                  block header to look up.
   *
   * @return Promise that on success provides an XDR BlockLookupResponse
  */
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

  /**
   * Looks up a receipt for a particular transaction. A receipt represents that
   * a transaction was successfully executed on the consensus network and
   * contains the results of the execution.
   *
   * @param txID Hex string (64 chars) identifier for the transaction submitted
   *             to the Mazzaroth consensus pool.
   *
   * @return Promise that on success provides an XDR ReceiptLookupResponse
  */
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

  /**
   * Looks up the current nonce for an account. Every account has a atomically
   * increasing nonce for each executed transaction.
   *
   * This is a synchronous read-only request hat will get the latest state based
   * on the non-consensus node that this lookup hits.
   *
   * @param account Hex string for the address (public key) of the account to
   *                look up.
   *
   * @return Promise that on success provides an XDR AccountNonceLookupResponse
  */
  nonceLookup (account) {
    const toLookup = account || this.publicKey.toString('hex')
    debug('Looking up nonce for account: %o', toLookup)
    const nonceLookupRequest = types.AccountNonceLookupRequest()
    nonceLookupRequest.fromJSON({
      account: toLookup
    })
    const body = nonceLookupRequest.toXDR('base64')
    return axios
      .post(this.host + this.nonceLookupRoute, body)
      .then(res => {
        const result = types.AccountNonceLookupResponse()
        return result.fromXDR(res.data, 'base64')
      })
  }

  /**
   * Gets the account info for an account. Uses the public key created during
   * construction of the Client.
   *
   * @return Promise that on success provides an XDR AccountInfoLookupResponse
  */
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

  /**
   * Gets various config information about the channel.
   *
   * @param infoType Int enum value for what to look up about the contract.
   *          0 - None
   *          1 - Contract
   *          2 - Config
   *
   * @return Promise that on success provides an XDR ContractInfoLookupResponse
  */
  contractInfoLookup (infoType) {
    debug('Looking up info contract config.')
    const contractInfoLookup = types.ContractInfoLookupRequest()
    contractInfoLookup.fromJSON({
      infoType: infoType
    })
    const body = contractInfoLookup.toXDR('base64')
    return axios
      .post(this.host + this.contractInfoLookupRoute, body)
      .then(res => {
        const result = types.ContractInfoLookupResponse()
        return result.fromXDR(res.data, 'base64')
      })
  }
}

export default Client
