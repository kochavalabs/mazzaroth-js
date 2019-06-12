import Client from '../client/node-client.js'
import program from 'commander'
import fs from 'fs'

const defaultChannel = '0'.repeat(64)

const clientCommand = (command, desc, opts, action) => {
  let cmd = program.command(`${command} <val>`)
  cmd.description(desc)
    .option('-h --host <s>',
      'Web address of the host node default: "http://localhost:8081"')
    .option('-k --priv_key <s>',
      'Priv key hex to sign contract with.')

  for (const opt of opts) {
    if (opt[2]) {
      cmd.option(opt[0], opt[1], opt[2])
    } else {
      cmd.option(opt[0], opt[1])
    }
  }
  cmd.action(function (val, options) {
    options.host = options.host || 'http://localhost:8081'
    const client = new Client(options.host, options.priv_key)
    action(val, options, client)
  })
}

const transactionOptions = [
  [
    '-c --channel_id <s>',
    'Base64 channel ID to send transaction to.'
  ],
  [
    '-n --nonce <s>',
    'Nonce to sent the request with.'
  ]

]

const callArgs = []
const callOptions = [
  [
    '-a --args <args>',
    'Arguments to the transaction call as base64 encoded strings.',
    function (arg) {
      callArgs.push(arg)
    }
  ]
]

const transactionCallDesc = `
Submits a call transaction to a mazzaroth node. 
(https://github.com/kochavalabs/mazzaroth-xdr)

Examples:
  mazzeltov transaction-call my_func -a 9uZz -a f1zsfABG7J
`
clientCommand('transaction-call', transactionCallDesc, transactionOptions.concat(callOptions),
  (val, options, client) => {
    const action = {
      channelID: options.channel_id || defaultChannel,
      nonce: options.nonce || Math.floor(Math.random() * Math.floor(1000000000)),
      call: {
        function: val,
        parameters: callArgs
      }
    }
    client.transactionSubmit(action).then(res => {
      console.log(JSON.stringify(res._attributes))
      console.log(`Status: ` + res._attributes.statusInfo.toString())
      console.log('TxID: ' + res.transactionID().toString('hex'))
    })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
        } else {
          console.log(error)
        }
      })
  })

const readonlyCallDesc = `
Submits a readonly call transaction to a mazzaroth node. 
(https://github.com/kochavalabs/mazzaroth-xdr)

Examples:
  mazzeltov readonly-call my_func -a 9uZz -a f1zsfABG7J
`
clientCommand('readonly-call', readonlyCallDesc, transactionOptions.concat(callOptions),
  (val, options, client) => {
    const action = {
      channelID: options.channel_id || defaultChannel,
      nonce: 0,
      call: {
        function: val,
        parameters: callArgs
      }
    }
    client.readonlySubmit(action).then(res => {
      console.log(`Receipt: ` + JSON.stringify(res._attributes.receipt))
      console.log(`Status: ` + res._attributes.statusInfo.toString())
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
(https://github.com/kochavalabs/mazzaroth-xdr)

Examples:
  mazzeltov contract-update ./test/data/hello_world.wasm
`
clientCommand('contract-update', contractUpdateDesc, transactionOptions,
  (val, options, client) => {
    fs.readFile(val, (err, data) => {
      const action = {
        channelID: options.channel_id || defaultChannel,
        nonce: options.nonce || Math.floor(Math.random() * Math.floor(1000000000)),
        update: {
          contract: data
        }
      }
      if (err) throw err
      client.transactionSubmit(action).then(res => {
        let response = JSON.stringify(res._attributes)
        console.log(`Response: ` + response)
        console.log(`Status: ` + res._attributes.statusInfo.toString())
        console.log('TxID: ' + res.transactionID().toString('hex'))
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
Looks up the current status and results of a transaction by ID. Val is  a
transaction ID (256 bit hex value).

Examples:
  mazzeltov transaction-lookup 3a547668e859fb7b112a1e2dd7efcb739176ab8cfd1d9f224847fce362ebd99c
`
clientCommand('transaction-lookup', transactionLookupDesc, [],
  (val, options, client) => {
    client.transactionLookup(val).then(res => {
      console.log(JSON.stringify(res._attributes))
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
Looks up a ${desc} using either a block ID as hex or block Number.
Examples:
  mazzeltov ${cmd} 3a547668e859fb7b112a1e2dd7efcb739176ab8cfd1d9f224847fce362ebd99c
  mazzeltov ${cmd} 1000
  `
  clientCommand(cmd, blockLookupDesc, [],
    (val, options, client) => {
      const possibleInt = parseInt(val)
      if (!isNaN(possibleInt) && possibleInt.toString() === val) {
        val = possibleInt
      }
      client[lookupFunc](val).then(res => {
        console.log(JSON.stringify(res._attributes))
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

const receiptLookupDesc = `
Looks up a transaction receipt. Val is a transaction ID (256 bit hex value).

Examples:
  mazzeltov receipt-lookup 3a547668e859fb7b112a1e2dd7efcb739176ab8cfd1d9f224847fce362ebd99c
`
clientCommand('receipt-lookup', receiptLookupDesc, [],
  (val, options, client) => {
    client.receiptLookup(val).then(res => {
      console.log(JSON.stringify(res._attributes))
    })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
        } else {
          console.log(error)
        }
      })
  })

const nonceLookupDesc = `
Looks up the current nonce for an account, Val is an account ID (256 bit hex value).

Examples:
  mazzeltov nonce-lookup 3a547668e859fb7b112a1e2dd7efcb739176ab8cfd1d9f224847fce362ebd99c
`
clientCommand('nonce-lookup', nonceLookupDesc, [],
  (val, options, client) => {
    client.publicKey = Buffer.from(val, 'hex')
    client.nonceLookup().then(res => {
      console.log(JSON.stringify(res._attributes))
      console.log('Nonce: ' + res.nonce())
    })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
        } else {
          console.log(error)
        }
      })
  })

program.on('command:*', function (command) {
  program.help()
})

program.parse(process.argv)
