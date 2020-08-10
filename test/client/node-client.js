import { describe, it } from 'mocha'
import { expect } from 'chai'
import nock from 'nock'
import * as types from 'mazzaroth-xdr'
import { fromPrivate } from '../../src/crypto/ecc-ed25519.js'

import NodeClient from '../../src/client/node-client.js'

const defaultRoute = 'http://localhost:8081'

const x256 = '3a547668e859fb7b112a1e2dd7efcb739176ab8cfd1d9f224847fce362ebd99c'
const x512 = x256 + x256
const base64 = '9uZzPoEf1zsfABG7J6toIMio3VMY8eQnErkZTCURMu8/uwZNKkvmyBsjQBs/BWg'

function fakeSign (ex1, ex2) {
  return (key, toSign) => {
    expect(ex1).to.deep.equal(key)
    expect(ex2).to.deep.equal(toSign)
    return x512
  }
}

describe('node client test', () => {
  const action = {
    address: x256,
    channelID: x256,
    nonce: '3',
    category: {
      enum: 2,
      value: {
        enum: 3,
        value: {
          key: x256,
          action: 0
        }
      }
    }
  }
  const authority = {
    enum: 0,
    value: ''
  }
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
      const requestXdr = types.TransactionLookupRequest()
      requestXdr.fromJSON({
        transactionID: x256
      })
      const respXdr = new types.TransactionLookupResponse()
      respXdr.fromJSON({
        transaction: {
          signature: x512,
          action: action,
          signer: authority
        },
        stateStatus: {
          previousBlock: '3',
          transactionCount: '1'
        },
        status: 1,
        statusInfo: 'status was good.'
      })
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

  describe('readonly submit', () => {
    it('full request flow', () => {
      const request = types.ReadonlyRequest()
      request.fromJSON({
        call: {
          function: 'asdf',
          parameters: []
        }
      })

      const response = types.ReadonlyResponse()
      response.fromJSON({
        result: '',
        stateStatus: {
          previousBlock: '3',
          transactionCount: '1'
        },
        status: 1,
        statusInfo: 'a good status.'
      })

      nock(defaultRoute)
        .post('/readonly', request.toXDR('base64'))
        .reply(200, response.toXDR('base64'))

      const client = new NodeClient()
      return client.readonlySubmit({ function: 'asdf', parameters: [] }).then(resp => {
        expect(resp.toXDR()).to.deep.equal(response.toXDR())
      })
    })
  })

  describe('transaction submit', () => {
    it('full request flow', () => {
      const request = types.TransactionSubmitRequest()
      const privKey = Buffer.from([1, 4, 5, 5])
      const pubKey = fromPrivate(privKey)
      const action = {
        address: pubKey.toString('hex'),
        channelID: x256,
        nonce: '3',
        category: {
          enum: 2,
          value: {
            enum: 1,
            value: {
              contract: base64,
              version: '1.0'
            }
          }
        }
      }
      request.fromJSON({
        transaction: {
          signature: x512,
          action: action,
          signer: authority
        }
      })

      const respXdr = types.TransactionSubmitResponse()
      respXdr.fromJSON({
        transactionID: x256,
        status: 1,
        statusInfo: 'status was good'
      })

      const actionXdr = types.Action()
      actionXdr.fromJSON(action)

      nock(defaultRoute)
        .post('/transaction/submit', request.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))

      const client = new NodeClient(
        defaultRoute, privKey,
        fakeSign(privKey, actionXdr.toXDR())
      )

      return client.transactionSubmit(action).then(resp => {
        expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
      })
    })

    it('full request flow signer', () => {
      const request = types.TransactionSubmitRequest()
      const privKey = Buffer.from([1, 4, 5, 5])
      const pubKey = fromPrivate(privKey)
      const action = {
        address: x256,
        channelID: x256,
        nonce: '3',
        category: {
          enum: 2,
          value: {
            enum: 2,
            value: {
              channelID: x256,
              contractHash: x256,
              version: '1.0',
              owner: x256,
              channelName: 'cool_channel',
              admins: []
            }
          }
        }
      }
      const authority = {
        enum: 1,
        value: pubKey.toString('hex')
      }

      const respXdr = types.TransactionSubmitResponse()
      respXdr.fromJSON({
        transactionID: x256,
        status: 1,
        statusInfo: 'status was good'
      })

      const actionXdr = types.Action()
      const updatedAction = {
        address: pubKey.toString('hex'),
        channelID: x256,
        nonce: '3',
        category: {
          enum: 2,
          value: {
            enum: 2,
            value: {
              channelID: x256,
              contractHash: x256,
              version: '1.0',
              owner: x256,
              channelName: 'cool_channel',
              admins: []
            }
          }
        }
      }
      actionXdr.fromJSON(updatedAction)
      request.fromJSON({
        transaction: {
          signature: x512,
          action: updatedAction,
          signer: authority
        }
      })

      nock(defaultRoute)
        .post('/transaction/submit', request.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))

      const client = new NodeClient(
        defaultRoute, privKey,
        fakeSign(privKey, actionXdr.toXDR())
      )

      return client.transactionSubmit(action, pubKey.toString('hex')).then(resp => {
        expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
      })
    })
  })

  describe('block lookup', () => {
    const blockHeader = {
      timestamp: 'asdf',
      blockHeight: '0',
      transactionHeight: '0',
      consensusSequenceNumber: '0',
      txMerkleRoot: x256,
      txReceiptRoot: x256,
      stateRoot: x256,
      previousHeader: x256,
      blockProducerAddress: x256
    }

    it('block lookup request flow', () => {
      const request = types.BlockLookupRequest()
      request.fromJSON({
        ID: {
          enum: 2,
          value: x256
        }
      })
      const respXdr = types.BlockLookupResponse()
      nock(defaultRoute)
        .post('/block/lookup', request.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))
      const client = new NodeClient()
      return client.blockLookup(x256)
        .then(resp => {
          expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
        })
    })

    it('block header lookup request flow', () => {
      const request = types.BlockHeaderLookupRequest()
      request.fromJSON({
        ID: {
          enum: 1,
          value: '1'
        }
      })
      const respXdr = types.BlockHeaderLookupResponse()
      respXdr.fromJSON({
        header: blockHeader,
        stateStatus: {
          previousBlock: '3',
          transactionCount: '1'
        },
        status: 1,
        statusInfo: 'status was good'
      })
      nock(defaultRoute)
        .post('/block/header/lookup', request.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))
      const client = new NodeClient()
      return client.blockHeaderLookup('1')
        .then(resp => {
          expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
        })
    })
  })

  describe('receipt lookup', () => {
    it('receipt lookup request flow', () => {
      const requestXdr = types.ReceiptLookupRequest()
      requestXdr.fromJSON({
        transactionID: x256
      })
      const respXdr = types.ReceiptLookupResponse()
      respXdr.fromJSON({
        receipt: {
          status: 1,
          stateRoot: x256,
          result: base64,
          statusInfo: 'status was better.'
        },
        stateStatus: {
          previousBlock: '3',
          transactionCount: '1'
        },
        status: 1,
        statusInfo: 'status was good'
      })
      nock(defaultRoute)
        .post('/receipt/lookup', requestXdr.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))
      const client = new NodeClient()
      return client.receiptLookup(x256)
        .then(resp => {
          expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
        })
    })
  })

  describe('nonce lookup', () => {
    it('nonce lookup request flow', () => {
      const requestXdr = types.AccountNonceLookupRequest()
      const pubKey = fromPrivate('1abc')
      requestXdr.fromJSON({
        account: pubKey.toString('hex')
      })
      const respXdr = types.AccountNonceLookupResponse()
      respXdr.fromJSON({
        nonce: '3',
        stateStatus: {
          previousBlock: '3',
          transactionCount: '1'
        },
        status: 1,
        statusInfo: 'status was cool'
      })
      nock(defaultRoute)
        .post('/account/nonce/lookup', requestXdr.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))
      const client = new NodeClient(defaultRoute, '1abc')
      return client.nonceLookup()
        .then(resp => {
          expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
        })
    })
  })

  describe('account info lookup', () => {
    it('info lookup request default flow', () => {
      const requestXdr = types.AccountInfoLookupRequest()
      const pubKey = fromPrivate('1abc')
      requestXdr.fromJSON({
        account: pubKey.toString('hex')
      })
      const respXdr = types.AccountInfoLookupResponse()
      respXdr.fromJSON({
        accountInfo: {
          name: 'asdf',
          nonce: '1',
          permissionedKeys: []
        },
        stateStatus: {
          previousBlock: '3',
          transactionCount: '1'
        },
        status: 1,
        statusInfo: 'status was cool'
      })
      nock(defaultRoute)
        .post('/account/info/lookup', requestXdr.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))
      const client = new NodeClient(defaultRoute, '1abc')
      return client.accountInfoLookup()
        .then(resp => {
          expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
        })
    })

    it('info lookup request arg flow', () => {
      const requestXdr = types.AccountInfoLookupRequest()
      requestXdr.fromJSON({
        account: x256
      })
      const respXdr = types.AccountInfoLookupResponse()
      respXdr.fromJSON({
        accountInfo: {
          name: 'asdf',
          nonce: '1',
          permissionedKeys: []
        },
        stateStatus: {
          previousBlock: '3',
          transactionCount: '1'
        },
        status: 1,
        statusInfo: 'status was cool'
      })
      nock(defaultRoute)
        .post('/account/info/lookup', requestXdr.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))
      const client = new NodeClient(defaultRoute, '1abc')
      return client.accountInfoLookup(x256)
        .then(resp => {
          expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
        })
    })
  })

  describe('contract info lookup', () => {
    it('info lookup request contract None', () => {
      const requestXdr = types.ChannelInfoLookupRequest()
      requestXdr.fromJSON({
        infoType: 0
      })
      const respXdr = types.ChannelInfoLookupResponse()
      respXdr.fromJSON({
        channelInfo: {
          enum: 0,
          value: ''
        },
        stateStatus: {
          previousBlock: '3',
          transactionCount: '1'
        },
        status: 1,
        statusInfo: 'status was cool'
      })
      nock(defaultRoute)
        .post('/channel/info/lookup', requestXdr.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))
      const client = new NodeClient(defaultRoute)
      return client.channelInfoLookup(0)
        .then(resp => {
          expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
        })
    })

    it('info lookup request contract Contract', () => {
      const requestXdr = types.ChannelInfoLookupRequest()
      requestXdr.fromJSON({
        infoType: 1
      })
      const respXdr = types.ChannelInfoLookupResponse()
      respXdr.fromJSON({
        channelInfo: {
          enum: 1,
          value: {
            contract: base64,
            version: '1.0'
          }
        },
        stateStatus: {
          previousBlock: '3',
          transactionCount: '1'
        },
        status: 1,
        statusInfo: 'status was cool'
      })
      nock(defaultRoute)
        .post('/channel/info/lookup', requestXdr.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))
      const client = new NodeClient(defaultRoute)
      return client.channelInfoLookup(1)
        .then(resp => {
          expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
        })
    })

    it('info lookup request channel Config', () => {
      const requestXdr = types.ChannelInfoLookupRequest()
      requestXdr.fromJSON({
        infoType: 2
      })
      const respXdr = types.ChannelInfoLookupResponse()
      respXdr.fromJSON({
        channelInfo: {
          enum: 2,
          value: {
            channelID: x256,
            contractHash: x256,
            version: '1.0',
            owner: x256,
            channelName: 'asdf',
            admins: []
          }
        },
        stateStatus: {
          previousBlock: '3',
          transactionCount: '1'
        },
        status: 1,
        statusInfo: 'status was cool'
      })
      nock(defaultRoute)
        .post('/channel/info/lookup', requestXdr.toXDR('base64'))
        .reply(200, respXdr.toXDR('base64'))
      const client = new NodeClient(defaultRoute)
      return client.channelInfoLookup(2)
        .then(resp => {
          expect(resp.toXDR()).to.deep.equal(respXdr.toXDR())
        })
    })
  })
})
