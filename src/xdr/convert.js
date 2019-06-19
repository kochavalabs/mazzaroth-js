import Debug from 'debug'
import types from 'mazzaroth-xdr'
import { UnsignedHyper } from 'js-xdr'
import BaseCursor from 'cursor'

const debug = Debug('mazzeltov:convert')

export function calculatePadding (length) {
  switch (length % 4) {
    case 0:
      return 0
    case 1:
      return 3
    case 2:
      return 2
    case 3:
      return 1
    default:
      return null
  }
}

class Cursor extends BaseCursor {
  writeBufferPadded (buffer) {
    const padding = calculatePadding(buffer.length)
    const paddingBuffer = Buffer.alloc(padding)

    return this.copyFrom(new Cursor(buffer)).copyFrom(
      new Cursor(paddingBuffer)
    )
  }
}

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

function CallFromObject (toConvert) {
  const call = new types.Call()
  call.function(toConvert.function)
  const parameters = []
  toConvert.parameters.forEach((param) => {
    parameters.push(Buffer.from(param, 'base64'))
  })
  call.parameters(parameters)

  return call
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

// Write an object to xdr using a larger buffer specifically used for contract
// related transactions.
function LargeToXDR (xdrObject, type) {
  const cursor = new Cursor(Math.pow(2, 30))
  type.write(xdrObject, cursor)
  const bytesWritten = cursor.tell()
  cursor.rewind()
  return cursor.slice(bytesWritten).buffer()
}

export { TransactionFromObject, ActionFromObject, CallFromObject, BlockLookupRequestFromAttribute, LargeToXDR }
