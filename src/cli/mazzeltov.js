import program from 'commander'
import Client from '../client/node-client.js'

const clientCommand = (command, desc, opts, action) => {
  let cmd = program.command(`${command} <val>`)
  cmd.description(desc)
    .option('-h --host <s>',
      'Web address of the host node default: "http://localhost:8081"')
    .option('-k --priv_key <s>',
      'Priv key hex to sign contract with. default: "0"')

  for (const opt of opts) {
    cmd.option(opt[0], opt[1])
  }
  cmd.action(function (val, options) {
    options.host = options.host || 'http://localhost:8081'
    options.priv_key = options.priv_key || '0'
    const client = new Client(options.host, options.priv_key)
    action(val, options, client)
  })
}

const transactionSubmitDesc = `
Submits a transaction to a mazzaroth node. The format of <val> is a json string
that can be formatted into a transaction protobuf:
(https://github.com/kochavalabs/mazzaroth/blob/develop/pkg/pb/transaction.proto)

Examples:
  mazzeltov transaction-submit '{"channelId":"$ID", "call":"hello"}'
`
clientCommand('transaction-submit', transactionSubmitDesc, [],
  (val, options, client) => {
    client.transactionSubmit(JSON.parse(val)).then(res => {
      console.log(res)
    })
      .catch(error => console.log(error.response.data))
  })

const transactionLookupDesc = `
Looks up the current status and results of a transaction by ID. Val is simply
a transaction ID (an integer).

Examples:
  mazzeltov transaction-lookup 909970530173428724
`
clientCommand('transaction-lookup', transactionLookupDesc, [],
  (val, options, client) => {
    client.transactionLookup(val).then(res => {
      console.log(res)
    })
      .catch(error => console.log(error.response.data))
  })

program.on('command:*', function (command) {
  program.help()
})

program.parse(process.argv)
