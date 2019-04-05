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
        .post('/transaction_lookup', JSON.stringify(requestProto))
        .reply(200)
      const client = new NodeClient(defaultRoute)
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
        .post('/transaction_lookup')
        .reply(200, JSON.stringify(respProto))
      const client = new NodeClient(defaultRoute)
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
        contractId: Buffer.from([1, 2, 3]),
        channel: 'cool_channel',
        nonce: 2 ** 4,
        call: 'asdfasdr',
        bytes: [ Buffer.from([1, 2, 3]) ]
      }
      const txProto = pb.Transaction.create(tx)
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
        .post('/transaction_submit', JSON.stringify(expectedBody))
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
        .post('/transaction_submit')
        .reply(200, JSON.stringify(respProto))
      const client = new NodeClient(defaultRoute)
      client.transactionSubmit({}).then(resp => {
        expect(resp).to.deep.equal(respProto)
      })
    })
  })
})
