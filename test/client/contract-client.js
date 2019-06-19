import types from 'mazzaroth-xdr'
import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { UnsignedHyper } from 'js-xdr'

import ContractClient from '../../src/client/contract-client.js'
import NodeClient from '../../src/client/node-client.js'

const x256 = '3a547668e859fb7b112a1e2dd7efcb739176ab8cfd1d9f224847fce362ebd99c'
const base64 = '9uZzPoEf1zsfABG7J6toIMio3VMY8eQnErkZTCURMu8/uwZNKkvmyBsjQBs/BWg'
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
  receipt.result(Buffer.from('0000000568656c6c6f000000', 'hex'))
  return receipt
}

function getMockClient () {
  const client = sinon.fake()
  client.nonceLookup = sinon.fake.returns(new Promise((resolve, reject) => {
    const respXdr = new types.AccountNonceLookupResponse()
    respXdr.nonce(new UnsignedHyper(3))
    respXdr.status(types.NonceLookupStatus.FOUND())
    respXdr.statusInfo('status was cool.')
    resolve(respXdr)
  }))
  client.transactionSubmit = sinon.fake.returns(new Promise((resolve, reject) => {
    const respXdr = new types.TransactionSubmitResponse()
    respXdr.transactionID(Buffer.from(x256, 'hex'))
    respXdr.status(types.TransactionStatus.ACCEPTED())
    respXdr.statusInfo('status was good.')
    resolve(respXdr)
  }))
  client.receiptLookup = sinon.fake.returns(new Promise((resolve, reject) => {
    const respXdr = new types.ReceiptLookupResponse()
    const receipt = getReceipt()
    respXdr.receipt(receipt)
    respXdr.status(types.ReceiptLookupStatus.FOUND())
    respXdr.statusInfo('status was good.')
    resolve(respXdr)
  }))
  return client
}

describe('contract client construction', () => {
  it('basic construction.', () => {
    const xdrConfig = { qwer: 'ty' }
    const nodeClient = new NodeClient()
    const client = new ContractClient(testAbi, xdrConfig, nodeClient)
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
  it('error for too few arguments', (done) => {
    const client = new ContractClient(testAbi, {}, {})
    client.sign_message().catch(err => {
      expect(err).to.not.equal(null)
      done()
    })
  })

  it('nonce error surfaced', () => {
    const nodeClient = getMockClient()
    const retErr = new Error('bad')
    nodeClient.nonceLookup = sinon.fake.returns(new Promise((resolve, reject) => {
      reject(retErr)
    }))
    const client = new ContractClient(testAbi, {}, nodeClient)
    return client.sign_message('one', 'two').catch(err => {
      expect(err).to.equal(retErr)
    })
  })

  it('nonce fails bad status', () => {
    const nodeClient = getMockClient()
    nodeClient.nonceLookup = sinon.fake.returns(new Promise((resolve, reject) => {
      const respXdr = new types.AccountNonceLookupResponse()
      respXdr.nonce(new UnsignedHyper(3))
      respXdr.status(types.NonceLookupStatus.NOT_FOUND())
      resolve(respXdr)
    }))
    const client = new ContractClient(testAbi, {}, nodeClient)
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
    const client = new ContractClient(testAbi, {}, nodeClient)
    return client.sign_message('one', 'two').catch(err => {
      expect(err).to.equal(retErr)
    })
  })

  it('transaction submit status checked', () => {
    const nodeClient = getMockClient()
    nodeClient.transactionSubmit = sinon.fake.returns(new Promise((resolve, reject) => {
      const respXdr = new types.TransactionSubmitResponse()
      respXdr.transactionID(Buffer.from(x256, 'hex'))
      respXdr.status(types.TransactionStatus.REJECTED())
      respXdr.statusInfo('status was good.')
      resolve(respXdr)
    }))
    const client = new ContractClient(testAbi, {}, nodeClient)
    return client.sign_message('one', 'two').catch(err => {
      expect(err.toString()).to.equal('Error: Transaction submission not accepted.')
    })
  })
})
