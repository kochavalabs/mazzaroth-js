# Mazel Tov

A node library and cli for interacting with Mazzaroth nodes. Name is pending.

## Sample execution of CLI

```bash
➜  mazzeltov git:(master) ✗ npm run cli contract-deploy './test/data/hello_world.wasm'
XWhktL6k4qb/+afmIFC8k6H+w73VyDdUc2TuCXjUxCTGvzztH5JnKZBqR/lBXMrNnnH4vlzBor9dDWDJ2WwSwQ==
➜  mazzeltov git:(master) ✗ npm run cli transaction-submit '{"contractId":"XWhktL6k4qb/+afmIFC8k6H+w73VyDdUc2TuCXjUxCTGvzztH5JnKZBqR/lBXMrNnnH4vlzBor9dDWDJ2WwSwQ==", "call":"hello"}'
  transaction:
   { id: '3454298990549030632',
     signedTransaction:
      'CkkKQF1oZLS+pOKm//mn5iBQvJOh/sO91cg3VHNk7gl41MQkxr887R+SZymQakf5QVzKzZ5x+L5cwaK/XQ1gydlsEsEqBWhlbGxvEgUSMSRTIQ==' },
  status: 'TX_ACCEPTED',
  statusInfo: 'Transaction has been accepted and is being executed.' }
➜  mazzeltov git:(master) ✗ npm run cli transaction-lookup 3454298990549030632
```
