/* eslint no-unused-expressions: 0 */
import { describe, it } from 'mocha'
import { expect } from 'chai'
import { pb } from 'mazzaroth-proto'
import nock from 'nock'

import NodeClient from '../../src/client/node-client.js'

const defaultRoute = 'http://localhost:8081'

describe('node client test', () => {
  describe('construction', () => {
    it('should pass values', () => {
      const client = new NodeClient(defaultRoute, 'ff01')
      expect(client.host).to.equal(defaultRoute)
      expect(client.privateKey).to.deep.equal(Buffer.from([255, 1]))
    })

    it('clean up host with slash', () => {
      let client = new NodeClient(defaultRoute + '/', '00')
      expect(client.host).to.equal(defaultRoute)
      client = new NodeClient('http://localhost////', '00')
      expect(client.host).to.equal('http://localhost')
    })

    it('accept buffer for key', () => {
      const client = new NodeClient(defaultRoute, Buffer.from([1, 3, 4]))
      expect(client.privateKey).to.deep.equal(Buffer.from([1, 3, 4]))
    })
  })

  describe('transaction lookup', () => {
    it('request passed correctly', () => {
      const requestProto = pb.TransactionLookupRequest.create({ id: Buffer.from([0, 1, 2]) })
      nock(defaultRoute)
        .post('/transaction_lookup', JSON.stringify(requestProto))
        .reply(200)
      const client = new NodeClient(defaultRoute, '')
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
      const client = new NodeClient(defaultRoute, '')
      client.transactionLookup('')
        .then(resp => {
          expect(resp).to.deep.equal(respProto)
        })
    })
  })
})
