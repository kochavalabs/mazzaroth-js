import NodeClient from './client/node-client.js'
import ContractClient from './client/contract-client.js'
import { generateKeys } from './crypto/ecc-ed25519.js'

function AccountGenerate () {
  return generateKeys()
}

export { NodeClient, ContractClient, AccountGenerate }
