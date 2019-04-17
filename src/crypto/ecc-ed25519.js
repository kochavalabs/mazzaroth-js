import Debug from 'debug'

import { eddsa as EdDSA, ec as EC } from 'elliptic'

const debug = Debug('mazzeltov:ecc-ed25519')

const sig = new EdDSA('ed25519')
const curve = new EC('curve25519')

function generateKeys () {
  const key = curve.genKeyPair()
  const privKey = Buffer.from('00' + key.getPrivate().toString(16), 'hex')
  return {
    priv: privKey,
    pub: fromPrivate(privKey)
  }
}

function sign (privateKey, message) {
  debug('Signing.')
  debug('private key: %o', privateKey)
  debug('message: %o', message)
  const key = sig.keyFromSecret(privateKey)
  return Buffer.from(key.sign(message).toHex(), 'hex')
}

function verify (publicKey, message, signature) {
  debug('Verifying')
  debug('publicKey: %o', publicKey)
  debug('message: %o', message)
  debug('signature: %o', signature)
  signature = Buffer.from(signature, 'hex')
  if (signature.length !== 64) {
    return false
  }
  const key = sig.keyFromPublic(publicKey.toString('hex'))
  return key.verify(message, signature.toString('hex'))
}

function fromPrivate (privateKey) {
  return Buffer.from(sig.keyFromSecret(privateKey).getPublic())
}

export { sign, verify, fromPrivate, generateKeys }
