/* eslint no-unused-expressions: 0 */
import { describe, it } from 'mocha'
import { expect } from 'chai'
import AsymmetricKeyPair from '../../src/crypto/asymmetric-pair.js'

describe('asymmetric pair', () => {
  describe('constructor', () => {
    it('accepts buffers as keys', () => {
      const privKey = Buffer.from([1, 2, 3])
      const pubKey = Buffer.from([3, 2, 1])
      const expectedPriv = Buffer.concat([new Uint8Array(29), privKey])
      const expectedPub = Buffer.concat([new Uint8Array(29), pubKey])
      const pair = new AsymmetricKeyPair(privKey, pubKey)
      expect(pair.Private).to.deep.equal(expectedPriv)
      expect(pair.Public).to.deep.equal(expectedPub)
    })

    it('accepts hex as keys', () => {
      const privKey = Buffer.from([255, 2, 3])
      const pubKey = Buffer.from([3, 2, 1])
      const expectedPriv = Buffer.concat([new Uint8Array(50), privKey])
      const expectedPub = Buffer.concat([new Uint8Array(40), pubKey])
      const pair = new AsymmetricKeyPair(
        privKey.toString('hex'),
        pubKey.toString('hex'),
        53, 43
      )
      expect(pair.Private).to.deep.equal(expectedPriv)
      expect(pair.Public).to.deep.equal(expectedPub)
    })
  })
})
