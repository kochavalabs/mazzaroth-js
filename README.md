# Mazel Tov

A node library and cli for interacting with Mazzaroth nodes. Name is pending.

## Sample execution of CLI

```bash
➜  mazeltov git:(master) ✗ npm run cli contract-deploy './test/data/hello_world.wasm'

> mazeltov@0.1.0 cli /home/kbartush/workspace/mazzaroth/mazeltov
> npm run build && env DEBUG='mazeltov*' node ./dist/cli/mazeltov.js "contract-deploy" "./test/data/hello_world.wasm"


> mazeltov@0.1.0 build /home/kbartush/workspace/mazzaroth/mazeltov
> babel src -d dist

src/cli/mazeltov.js -> dist/cli/mazeltov.js
src/client/node-client.js -> dist/client/node-client.js
src/index.js -> dist/index.js
src/proto/bundle.js -> dist/proto/bundle.js
  mazeltov:node-client host: 'http://localhost:8081' +0ms
  mazeltov:node-client private key: '0' +2ms
  mazeltov:node-client Deploying contract: contract +4ms
XWhktL6k4qb/+afmIFC8k6H+w73VyDdUc2TuCXjUxCTGvzztH5JnKZBqR/lBXMrNnnH4vlzBor9dDWDJ2WwSwQ==
➜  mazeltov git:(master) ✗ npm run cli transaction-submit '{"contractId":"XWhktL6k4qb/+afmIFC8k6H+w73VyDdUc2TuCXjUxCTGvzztH5JnKZBqR/lBXMrNnnH4vlzBor9dDWDJ2WwSwQ==", "call":"hello"}'

> mazeltov@0.1.0 cli /home/kbartush/workspace/mazzaroth/mazeltov
> npm run build && env DEBUG='mazeltov*' node ./dist/cli/mazeltov.js "transaction-submit" "{\"contractId\":\"XWhktL6k4qb/+afmIFC8k6H+w73VyDdUc2TuCXjUxCTGvzztH5JnKZBqR/lBXMrNnnH4vlzBor9dDWDJ2WwSwQ==\", \"call\":\"hello\"}"


> mazeltov@0.1.0 build /home/kbartush/workspace/mazzaroth/mazeltov
> babel src -d dist

src/cli/mazeltov.js -> dist/cli/mazeltov.js
src/client/node-client.js -> dist/client/node-client.js
src/index.js -> dist/index.js
src/proto/bundle.js -> dist/proto/bundle.js
  mazeltov:node-client host: 'http://localhost:8081' +0ms
  mazeltov:node-client private key: '0' +2ms
  mazeltov:node-client Sending transaction: [object Object] +1ms
TransactionSubmitResponse {
  transaction:
   { id: '3454298990549030632',
     signedTransaction:
      'CkkKQF1oZLS+pOKm//mn5iBQvJOh/sO91cg3VHNk7gl41MQkxr887R+SZymQakf5QVzKzZ5x+L5cwaK/XQ1gydlsEsEqBWhlbGxvEgUSMSRTIQ==' },
  status: 'TX_ACCEPTED',
  statusInfo: 'Transaction has been accepted and is being executed.' }
```