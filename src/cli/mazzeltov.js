import Client from '../client/node-client.js'
import program from 'commander'
import fs from 'fs'

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

const transactionOptions = [
  [
    '-c --channel_id <s>',
    'Base64 channel ID to send transaction to. ""'
  ]
]

const transactionCallDesc = `
Submits a call transaction to a mazzaroth node. The format of <val> is a json
string that can be formatted into a CallTransaction protobuf:
(https://github.com/kochavalabs/mazzaroth-proto)

Examples:
  mazzeltov transaction-call '{"toCall":"my_func", "input":"["base64"]"}'
`
clientCommand('transaction-call', transactionCallDesc, transactionOptions,
  (val, options, client) => {
    const submitRequest = {
      channelId: options.channel_id || '',
      nonce: Math.floor(Math.random() * Math.floor(1000000000)),
      call: JSON.parse(val)
    }
    client.transactionSubmit(submitRequest).then(res => {
      console.log(res)
      console.log(res.transaction['id'].toString('base64'))
    })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
        } else {
          console.log(error)
        }
      })
  })

const contractUpdateDesc = `
Submits an update transaction to a mazzaroth node. The format of <val> is a path
to a file containing contract wasm bytes.
(https://github.com/kochavalabs/mazzaroth-proto)

Examples:
  mazzeltov contract-update ./test/data/hello_world.wasm
`
clientCommand('contract-update', contractUpdateDesc, transactionOptions,
  (val, options, client) => {
    fs.readFile(val, (err, data) => {
      const submitRequest = {
        channelId: options.channel_id || '',
        nonce: Math.floor(Math.random() * Math.floor(1000000000)),
        update: {
          wasmBytes: data
        }
      }
      if (err) throw err
      client.transactionSubmit(submitRequest).then(res => {
        console.log(res)
        console.log(res.transaction['id'].toString('base64'))
      })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
          } else {
            console.log(error)
          }
        })
    })
  })

const transactionLookupDesc = `
Looks up the current status and results of a transaction by ID. Val is simply
a transaction ID (an integer).

Examples:
  mazzeltov transaction-lookup 7R1/5XGlwbF5r0Ijcig5AsFSC9txDGbGEmZDHfKRRAw=
`
clientCommand('transaction-lookup', transactionLookupDesc, [],
  (val, options, client) => {
    client.transactionLookup(val).then(res => {
      console.log(res)
    })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
        } else {
          console.log(error)
        }
      })
  })

function blockLookupCommand (lookupFunc, cmd, desc) {
  const blockLookupDesc = `
Looks up a ${desc} using either a block ID as base64 or block Number.
Examples:
  mazzeltov ${cmd} 7R1/5XGlwbF5r0Ijcig5AsFSC9txDGbGEmZDHfKRRAw=
  mazzeltov ${cmd} 1000
  `
  clientCommand(cmd, blockLookupDesc, [],
    (val, options, client) => {
      const possibleInt = parseInt(val)
      if (!isNaN(possibleInt) && possibleInt.toString() === val) {
        val = possibleInt
      }
      client[lookupFunc](val).then(res => {
        console.log(res)
      })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
          } else {
            console.log(error)
          }
        })
    })
}
blockLookupCommand('blockLookup', 'block-lookup', 'Block')
blockLookupCommand('blockHeaderLookup', 'block-header-lookup', 'Block Header')

program.on('command:*', function (command) {
  program.help()
})

program.parse(process.argv)
