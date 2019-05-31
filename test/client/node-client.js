import { describe, it } from 'mocha'
import { expect } from 'chai'
import nock from 'nock'
import { TransactionFromObject, BlockLookupRequestFromAttribute } from '../../src/xdr/convert.js'
import { UnsignedHyper } from 'js-xdr'
import types from 'mazzaroth-xdr'
import { fromPrivate } from '../../src/crypto/ecc-ed25519.js'

import NodeClient from '../../src/client/node-client.js'

const defaultRoute = 'http://localhost:8081'

const x256 = '3a547668e859fb7b112a1e2dd7efcb739176ab8cfd1d9f224847fce362ebd99c'
const x512 = x256 + x256
const base64 = '9uZzPoEf1zsfABG7J6toIMio3VMY8eQnErkZTCURMu8/uwZNKkvmyBsjQBs/BWg'
const txObject = {
  signature: x512,
  address: x256,
  action: {
    channelID: x256,
    nonce: 3,
    update: {
      contract: base64
    }
  }
}

function fakeSign (ex1, ex2) {
  return (key, toSign) => {
    expect(ex1).to.deep.equal(key)
    expect(ex2).to.deep.equal(toSign)
    return x512
  }
}

describe('node client test', () => {
  describe('construction', () => {
    it('should pass values', () => {
      const client = new NodeClient(defaultRoute, 'ff01', 'a')
      expect(client.host).to.equal(defaultRoute)
      expect(client.privateKey).to.deep.equal(Buffer.from([255, 1]))
      expect(client.sign).to.equal('a')
    })

    it('clean up host with slash', () => {
      let client = new NodeClient(defaultRoute + '/')
      expect(client.host).to.equal(defaultRoute)
      client = new NodeClient('http://localhost////')
      expect(client.host).to.equal('http://localhost')
    })

    it('accept buffer for key', () => {
      const client = new NodeClient(
        defaultRoute,
        Buffer.from([1, 3, 4])
      )
      expect(client.privateKey).to.deep.equal(Buffer.from([1, 3, 4]))
    })
  })

  describe('transaction lookup', () => {
    it('full request flow', (done) => {
      const requestXdr = new types.TransactionLookupRequest()
      requestXdr.transactionID(Buffer.from(x256, 'hex'))
      const respXdr = new types.TransactionLookupResponse()
      const txXdr = TransactionFromObject(txObject)
      respXdr.transaction(txXdr)
      respXdr.status(types.TransactionStatus.ACCEPTED())
      respXdr.statusInfo('status was good.')
      nock(defaultRoute)
        .post('/transaction/lookup', requestXdr.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))
      const client = new NodeClient()
      client.transactionLookup(x256)
        .then(resp => {
          expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
          done()
        })
    })
  })

  describe('transaction submit', () => {
    it('full request flow', (done) => {
      const respXdr = new types.TransactionSubmitResponse()
      respXdr.transactionID(Buffer.from(x256, 'hex'))
      respXdr.status(types.TransactionStatus.ACCEPTED())
      respXdr.statusInfo('status was good.')

      const privKey = Buffer.from([1, 4, 5, 5])
      const pubKey = fromPrivate(privKey)
      const request = {
        signature: x512,
        address: pubKey,
        action: {
          channelID: x256,
          nonce: 3,
          update: {
            contract: base64
          }
        }
      }
      const txXdr = TransactionFromObject(request)

      const expectedBody = new types.TransactionSubmitRequest()
      expectedBody.transaction(txXdr)
      nock(defaultRoute)
        .post('/transaction/submit', expectedBody.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))

      const client = new NodeClient(
        defaultRoute, privKey,
        fakeSign(privKey, txXdr.action().toXDR())
      )

      client.transactionSubmit(txObject.action).then(resp => {
        expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
        done()
      })
    })
  })

  describe('block lookup', () => {
    function getBlockHeader () {
      const header = new types.BlockHeader()
      const hashBuffer = Buffer.from(x256, 'hex')
      header.timestamp('asdf')
      header.blockHeight(new UnsignedHyper(3))
      header.txMerkleRoot(hashBuffer)
      header.txReceiptRoot(hashBuffer)
      header.stateRoot(hashBuffer)
      header.previousHeader(hashBuffer)
      header.blockProducerAddress(hashBuffer)
      return header
    }

    function getBlock () {
      const block = new types.Block()
      block.header(getBlockHeader())
      block.transactions([])
      return block
    }

    it('block lookup request flow', (done) => {
      const request = BlockLookupRequestFromAttribute(1)
      const respXdr = new types.BlockLookupResponse()
      const blockXdr = getBlock()
      respXdr.block(blockXdr)
      respXdr.status(types.BlockStatus.CREATED())
      respXdr.statusInfo('status was good.')
      nock(defaultRoute)
        .post('/block/lookup', request.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))
      const client = new NodeClient()
      client.blockLookup(1)
        .then(resp => {
          expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
          done()
        })
    })

    it('block header lookup request flow', (done) => {
      const request = BlockLookupRequestFromAttribute(1, true)
      const respXdr = new types.BlockHeaderLookupResponse()
      const headerXdr = getBlockHeader()
      respXdr.header(headerXdr)
      respXdr.status(types.BlockStatus.CREATED())
      respXdr.statusInfo('status was good.')
      nock(defaultRoute)
        .post('/block/header/lookup', request.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))
      const client = new NodeClient()
      client.blockHeaderLookup(1)
        .then(resp => {
          expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
          done()
        })
    })
  })

  describe('receipt lookup', () => {
    function getReceipt () {
      const ev1 = new types.Event()
      ev1.key('asdf')
      ev1.parameters([Buffer.from(base64, 'base64')])
      const ev2 = new types.Event()
      ev2.key('qwer')
      ev2.parameters([Buffer.from(base64, 'base64')])

      const receipt = new types.Receipt()
      receipt.status(types.ReceiptStatus.SUCCESS())
      receipt.stateRoot(Buffer.from(x256, 'hex'))
      receipt.events([ev1, ev2])
      receipt.result(Buffer.from(base64, 'base64'))
      return receipt
    }
    it('receipt lookup request flow', (done) => {
      const requestXdr = new types.ReceiptLookupRequest()
      requestXdr.transactionID(Buffer.from(x256, 'hex'))
      const respXdr = new types.ReceiptLookupResponse()
      const receipt = getReceipt()
      respXdr.receipt(receipt)
      respXdr.status(types.ReceiptLookupStatus.FOUND())
      respXdr.statusInfo('status was good.')
      nock(defaultRoute)
        .post('/receipt/lookup', requestXdr.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))
      const client = new NodeClient()
      client.receiptLookup(x256)
        .then(resp => {
          expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
          done()
        })
    })
  })

  describe('nonce lookup', () => {
    it('nonce lookup request flow', (done) => {
      const requestXdr = new types.AccountNonceLookupRequest()
      const pubKey = fromPrivate('1abc')
      requestXdr.account(pubKey)
      const respXdr = new types.AccountNonceLookupResponse()
      respXdr.nonce(new UnsignedHyper(3))
      respXdr.status(types.NonceLookupStatus.FOUND())
      respXdr.statusInfo('status was cool.')
      nock(defaultRoute)
        .post('/nonce/lookup', requestXdr.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))
      const client = new NodeClient(defaultRoute, '1abc')
      client.nonceLookup()
        .then(resp => {
          expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
          done()
        })
    })
  })
})
