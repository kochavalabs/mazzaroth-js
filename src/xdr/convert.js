import types from 'mazzaroth-xdr'
import { UnsignedHyper } from 'js-xdr'

function TransactionFromObject (toConvert) {
  const tx = new types.Transaction()
  if (!toConvert.action) {
    return tx
  }
  if (toConvert.action.call && toConvert.action.update) {
    return tx
  }

  const action = new types.Action()
  action.channelId(Buffer.from(toConvert.action.channelId, 'hex'))
  action.nonce(UnsignedHyper.fromString(toConvert.action.nonce.toString()))

  if (toConvert.action.call) {
    const call = new types.Call()
    call.function(toConvert.action.call.function)
    call.parameters(Buffer.from(toConvert.action.call.parameters, 'base64'))
    action.category(types.ActionCategory.call(call))
  }

  if (toConvert.action.update) {
    const update = new types.Update()
    update.contract(Buffer.from(toConvert.action.update.contract, 'base64'))
    action.category(types.ActionCategory.update(update))
  }

  tx.action(action)
  tx.address(Buffer.from(toConvert.address, 'hex'))
  tx.signature(Buffer.from(toConvert.signature, 'hex'))
  return tx
}

export { TransactionFromObject }
