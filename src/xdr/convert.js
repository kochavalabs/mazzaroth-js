import Debug from 'debug'
import types from 'mazzaroth-xdr'
import { UnsignedHyper } from 'js-xdr'

const debug = Debug('mazzeltov:convert')

function TransactionFromObject (toConvert) {
  const tx = new types.Transaction()
  if (!toConvert.action) {
    return tx
  }

  const action = ActionFromObject(toConvert.action)

  tx.action(action)
  tx.address(Buffer.from(toConvert.address, 'hex'))
  tx.signature(Buffer.from(toConvert.signature, 'hex'))
  return tx
}

function ActionFromObject (toConvert) {
  const action = new types.Action()
  action.channelId(Buffer.from(toConvert.channelId, 'hex'))
  action.nonce(UnsignedHyper.fromString(toConvert.nonce.toString()))

  if (toConvert.call) {
    const call = new types.Call()
    call.function(toConvert.call.function)
    call.parameters(Buffer.from(toConvert.call.parameters, 'base64'))
    action.category(types.ActionCategory.call(call))
  } else if (toConvert.update) {
    const update = new types.Update()
    update.contract(Buffer.from(toConvert.update.contract, 'base64'))
    action.category(types.ActionCategory.update(update))
  }

  return action
}

// Creates a block/blockHeader lookup request based on the truth value
// of the header argument. Determins if attribute is a number of ID by checking
// its type.
function BlockLookupRequestFromAttribute (attribute, header) {
  let blockLookup = new types.BlockLookupRequest()
  if (header) {
    blockLookup = new types.BlockHeaderLookupRequest()
  }
  if ((typeof attribute) === 'number') {
    const num = UnsignedHyper.fromString(attribute.toString())
    blockLookup.id(types.Identifier.number(num))
    debug('Looking up block by number: %o', blockLookup)
  } else {
    blockLookup.id(
      types.Identifier.hash(Buffer.from(attribute, 'hex')))
    debug('Looking up block by ID: %o', blockLookup)
  }
  return blockLookup
}

export { TransactionFromObject, ActionFromObject, BlockLookupRequestFromAttribute }
