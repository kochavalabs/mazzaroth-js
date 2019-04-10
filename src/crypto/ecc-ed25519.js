import Debug from 'debug'

import { eddsa as EdDSA } from 'elliptic'

const debug = Debug('mazzeltov:ecc-ed25519')

const sig = new EdDSA('ed25519')

function sign (privateKey, message) {
  debug('Signing.')
  debug('private key: %o', privateKey)
  debug('message: %o', message)
  const key = sig.keyFromSecret(privateKey)
  return Buffer.from(key.sign(message).toHex(), 'hex')
}

function verify (publicKey, message, signature, hashFunc) {
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

export { sign, verify, fromPrivate }
