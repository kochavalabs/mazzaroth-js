# Mazzeltov

A node library and cli for interacting with Mazzaroth nodes. Name is pending.

## Sample execution of CLI

```bash
➜  mazzeltov git:(master) ✗ npm run cli contract-deploy './test/data/hello_world.wasm'
no0ZBDVgZFmlG78hFkRXFG7992C4DRY1ezh+Wxkv4dNqpO21OzWSW28tJM4Q5xYb3iWydpITt8m+C5SRiRPFiw==

➜  mazzeltov git:(master) npm run cli transaction-submit '{"contractId":"no0ZBDVgZFmlG78hFkRXFG7992C4DRY1ezh+Wxkv4dNqpO21OzWSW28tJM4Q5xYb3iWydpITt8m+C5SRiRPFiw==", "call":"hello"}'"call":"hello"}'
TransactionSubmitResponse {
  transaction:
   { id: '15255713814378789468',
     signedTransaction:
      'CkkKQJ6NGQQ1YGRZpRu/IRZEVxRu/fdguA0WNXs4flsZL+HTaqTttTs1kltvLSTOEOcWG94lsnaSE7fJvguUkYkTxYsqBWhlbGxvEgUSMSRTIQ==' },
  status: 'TX_ACCEPTED',
  statusInfo: 'Transaction has been accepted and is being executed.' }

➜  mazzeltov git:(master) ✗ npm run cli transaction-lookup 15255713814378789468
TransactionLookupResponse {
  transaction:
   { id: '15255713814378789468',
     signedTransaction:
      'CkkKQJ6NGQQ1YGRZpRu/IRZEVxRu/fdguA0WNXs4flsZL+HTaqTttTs1kltvLSTOEOcWG94lsnaSE7fJvguUkYkTxYsqBWhlbGxvEgUSMSRTIQ==' },
  status: 'TX_CONFIRMED',
  statusInfo:
   'Transaction has been accepted, executed and saved to the blockchain.',
  result: 'BAAAAA4AAAA=' }
```
