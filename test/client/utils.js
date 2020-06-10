import xdrTypes from 'xdr-js-serialize'
import { describe, it } from 'mocha'
import { expect } from 'chai'
import * as types from 'mazzaroth-xdr'
import sinon from 'sinon'

import { RunExecutionPlan, TransactionForResult, BuildReceiptSubscription, JSONtoXDR, XDRtoJSON } from '../../src/client/utils.js'

const x256 = '3a547668e859fb7b112a1e2dd7efcb739176ab8cfd1d9f224847fce362ebd99c'
const stringResult = new xdrTypes.Str('asdf').toXDR('base64')

function getMockClient () {
  const client = sinon.fake()
  client.nonceLookup = sinon.fake.returns(new Promise((resolve, reject) => {
    const respXdr = types.AccountNonceLookupResponse()
    respXdr.fromJSON({
      nonce: '3',
      stateStatus: {
        previousBlock: '3',
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
        result: stringResult
      },
      stateStatus: {
        previousBlock: '3',
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
      actions: [
        { address: x256, channelID: x256, nonce: '0', category: { enum: 1, value: { function: 'asdf', parameters: [] } } },
        { address: x256, channelID: x256, nonce: '0', category: { enum: 1, value: { function: 'asdf', parameters: [] } } },
        { address: x256, channelID: x256, nonce: '0', category: { enum: 1, value: { function: 'asdf', parameters: [] } } }
      ]
    }
    expect(() => RunExecutionPlan(plan, 'asdf', function () {}, getMockClient())).to.not.throw()
  })

  it('should throw with empty calls array', () => {
    const plan = {
      host: 'asdf',
      actions: []
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
      actions: [
        { address: x256, channelID: x256, nonce: '3', category: { enum: 1, value: { function: 'one', parameters: [ 'AAAAA29uZQA=', 'AAAAA3R3bwA=' ] } } },
        { address: x256, channelID: x256, nonce: '3', category: { enum: 1, value: { function: 'two', parameters: [] } } },
        { address: x256, channelID: x256, nonce: '3', category: { enum: 1, value: { function: 'three', parameters: [] } } }
      ]
    }
    return RunExecutionPlan(plan, 'asdf', function () { callbackFake() }, client).then(res => {
      expect(client.transactionSubmit.calledWith({
        channelID: x256,
        address: x256,
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
        channelID: x256,
        address: x256,
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
        channelID: x256,
        address: x256,
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

describe('BuildRceiptSubscription', () => {
  const valFil = (e, val) => { return { enum: e, value: val } }
  const runs = [
    {
      desc: 'receipt',
      input: { receiptFilter: { status: 1, stateRoot: x256 } },
      expected: {
        receiptFilter: { enum: 1, value: { status: valFil(5, 1), stateRoot: valFil(2, x256) } },
        transactionFilter: { enum: 0, value: '' }
      }
    },
    {
      desc: 'generic',
      input: { transactionFilter: { signature: x256 + x256, signer: x256, address: x256, channelID: x256, nonce: '1' } },
      expected: {
        receiptFilter: { enum: 0, value: '' },
        transactionFilter: { enum: 1, value: { signature: valFil(3, x256 + x256), signer: valFil(2, x256), address: valFil(2, x256), channelID: valFil(2, x256), nonce: valFil(4, '1') } }
      }
    },
    {
      desc: 'contract',
      input: { transactionFilter: { signature: x256 + x256, signer: x256, address: x256, channelID: x256, nonce: '1', contractFilter: { version: '1.0' } } },
      expected: {
        receiptFilter: { enum: 0, value: '' },
        transactionFilter: { enum: 2, value: { actionFilter: { signature: valFil(3, x256 + x256), signer: valFil(2, x256), address: valFil(2, x256), channelID: valFil(2, x256), nonce: valFil(4, '1') }, version: valFil(1, '1.0') } }
      }
    },
    {
      desc: 'config',
      input: { transactionFilter: { signature: x256 + x256, signer: x256, address: x256, channelID: x256, nonce: '1', configFilter: {} } },
      expected: {
        receiptFilter: { enum: 0, value: '' },
        transactionFilter: { enum: 3, value: { actionFilter: { signature: valFil(3, x256 + x256), signer: valFil(2, x256), address: valFil(2, x256), channelID: valFil(2, x256), nonce: valFil(4, '1') } } }
      }
    },
    {
      desc: 'permission',
      input: { transactionFilter: { signature: x256 + x256, signer: x256, address: x256, channelID: x256, nonce: '1', permissionFilter: { key: x256, action: 1 } } },
      expected: {
        receiptFilter: { enum: 0, value: '' },
        transactionFilter: { enum: 4, value: { actionFilter: { signature: valFil(3, x256 + x256), signer: valFil(2, x256), address: valFil(2, x256), channelID: valFil(2, x256), nonce: valFil(4, '1') }, key: valFil(2, x256), action: valFil(5, 1) } }
      }
    },
    {
      desc: 'call',
      input: { transactionFilter: { signature: x256 + x256, signer: x256, address: x256, channelID: x256, nonce: '1', callFilter: { function: 'my_func' } } },
      expected: {
        receiptFilter: { enum: 0, value: '' },
        transactionFilter: { enum: 5, value: { actionFilter: { signature: valFil(3, x256 + x256), signer: valFil(2, x256), address: valFil(2, x256), channelID: valFil(2, x256), nonce: valFil(4, '1') }, function: valFil(1, 'my_func') } }
      }
    }
  ]
  runs.forEach(function (run) {
    it(`Build Receipt Subscription: ${run.desc}`, () => {
      const result = BuildReceiptSubscription(run.input)
      expect(result.toJSON()).to.deep.equal(run.expected)
    })
  })
})

describe('JSONtoXDR', () => {
  it('error for bad type', () => {
    expect(() => JSONtoXDR('', 'badtype')).to.throw()
  })

  it('throw bad property', () => {
    const expected = types.Transaction().toJSON()
    expected.badprop = 'asdf'
    expect(() => JSONtoXDR(JSON.stringify(expected), 'Transaction')).to.throw()
  })

  it('basic type convert', () => {
    const expected = types.Transaction()
    expect(JSONtoXDR('{}', 'Transaction')).to.equal(expected.toXDR('base64'))
  })

  it('complex type convert', () => {
    const json = types.Transaction().toJSON()
    json.action = {
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
    const expected = types.Transaction()
    expected.fromJSON(json)
    expect(JSONtoXDR(JSON.stringify(json), 'Transaction')).to.equal(expected.toXDR('base64'))
  })
})

describe('XDRtoJSON', () => {
  it('error for bad type', () => {
    expect(() => XDRtoJSON('', 'badtype')).to.throw()
  })

  it('error for bad format', () => {
    expect(() => XDRtoJSON('', 'Transaction', 'badformat')).to.throw()
  })

  it('basic type convert default', () => {
    const tx = types.Transaction()
    expect(XDRtoJSON(tx.toXDR('base64'), 'Transaction')).to.equal(JSON.stringify(tx.toJSON()))
  })

  it('complex type convert default', () => {
    const json = types.Transaction().toJSON()
    json.action = {
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
    const input = types.Transaction()
    input.fromJSON(json)
    expect(XDRtoJSON(input.toXDR('base64'), 'Transaction')).to.equal(JSON.stringify(json))
  })
})
