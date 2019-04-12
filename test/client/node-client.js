import { describe, it } from 'mocha'
import { expect } from 'chai'
import { pb } from 'mazzaroth-proto'
import nock from 'nock'

import NodeClient from '../../src/client/node-client.js'

const defaultRoute = 'http://localhost:8081'
const signResult = Buffer.from([1, 2, 3, 8, 5, 3])

function fakeSign (ex1, ex2) {
  return (key, toSign) => {
    expect(ex1).to.deep.equal(key)
    expect(ex2).to.deep.equal(toSign)
    return signResult
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
    it('request passed correctly', () => {
      const requestProto = pb.TransactionLookupRequest.create({ id: Buffer.from([0, 1, 2]) })
      nock(defaultRoute)
        .post('/transaction/lookup', JSON.stringify(requestProto))
        .reply(200)
      const client = new NodeClient()
      client.transactionLookup(Buffer.from([0, 1, 2]))
        .then(resp => {})
    })

    it('resp proto returned', () => {
      const respProto = pb.TransactionLookupResponse.create({
        status: 1,
        statusInfo: 'asdf',
        result: Buffer.from([1, 3, 4])
      })
      nock(defaultRoute)
        .post('/transaction/lookup')
        .reply(200, JSON.stringify(respProto))
      const client = new NodeClient()
      client.transactionLookup('')
        .then(resp => {
          expect(resp).to.deep.equal(respProto)
        })
    })
  })

  describe('transaction submit', () => {
    it('request passed and signed correctly', () => {
      const privKey = Buffer.from([1, 4, 5, 5])
      const pubKey = Buffer.from([1, 2, 4])
      const tx = {
        channelId: Buffer.from([1, 2, 3]),
        nonce: 2 ** 4,
        call: {
          toCall: 'call_this',
          input: [Buffer.from([2, 2, 3]), Buffer.from([3, 4, 5])]
        }
      }
      const txProto = pb.Transaction.fromObject(tx)
      const txBytes = pb.Transaction.encode(txProto).finish()
      const signedTx = pb.SignedTransaction.create({
        transaction: txBytes,
        senderId: pubKey,
        signature: signResult
      })
      const expectedBody = pb.TransactionSubmitRequest.create({
        transaction: signedTx
      })
      nock(defaultRoute)
        .post('/transaction/submit', JSON.stringify(expectedBody))
        .reply(200)
      const client = new NodeClient(
        defaultRoute, privKey, pubKey, fakeSign(privKey, txBytes))
      client.transactionSubmit(tx).then(resp => {})
    })

    it('request response handled correctly', () => {
      const respProto = pb.TransactionSubmitResponse.create({
        transaction: pb.AcceptedTransaction.create({ id: Buffer.from([1]) })
      })
      nock(defaultRoute)
        .post('/transaction/submit')
        .reply(200, JSON.stringify(respProto))
      const client = new NodeClient()
      client.transactionSubmit({}).then(resp => {
        expect(resp).to.deep.equal(respProto)
      })
    })
  })

  describe('block lookup', () => {
    it('request passed correctly buffer', () => {
      const requestProto = pb.BlockLookupRequest.create({ id: Buffer.from([0, 1, 2]) })
      nock(defaultRoute)
        .post('/block/lookup', JSON.stringify(requestProto))
        .reply(200)
      const client = new NodeClient()
      client.blockLookup(Buffer.from([0, 1, 2]))
    })

    it('request passed correctly base64', () => {
      const requestProto = pb.BlockLookupRequest.create({ id: Buffer.from([0, 1, 2]) })
      nock(defaultRoute)
        .post('/block/lookup', JSON.stringify(requestProto))
        .reply(200)
      const client = new NodeClient()
      client.blockLookup(Buffer.from([0, 1, 2]).toString('base64'))
    })

    it('request passed correctly number', () => {
      const requestProto = pb.BlockLookupRequest.create({ number: 1234 })
      nock(defaultRoute)
        .post('/block/lookup', JSON.stringify(requestProto))
        .reply(200)
      const client = new NodeClient()
      client.blockLookup(1234)
    })

    it('resp proto returned', () => {
      const respProto = pb.BlockLookupResponse.create({
        status: 1,
        statusInfo: 'asdf'
      })
      nock(defaultRoute)
        .post('/block/lookup')
        .reply(200, JSON.stringify(respProto))
      const client = new NodeClient()
      client.blockLookup(0)
        .then(resp => {
          expect(resp).to.deep.equal(respProto)
        })
    })
  })

  describe('block header lookup', () => {
    it('request passed correctly buffer', () => {
      const requestProto = pb.BlockLookupRequest.create({ id: Buffer.from([0, 1, 2]) })
      nock(defaultRoute)
        .post('/block/header/lookup', JSON.stringify(requestProto))
        .reply(200)
      const client = new NodeClient()
      client.blockHeaderLookup(Buffer.from([0, 1, 2]))
    })

    it('request passed correctly base64', () => {
      const requestProto = pb.BlockLookupRequest.create({ id: Buffer.from([0, 1, 2]) })
      nock(defaultRoute)
        .post('/block/header/lookup', JSON.stringify(requestProto))
        .reply(200)
      const client = new NodeClient()
      client.blockHeaderLookup(Buffer.from([0, 1, 2]).toString('base64'))
    })

    it('request passed correctly number', () => {
      const requestProto = pb.BlockLookupRequest.create({ number: 1234 })
      nock(defaultRoute)
        .post('/block/header/lookup', JSON.stringify(requestProto))
        .reply(200)
      const client = new NodeClient()
      client.blockHeaderLookup(1234)
    })

    it('resp proto returned', () => {
      const respProto = pb.BlockHeaderLookupResponse.create({
        status: 1,
        statusInfo: 'asdf'
      })
      nock(defaultRoute)
        .post('/block/header/lookup')
        .reply(200, JSON.stringify(respProto))
      const client = new NodeClient()
      client.blockHeaderLookup(0)
        .then(resp => {
          expect(resp).to.deep.equal(respProto)
        })
    })
  })
})
