import Debug from 'debug'
import axios from 'axios'
import { pb } from 'mazzaroth-proto'

const debug = Debug('mazzeltov:node-client')

class Client {
  constructor (host, privateKey) {
    debug('host: %o', host)
    debug('private key: %o', privateKey)
    this.host = host
    this.privateKey = privateKey
  }

  transactionSubmit (txObj) {
    debug('Sending transaction: ' + txObj)
    const txProto = pb.Transaction.create(txObj)
    const signedTx = pb.SignedTransaction.create({
      transaction: pb.Transaction.encode(txProto).finish(),
      signature: Buffer.from('1231245321', 'hex')
    })

    const request = pb.TransactionSubmitRequest.create({
      transaction: signedTx
    })
    const body = JSON.stringify(request)
    return axios
      .post(this.host + '/transaction_submit', body)
      .then(res => {
        return pb.TransactionSubmitResponse.create(res.data)
      })
  }

  transactionLookup (txID) {
    debug('Looking up transaction: ' + txID)
    const request = pb.TransactionLookupRequest.fromObject({ id: txID })
    debug(request)
    const body = JSON.stringify(request)
    return axios
      .post(this.host + '/transaction_lookup', body)
      .then(res => {
        return pb.TransactionLookupResponse.create(res.data)
      })
  }

  contractDeploy (wasmBytes, contractName) {
    debug('Deploying contract: ' + contractName)
    const contractMessage = pb.Contract.create({
      name: contractName,
      ownerId: this.privateKey,
      wasmBytes: wasmBytes
    })
    const signedContract = pb.SignedContract.create({
      contract: pb.Contract.encode(contractMessage).finish(),
      signature: Buffer.from('1231245321', 'hex')
    })

    const request = pb.ContractDeployRequest.create({
      contract: signedContract })

    const body = JSON.stringify(request)
    return axios
      .post(this.host + '/contract_deploy', body)
      .then(res => {
        return pb.ContractDeployResponse.create(res.data)
      })
  }
}

export default Client
