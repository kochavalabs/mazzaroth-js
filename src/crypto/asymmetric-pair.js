import Debug from 'debug'

const debug = Debug('mazzeltov:asymmetric-pair')

function padKey (key, length) {
  let pad = 0
  if (length > key.length) {
    pad = length - key.length
  }
  return Buffer.concat([new Uint8Array(pad), key])
}

export default class AsymmetricKeyPair {
  constructor (privateKey, publicKey, privLength, pubLength) {
    privLength = privLength || 32
    pubLength = pubLength || 32
    debug('Private key: %o', privateKey)
    debug('Public key: %o', publicKey)
    debug('Private key length: %o', privLength)
    debug('Public key length: %o', pubLength)
    this.Private = padKey(Buffer.from(privateKey, 'hex'), privLength)
    this.Public = padKey(Buffer.from(publicKey, 'hex'), pubLength)
  }
}
