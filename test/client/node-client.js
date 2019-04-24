import { describe, it } from 'mocha'
import { expect } from 'chai'
import nock from 'nock'
import { TransactionFromObject, BlockLookupRequestFromAttribute } from '../../src/xdr/convert.js'
import { UnsignedHyper } from 'js-xdr'
import types from 'mazzaroth-xdr'

import NodeClient from '../../src/client/node-client.js'

const defaultRoute = 'http://localhost:8081'

const x256 = '3a547668e859fb7b112a1e2dd7efcb739176ab8cfd1d9f224847fce362ebd99c'
const x512 = x256 + x256
const base64 = '9uZzPoEf1zsfABG7J6toIMio3VMY8eQnErkZTCURMu8/uwZNKkvmyBsjQBs/BWg'
const txObject = {
  signature: x512,
  address: x256,
  action: {
    channelId: x256,
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
      const client = new NodeClient(defaultRoute, 'ff01', 'ff02', 'a')
      expect(client.host).to.equal(defaultRoute)
      expect(client.privateKey).to.deep.equal(Buffer.from([255, 1]))
      expect(client.publicKey).to.deep.equal(Buffer.from([255, 2]))
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
        Buffer.from([1, 3, 4]),
        Buffer.from([1, 1, 4])
      )
      expect(client.privateKey).to.deep.equal(Buffer.from([1, 3, 4]))
      expect(client.publicKey).to.deep.equal(Buffer.from([1, 1, 4]))
    })
  })

  describe('transaction lookup', () => {
    it('full request flow', () => {
      const requestXdr = new types.TransactionLookupRequest()
      requestXdr.transactionId(Buffer.from(x256, 'hex'))
      const respXdr = new types.TransactionLookupResponse()
      const txXdr = TransactionFromObject(txObject)
      respXdr.transaction(txXdr)
      respXdr.status(types.TransactionStatus.accepted())
      respXdr.statusInfo('status was good.')
      nock(defaultRoute)
        .post('/transaction/lookup', requestXdr.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))
      const client = new NodeClient()
      client.transactionLookup(x256)
        .then(resp => {
          expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
        })
    })
  })

  describe('transaction submit', () => {
    it('full request flow', () => {
      const respXdr = new types.TransactionSubmitResponse()
      respXdr.transactionId(Buffer.from(x256, 'hex'))
      respXdr.status(types.TransactionStatus.accepted())
      respXdr.statusInfo('status was good.')

      const privKey = Buffer.from([1, 4, 5, 5])
      const pubKey = Buffer.from(x256, 'hex')
      const txXdr = TransactionFromObject(txObject)

      const expectedBody = new types.TransactionSubmitRequest()
      expectedBody.transaction(txXdr)
      nock(defaultRoute)
        .post('/transaction/submit', expectedBody.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))

      const client = new NodeClient(
        defaultRoute, privKey, pubKey,
        fakeSign(privKey, txXdr.action().toXDR())
      )

      client.transactionSubmit(txObject.action).then(resp => {
        expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
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

    it('block lookup request flow', () => {
      const request = BlockLookupRequestFromAttribute(1)
      const respXdr = new types.BlockLookupResponse()
      const blockXdr = getBlock()
      respXdr.block(blockXdr)
      respXdr.status(types.BlockStatus.created())
      respXdr.statusInfo('status was good.')
      nock(defaultRoute)
        .post('/block/lookup', request.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))
      const client = new NodeClient()
      client.blockLookup(1)
        .then(resp => {
          expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
        })
    })

    it('block header lookup request flow', () => {
      const request = BlockLookupRequestFromAttribute(1, true)
      const respXdr = new types.BlockHeaderLookupResponse()
      const headerXdr = getBlockHeader()
      respXdr.header(headerXdr)
      respXdr.status(types.BlockStatus.created())
      respXdr.statusInfo('status was good.')
      nock(defaultRoute)
        .post('/block/header/lookup', request.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))
      const client = new NodeClient()
      client.blockHeaderLookup(1)
        .then(resp => {
          expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
        })
    })
  })
})
