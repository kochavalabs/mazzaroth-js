# Mazzaroth-js

[![CircleCI](https://circleci.com/gh/kochavalabs/mazzaroth-js.svg?style=svg)](https://circleci.com/gh/kochavalabs/mazzaroth-js)

Mazzaroth-js is a javascript library that facilitates the interaction with
Mazzaroth nodes from both the browser or from [node-js](https://nodejs.org/en/).
It does this by exporting two clients and some utility functions.

## Node Client

The node client is used to interact with a Mazzaroth node by abstracting some
of the standard node operations. This includes encapsulating the node HTTP
endpoints, signing operations, and the creation of a properly formed HTTP
body. The following functions are exposed:

### transactionSubmit

Submits a write transaction to a Mazzaroth node. These are transactions
that must be signed and will eventually be sent to the backing census
pool to be submitted to the blockchain. This includes transactions that
update channel state including contract updates and authorization
transactions. Write transactions are submitted asynchronously and the
results must be looked up by querying the Receipt for the transaction.

### readonlySubmit

Submits a read-only transaction to a Mazzaroth node. Read-only transactions
do not update channel state so they will return a result immediately
without hitting the consensus pool.

### Lookups

There are several functions that allow you to lookup various information. These
include transactionLookup, blockLookup, blockHeaderLookup, receiptLookup,
nonceLookup, accountInfoLookup and channelInfoLookup. Lookup functions are
synchronous read-only requests hat will get the latest state based on the
non-consensus node that this lookup hits.

## Installation

This library can be added to your project by using npm to install the
mazzaroth-js package.

```bash
npm install mazzaroth-js
```

## Usage

For a more detailed example of how to use the contract client in conjunction
with our CLI tools, XDR generation, and our XDR code generation tool: see the
full contract [example](https://github.com/kochavalabs/full-contract-example).

### Node-Client

```js
import { NodeClient } from 'mazzaroth-js'

// Private key for the account is 3x64
const accountPrivKey = '3'.repeat(64)
const mazzNodeAddr = 'http://localhost:8081'
const channelID = '0'.repeat(64)

const client = new NodeClient(mazzNodeAddr, accountPrivKey)

// Lookup the nonce for the account 1x64
client.nonceLookup('1'.repeat(64)).then(res => {
  console.log(res.toJSON())
  /**
    { nonce: '0',
      stateStatus: { previousBlock: '0', transactionCount: '0' },
      status: 1,
      statusInfo: 'Found nonce for account.' }
  **/
})

// Make a contract function call. To the contract function 'args' which takes
// three strings parameters
const action = {
  channelID: channelID,
  nonce: '0',
  // The category of this call is a transaction submission.
  // These categories are defined here under ActionCategoryType:
  // https://github.com/kochavalabs/mazzaroth-xdr/blob/develop/idl/transaction.x
  category: {
    enum: 1,
    value: {
      function: 'args',
      // Parameters are a variable length string xdr representation. They should
      // be formatted to JSON if sending a complex struct
      parameters: ["one", "two", "three"]
    }
  }
}
client.transactionSubmit(action).then(res => {
  console.log(res.toJSON())
  /**
    { transactionID:
       '5965cbdb960be918df61f7b315d3be446d40e5ef9ffb96b64d1c79fed00eb03f',
      status: 1,
      statusInfo: 'Transaction has been accepted and is being executed.' }
  **/
})

// Lookup the result of the transaction
const receiptID = '5965cbdb960be918df61f7b315d3be446d40e5ef9ffb96b64d1c79fed00eb03f'
client.receiptLookup(receiptID).then(res => {
  console.log(res.toJSON())
  /**
    { receipt:
       { status: 1,
         stateRoot:
          'e9f60907387ecb51140fe22451736c69a6b83c5f7d42806f9e09f2e5452ebd0e',
         events: [],
         result: '11' },
      stateStatus: { previousBlock: '0', transactionCount: '2' },
      status: 1,
      statusInfo: 'Transaction has been accepted and is being executed.' }
  **/
})
```

### Contract-Client

[MIT](https://choosealicense.com/licenses/mit/)
