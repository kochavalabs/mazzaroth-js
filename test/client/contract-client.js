import xdrTypes from 'js-xdr'
import * as types from 'mazzaroth-xdr'
import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'

import ContractClient from '../../src/client/contract-client.js'
import NodeClient from '../../src/client/node-client.js'

const x256 = '3a547668e859fb7b112a1e2dd7efcb739176ab8cfd1d9f224847fce362ebd99c'
const signResult = new xdrTypes.Str('asdf').toXDR('base64')

const testAbi = JSON.parse(`
[
  {
    "type": "function",
    "name": "generate_key_pair",
    "inputs": [],
    "outputs": [
      {
        "name": "returnValue0",
        "type": "string",
        "codec": "bytes"
      }
    ]
  },
  {
    "type": "function",
    "name": "sign_message",
    "inputs": [
      {
        "name": "priv_key",
        "type": "string",
        "codec": "bytes"
      },
      {
        "name": "message",
        "type": "string",
        "codec": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "returnValue0",
        "type": "string",
        "codec": "bytes"
      }
    ]
  },
  {
    "type": "function",
    "name": "validate_signature",
    "inputs": [
      {
        "name": "pub_key",
        "type": "string",
        "codec": "bytes"
      },
      {
        "name": "message",
        "type": "string",
        "codec": "bytes"
      },
      {
        "name": "signature",
        "type": "string",
        "codec": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "returnValue0",
        "type": "string",
        "codec": "bytes"
      }
    ]
  }
]
`)

function getMockClient () {
  const client = sinon.fake()
  client.nonceLookup = sinon.fake.returns(new Promise((resolve, reject) => {
    const respXdr = types.AccountNonceLookupResponse()
    respXdr.fromJSON({
      nonce: '3',
      status: 1,
      statusInfo: 'status was cool.'
    })
    resolve(respXdr)
  }))
  client.transactionSubmit = sinon.fake.returns(new Promise((resolve, reject) => {
    const respXdr = types.TransactionSubmitResponse()
    respXdr.fromJSON({
      transactionID: x256,
      status: 1,
      statusInfo: 'status was good.'
    })
    resolve(respXdr)
  }))
  client.receiptLookup = sinon.fake.returns(new Promise((resolve, reject) => {
    const respXdr = types.ReceiptLookupResponse()
    respXdr.fromJSON({
      receipt: {
        status: 1,
        stateRoot: x256,
        events: [],
        result: signResult
      },
      status: 1,
      statusInfo: 'status was good.'
    })
    resolve(respXdr)
  }))
  return client
}

describe('contract client construction', () => {
  it('basic construction.', () => {
    const xdrConfig = { qwer: 'ty' }
    const nodeClient = new NodeClient()
    const client = new ContractClient(testAbi, nodeClient, xdrConfig)
    expect(!client).to.equal(false)
  })

  it('has correct functions', () => {
    const client = new ContractClient(testAbi, {}, {})
    expect(client.generate_key_pair).to.not.equal(null)
    expect(client.sign_message).to.not.equal(null)
    expect(client.validate_signature).to.not.equal(null)
  })
})

describe('contract calls', () => {
  it('error for too few arguments', () => {
    const client = new ContractClient(testAbi, {}, {})
    return client.sign_message().catch(err => {
      expect(err).to.not.equal(null)
    })
  })

  it('nonce error surfaced', () => {
    const nodeClient = getMockClient()
    const retErr = new Error('bad')
    nodeClient.nonceLookup = sinon.fake.returns(new Promise((resolve, reject) => {
      reject(retErr)
    }))
    const client = new ContractClient(testAbi, nodeClient, {})
    return client.sign_message('one', 'two').catch(err => {
      expect(err).to.equal(retErr)
    })
  })

  it('nonce fails bad status', () => {
    const nodeClient = getMockClient()
    nodeClient.nonceLookup = sinon.fake.returns(new Promise((resolve, reject) => {
      const respXdr = types.AccountNonceLookupResponse()
      respXdr.fromJSON({
        nonce: '3',
        status: 2,
        statusInfo: 'asdf'
      })
      resolve(respXdr)
    }))
    const client = new ContractClient(testAbi, nodeClient, {})
    return client.sign_message('one', 'two').catch(err => {
      expect(err.toString()).to.equal('Error: Nonce lookup failed.')
    })
  })

  it('transaction submit error surfaced', () => {
    const nodeClient = getMockClient()
    const retErr = new Error('bad')
    nodeClient.transactionSubmit = sinon.fake.returns(new Promise((resolve, reject) => {
      reject(retErr)
    }))
    const client = new ContractClient(testAbi, nodeClient, {})
    return client.sign_message('one', 'two').catch(err => {
      expect(err).to.equal(retErr)
    })
  })

  it('transaction submit status checked', () => {
    const nodeClient = getMockClient()
    nodeClient.transactionSubmit = sinon.fake.returns(new Promise((resolve, reject) => {
      const respXdr = types.TransactionSubmitResponse({
        transactionID: x256,
        status: 2,
        statusInfo: 'status was good.'
      })
      resolve(respXdr)
    }))
    const client = new ContractClient(testAbi, nodeClient, {})
    return client.sign_message('one', 'two').catch(err => {
      expect(err.toString()).to.equal('Error: Transaction submission not accepted.')
    })
  })

  it('transaction submit success', () => {
    const nodeClient = getMockClient()
    nodeClient.transactionSubmit = sinon.fake.returns(new Promise((resolve, reject) => {
      const respXdr = types.TransactionSubmitResponse()
      respXdr.fromJSON({
        transactionID: x256,
        status: 1,
        statusInfo: 'status was good.'
      })
      resolve(respXdr)
    }))
    const client = new ContractClient(testAbi, nodeClient, {})
    return client.sign_message('one', 'two').then(res => {
      expect(nodeClient.transactionSubmit.calledWith({
        channelID: '0'.repeat(64),
        nonce: '3',
        category: {
          enum: 1,
          value: {
            function: 'sign_message',
            parameters: [ 'AAAAA29uZQA=', 'AAAAA3R3bwA=' ]
          }
        }
      })).to.equal(true)
      expect(res).to.equal('asdf')
    })
  })
})
