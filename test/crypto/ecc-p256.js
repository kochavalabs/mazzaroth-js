/* eslint no-unused-expressions: 0 */
import { describe, it } from 'mocha'
import { expect } from 'chai'
import { sign, verify, generate, fromPrivate } from '../../src/crypto/ecc-p256.js'
import AsymmetricKeyPair from '../../src/crypto/asymmetric-pair.js'

const privateKey = Buffer.from(
  '25590b07bb236b0cdc4052550093684efe4e8123291c11095e1360203c0b1a63',
  'hex'
)

const publicKey = Buffer.from(
  '0e609d4eea6ecac33fd083bf108e90db5a31fbf9239bc5cc19a8a6dd10b61050' +
  'c746f61b03ab399bcc5d18bd33953b4e73a4fdf7529f58747304a32c4814d24e',
  'hex'
)

describe('p256 ecc', () => {
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
      expect(result.Private.length).to.equal(32)
      expect(result.Public.length).to.equal(64)
    })
  })

  describe('from private', () => {
    it('gets the corresponding public key', () => {
      expect(fromPrivate(privateKey)).to.deep.equal(publicKey)
    })
  })
})
