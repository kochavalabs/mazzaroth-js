import xdrTypes from 'js-xdr'
import { describe, it } from 'mocha'
import { expect } from 'chai'
import * as types from 'mazzaroth-xdr'
import sinon from 'sinon'

import { RunExecutionPlan, TransactionForResult } from '../../src/client/utils.js'

const x256 = '3a547668e859fb7b112a1e2dd7efcb739176ab8cfd1d9f224847fce362ebd99c'
const stringResult = new xdrTypes.Str('asdf').toXDR('base64')

function getMockClient () {
  const client = sinon.fake()
  client.nonceLookup = sinon.fake.returns(new Promise((resolve, reject) => {
    const respXdr = types.AccountNonceLookupResponse()
    respXdr.fromJSON({
      nonce: '3',
      stateStatus: {
        previousBlock: x256,
        transactionCount: '1'
      },
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
        result: stringResult
      },
      stateStatus: {
        previousBlock: x256,
        transactionCount: '1'
      },
      status: 1,
      statusInfo: 'status was good.'
    })
    resolve(respXdr)
  }))
  return client
}

describe('RunExecutionPlan', () => {
  it('should throw with bad args', () => {
    const plan = {
      asdf: 'asdf',
      calls: []
    }
    expect(() => RunExecutionPlan(plan, 'asdf', function () {}, getMockClient())).to.throw()
  })

  it('should not throw with valid plan', () => {
    const plan = {
      host: 'asdf',
      channelID: '0'.repeat(64),
      calls: [
        { function: 'asdf', parameters: [] },
        { function: 'asdf', parameters: [] },
        { function: 'asdf', parameters: [] }
      ]
    }
    expect(() => RunExecutionPlan(plan, 'asdf', function () {}, getMockClient())).to.not.throw()
  })

  it('should throw with empty calls array', () => {
    const plan = {
      host: 'asdf',
      channelID: '0'.repeat(64),
      calls: []
    }
    expect(() => RunExecutionPlan(plan, 'asdf', function () {}, getMockClient())).to.throw()
  })

  it('should run correctly', () => {
    const client = getMockClient()
    client.transactionSubmit = sinon.fake.returns(new Promise((resolve, reject) => {
      const respXdr = types.TransactionSubmitResponse()
      respXdr.fromJSON({
        transactionID: x256,
        status: 1,
        statusInfo: 'status was good.'
      })
      resolve(respXdr)
    }))
    const callbackFake = sinon.fake()
    const plan = {
      host: 'asdf',
      channelID: '0'.repeat(64),
      calls: [
        { function: 'one', parameters: [ 'AAAAA29uZQA=', 'AAAAA3R3bwA=' ] },
        { function: 'two', parameters: [] },
        { function: 'three', parameters: [] }
      ]
    }
    return RunExecutionPlan(plan, 'asdf', function () { callbackFake() }, client).then(res => {
      expect(client.transactionSubmit.calledWith({
        channelID: '0'.repeat(64),
        nonce: '3',
        category: {
          enum: 1,
          value: {
            function: 'one',
            parameters: [ 'AAAAA29uZQA=', 'AAAAA3R3bwA=' ]
          }
        }
      })).to.equal(true)
      expect(client.transactionSubmit.calledWith({
        channelID: '0'.repeat(64),
        nonce: '3',
        category: {
          enum: 1,
          value: {
            function: 'two',
            parameters: []
          }
        }
      })).to.equal(true)
      expect(client.transactionSubmit.calledWith({
        channelID: '0'.repeat(64),
        nonce: '3',
        category: {
          enum: 1,
          value: {
            function: 'three',
            parameters: []
          }
        }
      })).to.equal(true)
      expect(callbackFake.callCount).to.equal(4)
      expect(res).to.equal('AAAABGFzZGY=')
    })
  })
})

describe('TransactionForResult', () => {
  it('executes correctly', () => {
    const testAction = {
      channelID: x256,
      nonce: null,
      category: {
        enum: 1,
        value: {
          function: 'asdf', parameters: []
        }
      }
    }
    return TransactionForResult(getMockClient(), testAction).then(res => {
      expect(res).to.equal('AAAABGFzZGY=')
    })
  })
})
