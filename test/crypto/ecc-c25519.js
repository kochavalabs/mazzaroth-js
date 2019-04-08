/* eslint no-unused-expressions: 0 */
import { describe, it } from 'mocha'
import { expect } from 'chai'
import { sign, verify, generate, fromPrivate } from '../../src/crypto/ecc-c25519.js'
import AsymmetricKeyPair from '../../src/crypto/asymmetric-pair.js'

const privateKey = Buffer.from(
  '987d570a7c14d8ca4af891dbc03cd5c660b8cce2ed58900105a493fe9d7ede7a',
  'hex'
)

const publicKey = Buffer.from(
  '6c496f4f23d6ce8d3bb4374fe7333a98b5f24f0661077156f3155fbb1ee09034',
  'hex'
)

describe('c25519 ecc', () => {
  describe('sign', () => {
    it('returns a buffer signature', () => {
      const signature = sign('asdf', 'qwer')
      expect(signature).to.be.instanceof(Buffer)
    })
  })

  describe('verify', () => {
    it('does not verify with bad inputs.', () => {
      const result = verify('', '', '')
      expect(result).to.be.false
    })
  })

  describe('generate', () => {
    it('generates a key pair', () => {
      const result = generate()
      expect(result).to.be.instanceof(AsymmetricKeyPair)
    })

    it('keys are the correct length', () => {
      const result = generate()
      expect(result.Public.length).to.equal(32)
      expect(result.Private.length).to.equal(32)
    })
  })

  describe('from private', () => {
    it('gets the corresponding public key', () => {
      expect(fromPrivate(privateKey)).to.deep.equal(publicKey)
    })
  })
})
