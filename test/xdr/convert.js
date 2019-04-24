import { describe, it } from 'mocha'
import { expect } from 'chai'
import { TransactionFromObject } from '../../src/xdr/convert.js'
import { UnsignedHyper } from 'js-xdr'

const x256 = '3a547668e859fb7b112a1e2dd7efcb739176ab8cfd1d9f224847fce362ebd99c'
const x512 = x256 + x256
const base64 = '9uZzPoEf1zsfABG7J6toIMio3VMY8eQnErkZTCURMu8/uwZNKkvmyBsjQBs/BWg'

describe('xdr convert tests', () => {
  it('transaction common fields', () => {
    const txObject = {
      signature: x512,
      address: x256,
      action: {
        channelId: x256,
        nonce: 3,
        call: {
          function: 'asdf',
          parameters: base64
        }
      }
    }

    const txXdr = TransactionFromObject(txObject)

    expect(txXdr.signature()).to.deep.equal(Buffer.from(x512, 'hex'))
    expect(txXdr.address()).to.deep.equal(Buffer.from(x256, 'hex'))
    expect(txXdr.action().channelId()).to.deep.equal(Buffer.from(x256, 'hex'))
    expect(txXdr.action().nonce()).to.deep.equal(new UnsignedHyper(3))
  })

  it('transaction common alternative formats', () => {
    const txObject = {
      signature: Buffer.from(x512, 'hex'),
      address: Buffer.from(x256, 'hex'),
      action: {
        channelId: x256,
        nonce: '3',
        call: {
          function: 'asdf',
          parameters: Buffer.from(base64, 'base64')
        }
      }
    }
    const txXdr = TransactionFromObject(txObject)

    expect(txXdr.action().nonce()).to.deep.equal(new UnsignedHyper(3))
  })

  it('transaction from object call', () => {
    const txObject = {
      signature: x512,
      address: x256,
      action: {
        channelId: x256,
        nonce: 3,
        call: {
          function: 'asdf',
          parameters: base64
        }
      }
    }
    const txXdr = TransactionFromObject(txObject)

    expect(txXdr.toXDR()).to.not.equal(null)
    expect(txXdr.action().category().get().function()).to.equal('asdf')
    expect(txXdr.action().category().get().parameters()).to.deep.equal(
      Buffer.from(base64, 'base64'))
  })

  it('transaction from object update', () => {
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
    const txXdr = TransactionFromObject(txObject)

    expect(txXdr.toXDR()).to.not.equal(null)
    expect(txXdr.action().category().get().contract()).to.deep.equal(
      Buffer.from(base64, 'base64'))
  })
})
