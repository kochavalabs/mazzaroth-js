import NodeClient from './client/node-client.js'
import ContractClient from './client/contract-client.js'
import { RunExecutionPlan } from './client/utils.js'
import { fromPrivate, generateKeys } from './crypto/ecc-ed25519.js'

function AccountGenerate () {
  return generateKeys()
}

function AddressFromPrivate (priv) {
  return fromPrivate(priv)
}

export { NodeClient, ContractClient, AccountGenerate, RunExecutionPlan, AddressFromPrivate }
