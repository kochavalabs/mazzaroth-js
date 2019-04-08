import Debug from 'debug'
import AsymeticKeyPair from './asymmetric-pair.js'

const debug = Debug('mazzeltov:ecc-c25519')

function generate () {
  return new AsymeticKeyPair(
    Buffer.from(new Uint8Array(32)), Buffer.from(new Uint8Array(32))
  )
}

function sign (privateKey, message) {
  debug('Signing.')
  debug('private key: %o', privateKey)
  debug('message: %o', message)

  return Buffer.from([1, 2, 3])
}

function verify (publicKey, message, signature) {
  return false
}

function fromPrivate (privateKey) {
  return privateKey
}

export { sign, generate, verify, fromPrivate }
