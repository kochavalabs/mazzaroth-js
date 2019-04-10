/* eslint no-unused-expressions: 0 */
import { describe, it } from 'mocha'
import { expect } from 'chai'
import { sign, verify, fromPrivate } from '../../src/crypto/ecc-ed25519.js'

const privateKey = Buffer.from(
  'e0bb782b8db5fbf89c3a7ed8906883ca86afff4544c6e8f5473a2c6ebea950be',
  'hex'
)

const publicKey = Buffer.from(
  '0f7a03564104143183152363a3b6647f3c918ea300ab307d1647c864fc778011',
  'hex'
)

const privateKey2 = Buffer.from(
  '3a547668e859fb7b112a1e2dd7efcb739176ab8cfd1d9f224847fce362ebd99c',
  'hex'
)

const publicKey2 = Buffer.from(
  '69ec35fafe61e514f4d2e54279671ab7e1e7fee9c4356da912ecd9f49db06773',
  'hex'
)

const message2 = Buffer.from(
  '91b5963ab438f4ddf9dbdda98d50eab56fb8dbab24242fd86997ed99d89f0869549ea309d697e6d072c479ff1464b4831c902e40b45e181df506b6cda5be36f95cd9023270e902e2ad7ce1c1e09545fc25733cd9d155f6c65bac93006ac9f9c6a2fcf912e5fbf49277d553576b9853900c906adde560',
  'hex'
)

const signature2 = Buffer.from(
  'b5aa14ad195fa99bcc1a0e77eb92903d6eb5fb387c3b71a3d19ac80ec86c1615251cc2ee0e06ba91319e5f56b893b03fb1160aa8dab4a72f69aa77be92d98d0c',
  'hex'
)

describe('ed25519 ecc', () => {
  describe('sign', () => {
    it('returns a buffer signature', () => {
      const signature = sign('asdf', 'qwer')
      expect(signature).to.be.instanceof(Buffer)
    })
  })

  describe('verify', () => {
    it('does not verify with bad inputs.', () => {
      let result = verify('a', '', '')
      expect(result).to.be.false
      result = verify('', 'a', '')
      expect(result).to.be.false
      result = verify('', '', 'a')
      expect(result).to.be.false
      result = verify('', '', '')
      expect(result).to.be.false
      result = verify('', '', Buffer.from(new Uint8Array(64)))
      expect(result).to.be.false
    })
  })

  describe('sign/verify', () => {
    it('should sign and verify message', () => {
      const message = Buffer.from([1, 2, 3, 4, 5, 5])
      const signature = sign(privateKey, message)
      expect(verify(publicKey, message, signature)).to.be.true
    })

    it('should sign and verify message2', () => {
      const message = Buffer.from([4, 5, 5, 8, 10, 3])
      const signature = sign(privateKey2, message)
      expect(verify(publicKey2, message, signature)).to.be.true
    })

    it('Generate correct signature based on reference impl.', () => {
      const signature = sign(privateKey2, message2)
      expect(signature).to.deep.equal(signature2)
    })

    it('Verifies signature based on a reference impl.', () => {
      const verified = verify(publicKey2, message2, signature2)
      expect(verified).to.be.true
    })
  })

  describe('from private', () => {
    it('gets the corresponding public key', () => {
      expect(fromPrivate(privateKey)).to.deep.equal(publicKey)
      expect(fromPrivate(privateKey2)).to.deep.equal(publicKey2)
    })
  })
})
