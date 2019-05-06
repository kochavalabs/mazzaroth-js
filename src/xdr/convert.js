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
  action.channelID(Buffer.from(toConvert.channelID, 'hex'))
  action.nonce(UnsignedHyper.fromString(toConvert.nonce.toString()))

  if (toConvert.call) {
    const call = new types.Call()
    call.function(toConvert.call.function)
    const parameters = []
    toConvert.call.parameters.forEach((param) => {
      parameters.push(Buffer.from(param, 'base64'))
    })
    call.parameters(parameters)
    action.category(types.ActionCategory.CALL(call))
  } else if (toConvert.update) {
    const update = new types.Update()
    update.contract(Buffer.from(toConvert.update.contract, 'base64'))
    action.category(types.ActionCategory.UPDATE(update))
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
    blockLookup.ID(types.Identifier.NUMBER(num))
    debug('Looking up block by number: %o', blockLookup)
  } else {
    blockLookup.ID(
      types.Identifier.HASH(Buffer.from(attribute, 'hex')))
    debug('Looking up block by ID: %o', blockLookup)
  }
  return blockLookup
}

export { TransactionFromObject, ActionFromObject, BlockLookupRequestFromAttribute }
