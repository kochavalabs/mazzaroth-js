# Mazzaroth-js

Mazzaroth-js is a javascript library that facilitates the interaction with
Mazzaroth nodes from both the browser or from [node-js](https://nodejs.org/en/).

## Installation

This library can be added to your project by using npm to install the
mazzaroth-js package.

```bash
npm install mazzaroth-js
```

## Usage

For a more detailed example of how to use the this client in conjunction with
our CLI tools, XDR generation, and our XDR code generation tool see the full
contract [example](https://github.com/kochavalabs/full-contract-example).

### Node-Client

```js
import { NodeClient } from 'mazzaroth-js'

// Private key for the account is 3x64
const accountPrivKey = '3'.repeat(64)
const mazzNodeAddr = 'http://localhost:8081'
const channelID = '0'.repeat(64)

const client = new NodeClient(mazzNodeAddr, accountPrivKey)

// Lookup tne nonce for the account 1x64
client.nonceLookup('1'.repeat(64)).then(res => {
  console.log(res.toJSON())
  /**
    { nonce: '0',
      stateStatus: { previousBlock: '0', transactionCount: '0' },
      status: 1,
      statusInfo: 'Found nonce for account.' }
  **/
})

// Make a contract function call. To the contract function 'hello' which takes
// no parameters.
const action = {
  channelID: channelID,
  nonce: '0',
  // The category of this call is a transaction submission.
  // These categories are defined here under ActionCategoryType:
  // https://github.com/kochavalabs/mazzaroth-xdr/blob/develop/idl/transaction.x
  category: {
    enum: 1,
    value: {
      function: 'hello',
      // Parameters are passed here using base64 XDR representations
      // for a smoother experience using json, try the contract-client
      parameters: []
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
         result: 'AAAADg==' },
      stateStatus: { previousBlock: '0', transactionCount: '2' },
      status: 1,
      statusInfo: 'Transaction has been accepted and is being executed.' }
  **/
})
```

### Contract Client

TODO

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Notes

- The XDR Quad type is currently not supported
