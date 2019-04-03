import fs from 'fs'
import program from 'commander'
import Client from '../client/node-client.js'

const clientCommand = (command, options, action) => {
  let cmd = program.command(`${command} <val>`)
  cmd.option('-h --host <s>', 'Web address of the host node default: "http://localhost:8081"')
    .option('-k --priv_key <s>', 'Priv key hex to sign contract with. default: "0"')

  for (const opt of options) {
    cmd.option(opt[0], opt[1])
  }
  cmd.action(function (val, options) {
    options.host = options.host || 'http://localhost:8081'
    options.priv_key = options.priv_key || '0'
    const client = new Client(options.host, options.priv_key)
    action(val, options, client)
  })
}

clientCommand('contract-deploy', [['-n --contract_name <s>', 'Priv key hex to sign contract with. default: "contract"']],
  (val, options, client) => {
    const name = options.contract_name || 'contract'
    fs.readFile(val, (err, data) => {
      if (err) throw err
      client.contractDeploy(data, name).then(res => {
        console.log(res.contract.contractId.toString('hex'))
      })
        .catch(error => console.log(error.response.data))
    })
  })

clientCommand('transaction-submit', [],
  (val, options, client) => {
    client.transactionSubmit(JSON.parse(val)).then(res => {
      console.log(res)
    })
      .catch(error => console.log(error.response.data))
  })

clientCommand('transaction-lookup', [],
  (val, options, client) => {
    client.transactionLookup(val).then(res => {
      console.log(res)
    })
      .catch(error => console.log(error.response.data))
  })

program.parse(process.argv)
