import Client from './client/node-client.js'
import { generateKeys } from './crypto/ecc-ed25519.js'

function AccountGenerate () {
  return generateKeys()
}

export { Client, AccountGenerate }
