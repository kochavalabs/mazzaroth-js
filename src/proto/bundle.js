/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const pb = $root.pb = (() => {

    /**
     * Namespace pb.
     * @exports pb
     * @namespace
     */
    const pb = {};

    pb.Error = (function() {

        /**
         * Properties of an Error.
         * @memberof pb
         * @interface IError
         * @property {string|null} [message] Error message
         */

        /**
         * Constructs a new Error.
         * @memberof pb
         * @classdesc Represents an Error.
         * @implements IError
         * @constructor
         * @param {pb.IError=} [properties] Properties to set
         */
        function Error(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Error message.
         * @member {string} message
         * @memberof pb.Error
         * @instance
         */
        Error.prototype.message = "";

        /**
         * Creates a new Error instance using the specified properties.
         * @function create
         * @memberof pb.Error
         * @static
         * @param {pb.IError=} [properties] Properties to set
         * @returns {pb.Error} Error instance
         */
        Error.create = function create(properties) {
            return new Error(properties);
        };

        /**
         * Encodes the specified Error message. Does not implicitly {@link pb.Error.verify|verify} messages.
         * @function encode
         * @memberof pb.Error
         * @static
         * @param {pb.IError} message Error message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Error.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.message != null && message.hasOwnProperty("message"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.message);
            return writer;
        };

        /**
         * Encodes the specified Error message, length delimited. Does not implicitly {@link pb.Error.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Error
         * @static
         * @param {pb.IError} message Error message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Error.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Error message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Error
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Error} Error
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Error.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Error();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Error message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Error
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Error} Error
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Error.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Error message.
         * @function verify
         * @memberof pb.Error
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Error.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            return null;
        };

        /**
         * Creates an Error message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Error
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Error} Error
         */
        Error.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Error)
                return object;
            let message = new $root.pb.Error();
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from an Error message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Error
         * @static
         * @param {pb.Error} message Error
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Error.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.message = "";
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this Error to JSON.
         * @function toJSON
         * @memberof pb.Error
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Error.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Error;
    })();

    pb.BlockRequest = (function() {

        /**
         * Properties of a BlockRequest.
         * @memberof pb
         * @interface IBlockRequest
         * @property {Uint8Array|null} [blockId] BlockRequest blockId
         * @property {number|Long|null} [blockNumber] BlockRequest blockNumber
         */

        /**
         * Constructs a new BlockRequest.
         * @memberof pb
         * @classdesc Represents a BlockRequest.
         * @implements IBlockRequest
         * @constructor
         * @param {pb.IBlockRequest=} [properties] Properties to set
         */
        function BlockRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BlockRequest blockId.
         * @member {Uint8Array} blockId
         * @memberof pb.BlockRequest
         * @instance
         */
        BlockRequest.prototype.blockId = $util.newBuffer([]);

        /**
         * BlockRequest blockNumber.
         * @member {number|Long} blockNumber
         * @memberof pb.BlockRequest
         * @instance
         */
        BlockRequest.prototype.blockNumber = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * BlockRequest blockIdentifier.
         * @member {"blockId"|"blockNumber"|undefined} blockIdentifier
         * @memberof pb.BlockRequest
         * @instance
         */
        Object.defineProperty(BlockRequest.prototype, "blockIdentifier", {
            get: $util.oneOfGetter($oneOfFields = ["blockId", "blockNumber"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new BlockRequest instance using the specified properties.
         * @function create
         * @memberof pb.BlockRequest
         * @static
         * @param {pb.IBlockRequest=} [properties] Properties to set
         * @returns {pb.BlockRequest} BlockRequest instance
         */
        BlockRequest.create = function create(properties) {
            return new BlockRequest(properties);
        };

        /**
         * Encodes the specified BlockRequest message. Does not implicitly {@link pb.BlockRequest.verify|verify} messages.
         * @function encode
         * @memberof pb.BlockRequest
         * @static
         * @param {pb.IBlockRequest} message BlockRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BlockRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.blockId != null && message.hasOwnProperty("blockId"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.blockId);
            if (message.blockNumber != null && message.hasOwnProperty("blockNumber"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.blockNumber);
            return writer;
        };

        /**
         * Encodes the specified BlockRequest message, length delimited. Does not implicitly {@link pb.BlockRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.BlockRequest
         * @static
         * @param {pb.IBlockRequest} message BlockRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BlockRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BlockRequest message from the specified reader or buffer.
         * @function decode
         * @memberof pb.BlockRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.BlockRequest} BlockRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BlockRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.BlockRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.blockId = reader.bytes();
                    break;
                case 2:
                    message.blockNumber = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BlockRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.BlockRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.BlockRequest} BlockRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BlockRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BlockRequest message.
         * @function verify
         * @memberof pb.BlockRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BlockRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.blockId != null && message.hasOwnProperty("blockId")) {
                properties.blockIdentifier = 1;
                if (!(message.blockId && typeof message.blockId.length === "number" || $util.isString(message.blockId)))
                    return "blockId: buffer expected";
            }
            if (message.blockNumber != null && message.hasOwnProperty("blockNumber")) {
                if (properties.blockIdentifier === 1)
                    return "blockIdentifier: multiple values";
                properties.blockIdentifier = 1;
                if (!$util.isInteger(message.blockNumber) && !(message.blockNumber && $util.isInteger(message.blockNumber.low) && $util.isInteger(message.blockNumber.high)))
                    return "blockNumber: integer|Long expected";
            }
            return null;
        };

        /**
         * Creates a BlockRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.BlockRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.BlockRequest} BlockRequest
         */
        BlockRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.BlockRequest)
                return object;
            let message = new $root.pb.BlockRequest();
            if (object.blockId != null)
                if (typeof object.blockId === "string")
                    $util.base64.decode(object.blockId, message.blockId = $util.newBuffer($util.base64.length(object.blockId)), 0);
                else if (object.blockId.length)
                    message.blockId = object.blockId;
            if (object.blockNumber != null)
                if ($util.Long)
                    (message.blockNumber = $util.Long.fromValue(object.blockNumber)).unsigned = true;
                else if (typeof object.blockNumber === "string")
                    message.blockNumber = parseInt(object.blockNumber, 10);
                else if (typeof object.blockNumber === "number")
                    message.blockNumber = object.blockNumber;
                else if (typeof object.blockNumber === "object")
                    message.blockNumber = new $util.LongBits(object.blockNumber.low >>> 0, object.blockNumber.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a BlockRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.BlockRequest
         * @static
         * @param {pb.BlockRequest} message BlockRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BlockRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.blockId != null && message.hasOwnProperty("blockId")) {
                object.blockId = options.bytes === String ? $util.base64.encode(message.blockId, 0, message.blockId.length) : options.bytes === Array ? Array.prototype.slice.call(message.blockId) : message.blockId;
                if (options.oneofs)
                    object.blockIdentifier = "blockId";
            }
            if (message.blockNumber != null && message.hasOwnProperty("blockNumber")) {
                if (typeof message.blockNumber === "number")
                    object.blockNumber = options.longs === String ? String(message.blockNumber) : message.blockNumber;
                else
                    object.blockNumber = options.longs === String ? $util.Long.prototype.toString.call(message.blockNumber) : options.longs === Number ? new $util.LongBits(message.blockNumber.low >>> 0, message.blockNumber.high >>> 0).toNumber(true) : message.blockNumber;
                if (options.oneofs)
                    object.blockIdentifier = "blockNumber";
            }
            return object;
        };

        /**
         * Converts this BlockRequest to JSON.
         * @function toJSON
         * @memberof pb.BlockRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BlockRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BlockRequest;
    })();

    pb.BlockReply = (function() {

        /**
         * Properties of a BlockReply.
         * @memberof pb
         * @interface IBlockReply
         * @property {pb.IBlock|null} [block] BlockReply block
         * @property {pb.IError|null} [error] BlockReply error
         */

        /**
         * Constructs a new BlockReply.
         * @memberof pb
         * @classdesc Represents a BlockReply.
         * @implements IBlockReply
         * @constructor
         * @param {pb.IBlockReply=} [properties] Properties to set
         */
        function BlockReply(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BlockReply block.
         * @member {pb.IBlock|null|undefined} block
         * @memberof pb.BlockReply
         * @instance
         */
        BlockReply.prototype.block = null;

        /**
         * BlockReply error.
         * @member {pb.IError|null|undefined} error
         * @memberof pb.BlockReply
         * @instance
         */
        BlockReply.prototype.error = null;

        /**
         * Creates a new BlockReply instance using the specified properties.
         * @function create
         * @memberof pb.BlockReply
         * @static
         * @param {pb.IBlockReply=} [properties] Properties to set
         * @returns {pb.BlockReply} BlockReply instance
         */
        BlockReply.create = function create(properties) {
            return new BlockReply(properties);
        };

        /**
         * Encodes the specified BlockReply message. Does not implicitly {@link pb.BlockReply.verify|verify} messages.
         * @function encode
         * @memberof pb.BlockReply
         * @static
         * @param {pb.IBlockReply} message BlockReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BlockReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.block != null && message.hasOwnProperty("block"))
                $root.pb.Block.encode(message.block, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.error != null && message.hasOwnProperty("error"))
                $root.pb.Error.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BlockReply message, length delimited. Does not implicitly {@link pb.BlockReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.BlockReply
         * @static
         * @param {pb.IBlockReply} message BlockReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BlockReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BlockReply message from the specified reader or buffer.
         * @function decode
         * @memberof pb.BlockReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.BlockReply} BlockReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BlockReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.BlockReply();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.block = $root.pb.Block.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.error = $root.pb.Error.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BlockReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.BlockReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.BlockReply} BlockReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BlockReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BlockReply message.
         * @function verify
         * @memberof pb.BlockReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BlockReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.block != null && message.hasOwnProperty("block")) {
                let error = $root.pb.Block.verify(message.block);
                if (error)
                    return "block." + error;
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                let error = $root.pb.Error.verify(message.error);
                if (error)
                    return "error." + error;
            }
            return null;
        };

        /**
         * Creates a BlockReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.BlockReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.BlockReply} BlockReply
         */
        BlockReply.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.BlockReply)
                return object;
            let message = new $root.pb.BlockReply();
            if (object.block != null) {
                if (typeof object.block !== "object")
                    throw TypeError(".pb.BlockReply.block: object expected");
                message.block = $root.pb.Block.fromObject(object.block);
            }
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".pb.BlockReply.error: object expected");
                message.error = $root.pb.Error.fromObject(object.error);
            }
            return message;
        };

        /**
         * Creates a plain object from a BlockReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.BlockReply
         * @static
         * @param {pb.BlockReply} message BlockReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BlockReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.block = null;
                object.error = null;
            }
            if (message.block != null && message.hasOwnProperty("block"))
                object.block = $root.pb.Block.toObject(message.block, options);
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = $root.pb.Error.toObject(message.error, options);
            return object;
        };

        /**
         * Converts this BlockReply to JSON.
         * @function toJSON
         * @memberof pb.BlockReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BlockReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BlockReply;
    })();

    pb.BlockHeaderRequest = (function() {

        /**
         * Properties of a BlockHeaderRequest.
         * @memberof pb
         * @interface IBlockHeaderRequest
         * @property {Uint8Array|null} [blockId] BlockHeaderRequest blockId
         * @property {number|Long|null} [blockNumber] BlockHeaderRequest blockNumber
         */

        /**
         * Constructs a new BlockHeaderRequest.
         * @memberof pb
         * @classdesc Represents a BlockHeaderRequest.
         * @implements IBlockHeaderRequest
         * @constructor
         * @param {pb.IBlockHeaderRequest=} [properties] Properties to set
         */
        function BlockHeaderRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BlockHeaderRequest blockId.
         * @member {Uint8Array} blockId
         * @memberof pb.BlockHeaderRequest
         * @instance
         */
        BlockHeaderRequest.prototype.blockId = $util.newBuffer([]);

        /**
         * BlockHeaderRequest blockNumber.
         * @member {number|Long} blockNumber
         * @memberof pb.BlockHeaderRequest
         * @instance
         */
        BlockHeaderRequest.prototype.blockNumber = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * BlockHeaderRequest blockIdentifier.
         * @member {"blockId"|"blockNumber"|undefined} blockIdentifier
         * @memberof pb.BlockHeaderRequest
         * @instance
         */
        Object.defineProperty(BlockHeaderRequest.prototype, "blockIdentifier", {
            get: $util.oneOfGetter($oneOfFields = ["blockId", "blockNumber"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new BlockHeaderRequest instance using the specified properties.
         * @function create
         * @memberof pb.BlockHeaderRequest
         * @static
         * @param {pb.IBlockHeaderRequest=} [properties] Properties to set
         * @returns {pb.BlockHeaderRequest} BlockHeaderRequest instance
         */
        BlockHeaderRequest.create = function create(properties) {
            return new BlockHeaderRequest(properties);
        };

        /**
         * Encodes the specified BlockHeaderRequest message. Does not implicitly {@link pb.BlockHeaderRequest.verify|verify} messages.
         * @function encode
         * @memberof pb.BlockHeaderRequest
         * @static
         * @param {pb.IBlockHeaderRequest} message BlockHeaderRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BlockHeaderRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.blockId != null && message.hasOwnProperty("blockId"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.blockId);
            if (message.blockNumber != null && message.hasOwnProperty("blockNumber"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.blockNumber);
            return writer;
        };

        /**
         * Encodes the specified BlockHeaderRequest message, length delimited. Does not implicitly {@link pb.BlockHeaderRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.BlockHeaderRequest
         * @static
         * @param {pb.IBlockHeaderRequest} message BlockHeaderRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BlockHeaderRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BlockHeaderRequest message from the specified reader or buffer.
         * @function decode
         * @memberof pb.BlockHeaderRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.BlockHeaderRequest} BlockHeaderRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BlockHeaderRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.BlockHeaderRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.blockId = reader.bytes();
                    break;
                case 2:
                    message.blockNumber = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BlockHeaderRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.BlockHeaderRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.BlockHeaderRequest} BlockHeaderRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BlockHeaderRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BlockHeaderRequest message.
         * @function verify
         * @memberof pb.BlockHeaderRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BlockHeaderRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.blockId != null && message.hasOwnProperty("blockId")) {
                properties.blockIdentifier = 1;
                if (!(message.blockId && typeof message.blockId.length === "number" || $util.isString(message.blockId)))
                    return "blockId: buffer expected";
            }
            if (message.blockNumber != null && message.hasOwnProperty("blockNumber")) {
                if (properties.blockIdentifier === 1)
                    return "blockIdentifier: multiple values";
                properties.blockIdentifier = 1;
                if (!$util.isInteger(message.blockNumber) && !(message.blockNumber && $util.isInteger(message.blockNumber.low) && $util.isInteger(message.blockNumber.high)))
                    return "blockNumber: integer|Long expected";
            }
            return null;
        };

        /**
         * Creates a BlockHeaderRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.BlockHeaderRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.BlockHeaderRequest} BlockHeaderRequest
         */
        BlockHeaderRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.BlockHeaderRequest)
                return object;
            let message = new $root.pb.BlockHeaderRequest();
            if (object.blockId != null)
                if (typeof object.blockId === "string")
                    $util.base64.decode(object.blockId, message.blockId = $util.newBuffer($util.base64.length(object.blockId)), 0);
                else if (object.blockId.length)
                    message.blockId = object.blockId;
            if (object.blockNumber != null)
                if ($util.Long)
                    (message.blockNumber = $util.Long.fromValue(object.blockNumber)).unsigned = true;
                else if (typeof object.blockNumber === "string")
                    message.blockNumber = parseInt(object.blockNumber, 10);
                else if (typeof object.blockNumber === "number")
                    message.blockNumber = object.blockNumber;
                else if (typeof object.blockNumber === "object")
                    message.blockNumber = new $util.LongBits(object.blockNumber.low >>> 0, object.blockNumber.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a BlockHeaderRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.BlockHeaderRequest
         * @static
         * @param {pb.BlockHeaderRequest} message BlockHeaderRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BlockHeaderRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.blockId != null && message.hasOwnProperty("blockId")) {
                object.blockId = options.bytes === String ? $util.base64.encode(message.blockId, 0, message.blockId.length) : options.bytes === Array ? Array.prototype.slice.call(message.blockId) : message.blockId;
                if (options.oneofs)
                    object.blockIdentifier = "blockId";
            }
            if (message.blockNumber != null && message.hasOwnProperty("blockNumber")) {
                if (typeof message.blockNumber === "number")
                    object.blockNumber = options.longs === String ? String(message.blockNumber) : message.blockNumber;
                else
                    object.blockNumber = options.longs === String ? $util.Long.prototype.toString.call(message.blockNumber) : options.longs === Number ? new $util.LongBits(message.blockNumber.low >>> 0, message.blockNumber.high >>> 0).toNumber(true) : message.blockNumber;
                if (options.oneofs)
                    object.blockIdentifier = "blockNumber";
            }
            return object;
        };

        /**
         * Converts this BlockHeaderRequest to JSON.
         * @function toJSON
         * @memberof pb.BlockHeaderRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BlockHeaderRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BlockHeaderRequest;
    })();

    pb.BlockHeaderReply = (function() {

        /**
         * Properties of a BlockHeaderReply.
         * @memberof pb
         * @interface IBlockHeaderReply
         * @property {pb.IBlockHeader|null} [blockHeader] BlockHeaderReply blockHeader
         * @property {pb.IError|null} [error] BlockHeaderReply error
         */

        /**
         * Constructs a new BlockHeaderReply.
         * @memberof pb
         * @classdesc Represents a BlockHeaderReply.
         * @implements IBlockHeaderReply
         * @constructor
         * @param {pb.IBlockHeaderReply=} [properties] Properties to set
         */
        function BlockHeaderReply(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BlockHeaderReply blockHeader.
         * @member {pb.IBlockHeader|null|undefined} blockHeader
         * @memberof pb.BlockHeaderReply
         * @instance
         */
        BlockHeaderReply.prototype.blockHeader = null;

        /**
         * BlockHeaderReply error.
         * @member {pb.IError|null|undefined} error
         * @memberof pb.BlockHeaderReply
         * @instance
         */
        BlockHeaderReply.prototype.error = null;

        /**
         * Creates a new BlockHeaderReply instance using the specified properties.
         * @function create
         * @memberof pb.BlockHeaderReply
         * @static
         * @param {pb.IBlockHeaderReply=} [properties] Properties to set
         * @returns {pb.BlockHeaderReply} BlockHeaderReply instance
         */
        BlockHeaderReply.create = function create(properties) {
            return new BlockHeaderReply(properties);
        };

        /**
         * Encodes the specified BlockHeaderReply message. Does not implicitly {@link pb.BlockHeaderReply.verify|verify} messages.
         * @function encode
         * @memberof pb.BlockHeaderReply
         * @static
         * @param {pb.IBlockHeaderReply} message BlockHeaderReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BlockHeaderReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.blockHeader != null && message.hasOwnProperty("blockHeader"))
                $root.pb.BlockHeader.encode(message.blockHeader, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.error != null && message.hasOwnProperty("error"))
                $root.pb.Error.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BlockHeaderReply message, length delimited. Does not implicitly {@link pb.BlockHeaderReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.BlockHeaderReply
         * @static
         * @param {pb.IBlockHeaderReply} message BlockHeaderReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BlockHeaderReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BlockHeaderReply message from the specified reader or buffer.
         * @function decode
         * @memberof pb.BlockHeaderReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.BlockHeaderReply} BlockHeaderReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BlockHeaderReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.BlockHeaderReply();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.blockHeader = $root.pb.BlockHeader.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.error = $root.pb.Error.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BlockHeaderReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.BlockHeaderReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.BlockHeaderReply} BlockHeaderReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BlockHeaderReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BlockHeaderReply message.
         * @function verify
         * @memberof pb.BlockHeaderReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BlockHeaderReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.blockHeader != null && message.hasOwnProperty("blockHeader")) {
                let error = $root.pb.BlockHeader.verify(message.blockHeader);
                if (error)
                    return "blockHeader." + error;
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                let error = $root.pb.Error.verify(message.error);
                if (error)
                    return "error." + error;
            }
            return null;
        };

        /**
         * Creates a BlockHeaderReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.BlockHeaderReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.BlockHeaderReply} BlockHeaderReply
         */
        BlockHeaderReply.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.BlockHeaderReply)
                return object;
            let message = new $root.pb.BlockHeaderReply();
            if (object.blockHeader != null) {
                if (typeof object.blockHeader !== "object")
                    throw TypeError(".pb.BlockHeaderReply.blockHeader: object expected");
                message.blockHeader = $root.pb.BlockHeader.fromObject(object.blockHeader);
            }
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".pb.BlockHeaderReply.error: object expected");
                message.error = $root.pb.Error.fromObject(object.error);
            }
            return message;
        };

        /**
         * Creates a plain object from a BlockHeaderReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.BlockHeaderReply
         * @static
         * @param {pb.BlockHeaderReply} message BlockHeaderReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BlockHeaderReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.blockHeader = null;
                object.error = null;
            }
            if (message.blockHeader != null && message.hasOwnProperty("blockHeader"))
                object.blockHeader = $root.pb.BlockHeader.toObject(message.blockHeader, options);
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = $root.pb.Error.toObject(message.error, options);
            return object;
        };

        /**
         * Converts this BlockHeaderReply to JSON.
         * @function toJSON
         * @memberof pb.BlockHeaderReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BlockHeaderReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BlockHeaderReply;
    })();

    pb.TransactionLookupRequest = (function() {

        /**
         * Properties of a TransactionLookupRequest.
         * @memberof pb
         * @interface ITransactionLookupRequest
         * @property {number|Long|null} [id] TransactionLookupRequest id
         */

        /**
         * Constructs a new TransactionLookupRequest.
         * @memberof pb
         * @classdesc Represents a TransactionLookupRequest.
         * @implements ITransactionLookupRequest
         * @constructor
         * @param {pb.ITransactionLookupRequest=} [properties] Properties to set
         */
        function TransactionLookupRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TransactionLookupRequest id.
         * @member {number|Long} id
         * @memberof pb.TransactionLookupRequest
         * @instance
         */
        TransactionLookupRequest.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new TransactionLookupRequest instance using the specified properties.
         * @function create
         * @memberof pb.TransactionLookupRequest
         * @static
         * @param {pb.ITransactionLookupRequest=} [properties] Properties to set
         * @returns {pb.TransactionLookupRequest} TransactionLookupRequest instance
         */
        TransactionLookupRequest.create = function create(properties) {
            return new TransactionLookupRequest(properties);
        };

        /**
         * Encodes the specified TransactionLookupRequest message. Does not implicitly {@link pb.TransactionLookupRequest.verify|verify} messages.
         * @function encode
         * @memberof pb.TransactionLookupRequest
         * @static
         * @param {pb.ITransactionLookupRequest} message TransactionLookupRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TransactionLookupRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.id);
            return writer;
        };

        /**
         * Encodes the specified TransactionLookupRequest message, length delimited. Does not implicitly {@link pb.TransactionLookupRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.TransactionLookupRequest
         * @static
         * @param {pb.ITransactionLookupRequest} message TransactionLookupRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TransactionLookupRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TransactionLookupRequest message from the specified reader or buffer.
         * @function decode
         * @memberof pb.TransactionLookupRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.TransactionLookupRequest} TransactionLookupRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TransactionLookupRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.TransactionLookupRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TransactionLookupRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.TransactionLookupRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.TransactionLookupRequest} TransactionLookupRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TransactionLookupRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TransactionLookupRequest message.
         * @function verify
         * @memberof pb.TransactionLookupRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TransactionLookupRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            return null;
        };

        /**
         * Creates a TransactionLookupRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.TransactionLookupRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.TransactionLookupRequest} TransactionLookupRequest
         */
        TransactionLookupRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.TransactionLookupRequest)
                return object;
            let message = new $root.pb.TransactionLookupRequest();
            if (object.id != null)
                if ($util.Long)
                    (message.id = $util.Long.fromValue(object.id)).unsigned = true;
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a TransactionLookupRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.TransactionLookupRequest
         * @static
         * @param {pb.TransactionLookupRequest} message TransactionLookupRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TransactionLookupRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.id = options.longs === String ? "0" : 0;
            if (message.id != null && message.hasOwnProperty("id"))
                if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
            return object;
        };

        /**
         * Converts this TransactionLookupRequest to JSON.
         * @function toJSON
         * @memberof pb.TransactionLookupRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TransactionLookupRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TransactionLookupRequest;
    })();

    pb.TransactionLookupResponse = (function() {

        /**
         * Properties of a TransactionLookupResponse.
         * @memberof pb
         * @interface ITransactionLookupResponse
         * @property {pb.IAcceptedTransaction|null} [transaction] TransactionLookupResponse transaction
         * @property {pb.TransactionStatus|null} [status] TransactionLookupResponse status
         * @property {string|null} [statusInfo] TransactionLookupResponse statusInfo
         * @property {Uint8Array|null} [result] TransactionLookupResponse result
         */

        /**
         * Constructs a new TransactionLookupResponse.
         * @memberof pb
         * @classdesc Represents a TransactionLookupResponse.
         * @implements ITransactionLookupResponse
         * @constructor
         * @param {pb.ITransactionLookupResponse=} [properties] Properties to set
         */
        function TransactionLookupResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TransactionLookupResponse transaction.
         * @member {pb.IAcceptedTransaction|null|undefined} transaction
         * @memberof pb.TransactionLookupResponse
         * @instance
         */
        TransactionLookupResponse.prototype.transaction = null;

        /**
         * TransactionLookupResponse status.
         * @member {pb.TransactionStatus} status
         * @memberof pb.TransactionLookupResponse
         * @instance
         */
        TransactionLookupResponse.prototype.status = 0;

        /**
         * TransactionLookupResponse statusInfo.
         * @member {string} statusInfo
         * @memberof pb.TransactionLookupResponse
         * @instance
         */
        TransactionLookupResponse.prototype.statusInfo = "";

        /**
         * TransactionLookupResponse result.
         * @member {Uint8Array} result
         * @memberof pb.TransactionLookupResponse
         * @instance
         */
        TransactionLookupResponse.prototype.result = $util.newBuffer([]);

        /**
         * Creates a new TransactionLookupResponse instance using the specified properties.
         * @function create
         * @memberof pb.TransactionLookupResponse
         * @static
         * @param {pb.ITransactionLookupResponse=} [properties] Properties to set
         * @returns {pb.TransactionLookupResponse} TransactionLookupResponse instance
         */
        TransactionLookupResponse.create = function create(properties) {
            return new TransactionLookupResponse(properties);
        };

        /**
         * Encodes the specified TransactionLookupResponse message. Does not implicitly {@link pb.TransactionLookupResponse.verify|verify} messages.
         * @function encode
         * @memberof pb.TransactionLookupResponse
         * @static
         * @param {pb.ITransactionLookupResponse} message TransactionLookupResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TransactionLookupResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.transaction != null && message.hasOwnProperty("transaction"))
                $root.pb.AcceptedTransaction.encode(message.transaction, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.status != null && message.hasOwnProperty("status"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
            if (message.statusInfo != null && message.hasOwnProperty("statusInfo"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.statusInfo);
            if (message.result != null && message.hasOwnProperty("result"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.result);
            return writer;
        };

        /**
         * Encodes the specified TransactionLookupResponse message, length delimited. Does not implicitly {@link pb.TransactionLookupResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.TransactionLookupResponse
         * @static
         * @param {pb.ITransactionLookupResponse} message TransactionLookupResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TransactionLookupResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TransactionLookupResponse message from the specified reader or buffer.
         * @function decode
         * @memberof pb.TransactionLookupResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.TransactionLookupResponse} TransactionLookupResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TransactionLookupResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.TransactionLookupResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.transaction = $root.pb.AcceptedTransaction.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.status = reader.int32();
                    break;
                case 3:
                    message.statusInfo = reader.string();
                    break;
                case 4:
                    message.result = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TransactionLookupResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.TransactionLookupResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.TransactionLookupResponse} TransactionLookupResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TransactionLookupResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TransactionLookupResponse message.
         * @function verify
         * @memberof pb.TransactionLookupResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TransactionLookupResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.transaction != null && message.hasOwnProperty("transaction")) {
                let error = $root.pb.AcceptedTransaction.verify(message.transaction);
                if (error)
                    return "transaction." + error;
            }
            if (message.status != null && message.hasOwnProperty("status"))
                switch (message.status) {
                default:
                    return "status: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.statusInfo != null && message.hasOwnProperty("statusInfo"))
                if (!$util.isString(message.statusInfo))
                    return "statusInfo: string expected";
            if (message.result != null && message.hasOwnProperty("result"))
                if (!(message.result && typeof message.result.length === "number" || $util.isString(message.result)))
                    return "result: buffer expected";
            return null;
        };

        /**
         * Creates a TransactionLookupResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.TransactionLookupResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.TransactionLookupResponse} TransactionLookupResponse
         */
        TransactionLookupResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.TransactionLookupResponse)
                return object;
            let message = new $root.pb.TransactionLookupResponse();
            if (object.transaction != null) {
                if (typeof object.transaction !== "object")
                    throw TypeError(".pb.TransactionLookupResponse.transaction: object expected");
                message.transaction = $root.pb.AcceptedTransaction.fromObject(object.transaction);
            }
            switch (object.status) {
            case "TX_UNKNOWN":
            case 0:
                message.status = 0;
                break;
            case "TX_ACCEPTED":
            case 1:
                message.status = 1;
                break;
            case "TX_REJECTED":
            case 2:
                message.status = 2;
                break;
            case "TX_CONFIRMED":
            case 3:
                message.status = 3;
                break;
            case "TX_NOT_FOUND":
            case 4:
                message.status = 4;
                break;
            }
            if (object.statusInfo != null)
                message.statusInfo = String(object.statusInfo);
            if (object.result != null)
                if (typeof object.result === "string")
                    $util.base64.decode(object.result, message.result = $util.newBuffer($util.base64.length(object.result)), 0);
                else if (object.result.length)
                    message.result = object.result;
            return message;
        };

        /**
         * Creates a plain object from a TransactionLookupResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.TransactionLookupResponse
         * @static
         * @param {pb.TransactionLookupResponse} message TransactionLookupResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TransactionLookupResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.transaction = null;
                object.status = options.enums === String ? "TX_UNKNOWN" : 0;
                object.statusInfo = "";
                if (options.bytes === String)
                    object.result = "";
                else {
                    object.result = [];
                    if (options.bytes !== Array)
                        object.result = $util.newBuffer(object.result);
                }
            }
            if (message.transaction != null && message.hasOwnProperty("transaction"))
                object.transaction = $root.pb.AcceptedTransaction.toObject(message.transaction, options);
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.pb.TransactionStatus[message.status] : message.status;
            if (message.statusInfo != null && message.hasOwnProperty("statusInfo"))
                object.statusInfo = message.statusInfo;
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.bytes === String ? $util.base64.encode(message.result, 0, message.result.length) : options.bytes === Array ? Array.prototype.slice.call(message.result) : message.result;
            return object;
        };

        /**
         * Converts this TransactionLookupResponse to JSON.
         * @function toJSON
         * @memberof pb.TransactionLookupResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TransactionLookupResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TransactionLookupResponse;
    })();

    pb.TransactionSubmitRequest = (function() {

        /**
         * Properties of a TransactionSubmitRequest.
         * @memberof pb
         * @interface ITransactionSubmitRequest
         * @property {pb.ISignedTransaction|null} [transaction] TransactionSubmitRequest transaction
         */

        /**
         * Constructs a new TransactionSubmitRequest.
         * @memberof pb
         * @classdesc Represents a TransactionSubmitRequest.
         * @implements ITransactionSubmitRequest
         * @constructor
         * @param {pb.ITransactionSubmitRequest=} [properties] Properties to set
         */
        function TransactionSubmitRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TransactionSubmitRequest transaction.
         * @member {pb.ISignedTransaction|null|undefined} transaction
         * @memberof pb.TransactionSubmitRequest
         * @instance
         */
        TransactionSubmitRequest.prototype.transaction = null;

        /**
         * Creates a new TransactionSubmitRequest instance using the specified properties.
         * @function create
         * @memberof pb.TransactionSubmitRequest
         * @static
         * @param {pb.ITransactionSubmitRequest=} [properties] Properties to set
         * @returns {pb.TransactionSubmitRequest} TransactionSubmitRequest instance
         */
        TransactionSubmitRequest.create = function create(properties) {
            return new TransactionSubmitRequest(properties);
        };

        /**
         * Encodes the specified TransactionSubmitRequest message. Does not implicitly {@link pb.TransactionSubmitRequest.verify|verify} messages.
         * @function encode
         * @memberof pb.TransactionSubmitRequest
         * @static
         * @param {pb.ITransactionSubmitRequest} message TransactionSubmitRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TransactionSubmitRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.transaction != null && message.hasOwnProperty("transaction"))
                $root.pb.SignedTransaction.encode(message.transaction, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TransactionSubmitRequest message, length delimited. Does not implicitly {@link pb.TransactionSubmitRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.TransactionSubmitRequest
         * @static
         * @param {pb.ITransactionSubmitRequest} message TransactionSubmitRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TransactionSubmitRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TransactionSubmitRequest message from the specified reader or buffer.
         * @function decode
         * @memberof pb.TransactionSubmitRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.TransactionSubmitRequest} TransactionSubmitRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TransactionSubmitRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.TransactionSubmitRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.transaction = $root.pb.SignedTransaction.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TransactionSubmitRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.TransactionSubmitRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.TransactionSubmitRequest} TransactionSubmitRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TransactionSubmitRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TransactionSubmitRequest message.
         * @function verify
         * @memberof pb.TransactionSubmitRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TransactionSubmitRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.transaction != null && message.hasOwnProperty("transaction")) {
                let error = $root.pb.SignedTransaction.verify(message.transaction);
                if (error)
                    return "transaction." + error;
            }
            return null;
        };

        /**
         * Creates a TransactionSubmitRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.TransactionSubmitRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.TransactionSubmitRequest} TransactionSubmitRequest
         */
        TransactionSubmitRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.TransactionSubmitRequest)
                return object;
            let message = new $root.pb.TransactionSubmitRequest();
            if (object.transaction != null) {
                if (typeof object.transaction !== "object")
                    throw TypeError(".pb.TransactionSubmitRequest.transaction: object expected");
                message.transaction = $root.pb.SignedTransaction.fromObject(object.transaction);
            }
            return message;
        };

        /**
         * Creates a plain object from a TransactionSubmitRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.TransactionSubmitRequest
         * @static
         * @param {pb.TransactionSubmitRequest} message TransactionSubmitRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TransactionSubmitRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.transaction = null;
            if (message.transaction != null && message.hasOwnProperty("transaction"))
                object.transaction = $root.pb.SignedTransaction.toObject(message.transaction, options);
            return object;
        };

        /**
         * Converts this TransactionSubmitRequest to JSON.
         * @function toJSON
         * @memberof pb.TransactionSubmitRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TransactionSubmitRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TransactionSubmitRequest;
    })();

    pb.TransactionSubmitResponse = (function() {

        /**
         * Properties of a TransactionSubmitResponse.
         * @memberof pb
         * @interface ITransactionSubmitResponse
         * @property {pb.IAcceptedTransaction|null} [transaction] TransactionSubmitResponse transaction
         * @property {pb.TransactionStatus|null} [status] TransactionSubmitResponse status
         * @property {string|null} [statusInfo] TransactionSubmitResponse statusInfo
         * @property {Uint8Array|null} [result] TransactionSubmitResponse result
         */

        /**
         * Constructs a new TransactionSubmitResponse.
         * @memberof pb
         * @classdesc Represents a TransactionSubmitResponse.
         * @implements ITransactionSubmitResponse
         * @constructor
         * @param {pb.ITransactionSubmitResponse=} [properties] Properties to set
         */
        function TransactionSubmitResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TransactionSubmitResponse transaction.
         * @member {pb.IAcceptedTransaction|null|undefined} transaction
         * @memberof pb.TransactionSubmitResponse
         * @instance
         */
        TransactionSubmitResponse.prototype.transaction = null;

        /**
         * TransactionSubmitResponse status.
         * @member {pb.TransactionStatus} status
         * @memberof pb.TransactionSubmitResponse
         * @instance
         */
        TransactionSubmitResponse.prototype.status = 0;

        /**
         * TransactionSubmitResponse statusInfo.
         * @member {string} statusInfo
         * @memberof pb.TransactionSubmitResponse
         * @instance
         */
        TransactionSubmitResponse.prototype.statusInfo = "";

        /**
         * TransactionSubmitResponse result.
         * @member {Uint8Array} result
         * @memberof pb.TransactionSubmitResponse
         * @instance
         */
        TransactionSubmitResponse.prototype.result = $util.newBuffer([]);

        /**
         * Creates a new TransactionSubmitResponse instance using the specified properties.
         * @function create
         * @memberof pb.TransactionSubmitResponse
         * @static
         * @param {pb.ITransactionSubmitResponse=} [properties] Properties to set
         * @returns {pb.TransactionSubmitResponse} TransactionSubmitResponse instance
         */
        TransactionSubmitResponse.create = function create(properties) {
            return new TransactionSubmitResponse(properties);
        };

        /**
         * Encodes the specified TransactionSubmitResponse message. Does not implicitly {@link pb.TransactionSubmitResponse.verify|verify} messages.
         * @function encode
         * @memberof pb.TransactionSubmitResponse
         * @static
         * @param {pb.ITransactionSubmitResponse} message TransactionSubmitResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TransactionSubmitResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.transaction != null && message.hasOwnProperty("transaction"))
                $root.pb.AcceptedTransaction.encode(message.transaction, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.status != null && message.hasOwnProperty("status"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
            if (message.statusInfo != null && message.hasOwnProperty("statusInfo"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.statusInfo);
            if (message.result != null && message.hasOwnProperty("result"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.result);
            return writer;
        };

        /**
         * Encodes the specified TransactionSubmitResponse message, length delimited. Does not implicitly {@link pb.TransactionSubmitResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.TransactionSubmitResponse
         * @static
         * @param {pb.ITransactionSubmitResponse} message TransactionSubmitResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TransactionSubmitResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TransactionSubmitResponse message from the specified reader or buffer.
         * @function decode
         * @memberof pb.TransactionSubmitResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.TransactionSubmitResponse} TransactionSubmitResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TransactionSubmitResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.TransactionSubmitResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.transaction = $root.pb.AcceptedTransaction.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.status = reader.int32();
                    break;
                case 3:
                    message.statusInfo = reader.string();
                    break;
                case 4:
                    message.result = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TransactionSubmitResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.TransactionSubmitResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.TransactionSubmitResponse} TransactionSubmitResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TransactionSubmitResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TransactionSubmitResponse message.
         * @function verify
         * @memberof pb.TransactionSubmitResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TransactionSubmitResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.transaction != null && message.hasOwnProperty("transaction")) {
                let error = $root.pb.AcceptedTransaction.verify(message.transaction);
                if (error)
                    return "transaction." + error;
            }
            if (message.status != null && message.hasOwnProperty("status"))
                switch (message.status) {
                default:
                    return "status: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.statusInfo != null && message.hasOwnProperty("statusInfo"))
                if (!$util.isString(message.statusInfo))
                    return "statusInfo: string expected";
            if (message.result != null && message.hasOwnProperty("result"))
                if (!(message.result && typeof message.result.length === "number" || $util.isString(message.result)))
                    return "result: buffer expected";
            return null;
        };

        /**
         * Creates a TransactionSubmitResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.TransactionSubmitResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.TransactionSubmitResponse} TransactionSubmitResponse
         */
        TransactionSubmitResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.TransactionSubmitResponse)
                return object;
            let message = new $root.pb.TransactionSubmitResponse();
            if (object.transaction != null) {
                if (typeof object.transaction !== "object")
                    throw TypeError(".pb.TransactionSubmitResponse.transaction: object expected");
                message.transaction = $root.pb.AcceptedTransaction.fromObject(object.transaction);
            }
            switch (object.status) {
            case "TX_UNKNOWN":
            case 0:
                message.status = 0;
                break;
            case "TX_ACCEPTED":
            case 1:
                message.status = 1;
                break;
            case "TX_REJECTED":
            case 2:
                message.status = 2;
                break;
            case "TX_CONFIRMED":
            case 3:
                message.status = 3;
                break;
            case "TX_NOT_FOUND":
            case 4:
                message.status = 4;
                break;
            }
            if (object.statusInfo != null)
                message.statusInfo = String(object.statusInfo);
            if (object.result != null)
                if (typeof object.result === "string")
                    $util.base64.decode(object.result, message.result = $util.newBuffer($util.base64.length(object.result)), 0);
                else if (object.result.length)
                    message.result = object.result;
            return message;
        };

        /**
         * Creates a plain object from a TransactionSubmitResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.TransactionSubmitResponse
         * @static
         * @param {pb.TransactionSubmitResponse} message TransactionSubmitResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TransactionSubmitResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.transaction = null;
                object.status = options.enums === String ? "TX_UNKNOWN" : 0;
                object.statusInfo = "";
                if (options.bytes === String)
                    object.result = "";
                else {
                    object.result = [];
                    if (options.bytes !== Array)
                        object.result = $util.newBuffer(object.result);
                }
            }
            if (message.transaction != null && message.hasOwnProperty("transaction"))
                object.transaction = $root.pb.AcceptedTransaction.toObject(message.transaction, options);
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.pb.TransactionStatus[message.status] : message.status;
            if (message.statusInfo != null && message.hasOwnProperty("statusInfo"))
                object.statusInfo = message.statusInfo;
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.bytes === String ? $util.base64.encode(message.result, 0, message.result.length) : options.bytes === Array ? Array.prototype.slice.call(message.result) : message.result;
            return object;
        };

        /**
         * Converts this TransactionSubmitResponse to JSON.
         * @function toJSON
         * @memberof pb.TransactionSubmitResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TransactionSubmitResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TransactionSubmitResponse;
    })();

    pb.ContractDeployRequest = (function() {

        /**
         * Properties of a ContractDeployRequest.
         * @memberof pb
         * @interface IContractDeployRequest
         * @property {pb.ISignedContract|null} [contract] ContractDeployRequest contract
         */

        /**
         * Constructs a new ContractDeployRequest.
         * @memberof pb
         * @classdesc Represents a ContractDeployRequest.
         * @implements IContractDeployRequest
         * @constructor
         * @param {pb.IContractDeployRequest=} [properties] Properties to set
         */
        function ContractDeployRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ContractDeployRequest contract.
         * @member {pb.ISignedContract|null|undefined} contract
         * @memberof pb.ContractDeployRequest
         * @instance
         */
        ContractDeployRequest.prototype.contract = null;

        /**
         * Creates a new ContractDeployRequest instance using the specified properties.
         * @function create
         * @memberof pb.ContractDeployRequest
         * @static
         * @param {pb.IContractDeployRequest=} [properties] Properties to set
         * @returns {pb.ContractDeployRequest} ContractDeployRequest instance
         */
        ContractDeployRequest.create = function create(properties) {
            return new ContractDeployRequest(properties);
        };

        /**
         * Encodes the specified ContractDeployRequest message. Does not implicitly {@link pb.ContractDeployRequest.verify|verify} messages.
         * @function encode
         * @memberof pb.ContractDeployRequest
         * @static
         * @param {pb.IContractDeployRequest} message ContractDeployRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ContractDeployRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.contract != null && message.hasOwnProperty("contract"))
                $root.pb.SignedContract.encode(message.contract, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ContractDeployRequest message, length delimited. Does not implicitly {@link pb.ContractDeployRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.ContractDeployRequest
         * @static
         * @param {pb.IContractDeployRequest} message ContractDeployRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ContractDeployRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ContractDeployRequest message from the specified reader or buffer.
         * @function decode
         * @memberof pb.ContractDeployRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.ContractDeployRequest} ContractDeployRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ContractDeployRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.ContractDeployRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.contract = $root.pb.SignedContract.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ContractDeployRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.ContractDeployRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.ContractDeployRequest} ContractDeployRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ContractDeployRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ContractDeployRequest message.
         * @function verify
         * @memberof pb.ContractDeployRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ContractDeployRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.contract != null && message.hasOwnProperty("contract")) {
                let error = $root.pb.SignedContract.verify(message.contract);
                if (error)
                    return "contract." + error;
            }
            return null;
        };

        /**
         * Creates a ContractDeployRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.ContractDeployRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.ContractDeployRequest} ContractDeployRequest
         */
        ContractDeployRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.ContractDeployRequest)
                return object;
            let message = new $root.pb.ContractDeployRequest();
            if (object.contract != null) {
                if (typeof object.contract !== "object")
                    throw TypeError(".pb.ContractDeployRequest.contract: object expected");
                message.contract = $root.pb.SignedContract.fromObject(object.contract);
            }
            return message;
        };

        /**
         * Creates a plain object from a ContractDeployRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.ContractDeployRequest
         * @static
         * @param {pb.ContractDeployRequest} message ContractDeployRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ContractDeployRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.contract = null;
            if (message.contract != null && message.hasOwnProperty("contract"))
                object.contract = $root.pb.SignedContract.toObject(message.contract, options);
            return object;
        };

        /**
         * Converts this ContractDeployRequest to JSON.
         * @function toJSON
         * @memberof pb.ContractDeployRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ContractDeployRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ContractDeployRequest;
    })();

    pb.ContractDeployResponse = (function() {

        /**
         * Properties of a ContractDeployResponse.
         * @memberof pb
         * @interface IContractDeployResponse
         * @property {pb.IAcceptedContract|null} [contract] ContractDeployResponse contract
         * @property {pb.ContractStatus|null} [status] ContractDeployResponse status
         * @property {string|null} [statusInfo] ContractDeployResponse statusInfo
         */

        /**
         * Constructs a new ContractDeployResponse.
         * @memberof pb
         * @classdesc Represents a ContractDeployResponse.
         * @implements IContractDeployResponse
         * @constructor
         * @param {pb.IContractDeployResponse=} [properties] Properties to set
         */
        function ContractDeployResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ContractDeployResponse contract.
         * @member {pb.IAcceptedContract|null|undefined} contract
         * @memberof pb.ContractDeployResponse
         * @instance
         */
        ContractDeployResponse.prototype.contract = null;

        /**
         * ContractDeployResponse status.
         * @member {pb.ContractStatus} status
         * @memberof pb.ContractDeployResponse
         * @instance
         */
        ContractDeployResponse.prototype.status = 0;

        /**
         * ContractDeployResponse statusInfo.
         * @member {string} statusInfo
         * @memberof pb.ContractDeployResponse
         * @instance
         */
        ContractDeployResponse.prototype.statusInfo = "";

        /**
         * Creates a new ContractDeployResponse instance using the specified properties.
         * @function create
         * @memberof pb.ContractDeployResponse
         * @static
         * @param {pb.IContractDeployResponse=} [properties] Properties to set
         * @returns {pb.ContractDeployResponse} ContractDeployResponse instance
         */
        ContractDeployResponse.create = function create(properties) {
            return new ContractDeployResponse(properties);
        };

        /**
         * Encodes the specified ContractDeployResponse message. Does not implicitly {@link pb.ContractDeployResponse.verify|verify} messages.
         * @function encode
         * @memberof pb.ContractDeployResponse
         * @static
         * @param {pb.IContractDeployResponse} message ContractDeployResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ContractDeployResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.contract != null && message.hasOwnProperty("contract"))
                $root.pb.AcceptedContract.encode(message.contract, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.status != null && message.hasOwnProperty("status"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
            if (message.statusInfo != null && message.hasOwnProperty("statusInfo"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.statusInfo);
            return writer;
        };

        /**
         * Encodes the specified ContractDeployResponse message, length delimited. Does not implicitly {@link pb.ContractDeployResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.ContractDeployResponse
         * @static
         * @param {pb.IContractDeployResponse} message ContractDeployResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ContractDeployResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ContractDeployResponse message from the specified reader or buffer.
         * @function decode
         * @memberof pb.ContractDeployResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.ContractDeployResponse} ContractDeployResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ContractDeployResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.ContractDeployResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.contract = $root.pb.AcceptedContract.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.status = reader.int32();
                    break;
                case 3:
                    message.statusInfo = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ContractDeployResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.ContractDeployResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.ContractDeployResponse} ContractDeployResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ContractDeployResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ContractDeployResponse message.
         * @function verify
         * @memberof pb.ContractDeployResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ContractDeployResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.contract != null && message.hasOwnProperty("contract")) {
                let error = $root.pb.AcceptedContract.verify(message.contract);
                if (error)
                    return "contract." + error;
            }
            if (message.status != null && message.hasOwnProperty("status"))
                switch (message.status) {
                default:
                    return "status: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    break;
                }
            if (message.statusInfo != null && message.hasOwnProperty("statusInfo"))
                if (!$util.isString(message.statusInfo))
                    return "statusInfo: string expected";
            return null;
        };

        /**
         * Creates a ContractDeployResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.ContractDeployResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.ContractDeployResponse} ContractDeployResponse
         */
        ContractDeployResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.ContractDeployResponse)
                return object;
            let message = new $root.pb.ContractDeployResponse();
            if (object.contract != null) {
                if (typeof object.contract !== "object")
                    throw TypeError(".pb.ContractDeployResponse.contract: object expected");
                message.contract = $root.pb.AcceptedContract.fromObject(object.contract);
            }
            switch (object.status) {
            case "CT_UNKNOWN":
            case 0:
                message.status = 0;
                break;
            case "CT_ACCEPTED":
            case 1:
                message.status = 1;
                break;
            case "CT_REJECTED":
            case 2:
                message.status = 2;
                break;
            case "CT_ACTIVE":
            case 3:
                message.status = 3;
                break;
            case "CT_PAUSED":
            case 4:
                message.status = 4;
                break;
            case "CT_DEACTIVATED":
            case 5:
                message.status = 5;
                break;
            case "CT_NOT_FOUND":
            case 6:
                message.status = 6;
                break;
            }
            if (object.statusInfo != null)
                message.statusInfo = String(object.statusInfo);
            return message;
        };

        /**
         * Creates a plain object from a ContractDeployResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.ContractDeployResponse
         * @static
         * @param {pb.ContractDeployResponse} message ContractDeployResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ContractDeployResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.contract = null;
                object.status = options.enums === String ? "CT_UNKNOWN" : 0;
                object.statusInfo = "";
            }
            if (message.contract != null && message.hasOwnProperty("contract"))
                object.contract = $root.pb.AcceptedContract.toObject(message.contract, options);
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.pb.ContractStatus[message.status] : message.status;
            if (message.statusInfo != null && message.hasOwnProperty("statusInfo"))
                object.statusInfo = message.statusInfo;
            return object;
        };

        /**
         * Converts this ContractDeployResponse to JSON.
         * @function toJSON
         * @memberof pb.ContractDeployResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ContractDeployResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ContractDeployResponse;
    })();

    pb.MazzarothRPC = (function() {

        /**
         * Constructs a new MazzarothRPC service.
         * @memberof pb
         * @classdesc Represents a MazzarothRPC
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function MazzarothRPC(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (MazzarothRPC.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = MazzarothRPC;

        /**
         * Creates new MazzarothRPC service using the specified rpc implementation.
         * @function create
         * @memberof pb.MazzarothRPC
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {MazzarothRPC} RPC service. Useful where requests and/or responses are streamed.
         */
        MazzarothRPC.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link pb.MazzarothRPC#transactionSubmit}.
         * @memberof pb.MazzarothRPC
         * @typedef TransactionSubmitCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {pb.TransactionSubmitResponse} [response] TransactionSubmitResponse
         */

        /**
         * Calls TransactionSubmit.
         * @function transactionSubmit
         * @memberof pb.MazzarothRPC
         * @instance
         * @param {pb.ITransactionSubmitRequest} request TransactionSubmitRequest message or plain object
         * @param {pb.MazzarothRPC.TransactionSubmitCallback} callback Node-style callback called with the error, if any, and TransactionSubmitResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(MazzarothRPC.prototype.transactionSubmit = function transactionSubmit(request, callback) {
            return this.rpcCall(transactionSubmit, $root.pb.TransactionSubmitRequest, $root.pb.TransactionSubmitResponse, request, callback);
        }, "name", { value: "TransactionSubmit" });

        /**
         * Calls TransactionSubmit.
         * @function transactionSubmit
         * @memberof pb.MazzarothRPC
         * @instance
         * @param {pb.ITransactionSubmitRequest} request TransactionSubmitRequest message or plain object
         * @returns {Promise<pb.TransactionSubmitResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link pb.MazzarothRPC#transactionLookup}.
         * @memberof pb.MazzarothRPC
         * @typedef TransactionLookupCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {pb.TransactionLookupResponse} [response] TransactionLookupResponse
         */

        /**
         * Calls TransactionLookup.
         * @function transactionLookup
         * @memberof pb.MazzarothRPC
         * @instance
         * @param {pb.ITransactionLookupRequest} request TransactionLookupRequest message or plain object
         * @param {pb.MazzarothRPC.TransactionLookupCallback} callback Node-style callback called with the error, if any, and TransactionLookupResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(MazzarothRPC.prototype.transactionLookup = function transactionLookup(request, callback) {
            return this.rpcCall(transactionLookup, $root.pb.TransactionLookupRequest, $root.pb.TransactionLookupResponse, request, callback);
        }, "name", { value: "TransactionLookup" });

        /**
         * Calls TransactionLookup.
         * @function transactionLookup
         * @memberof pb.MazzarothRPC
         * @instance
         * @param {pb.ITransactionLookupRequest} request TransactionLookupRequest message or plain object
         * @returns {Promise<pb.TransactionLookupResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link pb.MazzarothRPC#getBlock}.
         * @memberof pb.MazzarothRPC
         * @typedef GetBlockCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {pb.BlockReply} [response] BlockReply
         */

        /**
         * Calls GetBlock.
         * @function getBlock
         * @memberof pb.MazzarothRPC
         * @instance
         * @param {pb.IBlockRequest} request BlockRequest message or plain object
         * @param {pb.MazzarothRPC.GetBlockCallback} callback Node-style callback called with the error, if any, and BlockReply
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(MazzarothRPC.prototype.getBlock = function getBlock(request, callback) {
            return this.rpcCall(getBlock, $root.pb.BlockRequest, $root.pb.BlockReply, request, callback);
        }, "name", { value: "GetBlock" });

        /**
         * Calls GetBlock.
         * @function getBlock
         * @memberof pb.MazzarothRPC
         * @instance
         * @param {pb.IBlockRequest} request BlockRequest message or plain object
         * @returns {Promise<pb.BlockReply>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link pb.MazzarothRPC#getBlockByNumber}.
         * @memberof pb.MazzarothRPC
         * @typedef GetBlockByNumberCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {pb.BlockReply} [response] BlockReply
         */

        /**
         * Calls GetBlockByNumber.
         * @function getBlockByNumber
         * @memberof pb.MazzarothRPC
         * @instance
         * @param {pb.IBlockRequest} request BlockRequest message or plain object
         * @param {pb.MazzarothRPC.GetBlockByNumberCallback} callback Node-style callback called with the error, if any, and BlockReply
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(MazzarothRPC.prototype.getBlockByNumber = function getBlockByNumber(request, callback) {
            return this.rpcCall(getBlockByNumber, $root.pb.BlockRequest, $root.pb.BlockReply, request, callback);
        }, "name", { value: "GetBlockByNumber" });

        /**
         * Calls GetBlockByNumber.
         * @function getBlockByNumber
         * @memberof pb.MazzarothRPC
         * @instance
         * @param {pb.IBlockRequest} request BlockRequest message or plain object
         * @returns {Promise<pb.BlockReply>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link pb.MazzarothRPC#getBlockHeader}.
         * @memberof pb.MazzarothRPC
         * @typedef GetBlockHeaderCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {pb.BlockHeaderReply} [response] BlockHeaderReply
         */

        /**
         * Calls GetBlockHeader.
         * @function getBlockHeader
         * @memberof pb.MazzarothRPC
         * @instance
         * @param {pb.IBlockHeaderRequest} request BlockHeaderRequest message or plain object
         * @param {pb.MazzarothRPC.GetBlockHeaderCallback} callback Node-style callback called with the error, if any, and BlockHeaderReply
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(MazzarothRPC.prototype.getBlockHeader = function getBlockHeader(request, callback) {
            return this.rpcCall(getBlockHeader, $root.pb.BlockHeaderRequest, $root.pb.BlockHeaderReply, request, callback);
        }, "name", { value: "GetBlockHeader" });

        /**
         * Calls GetBlockHeader.
         * @function getBlockHeader
         * @memberof pb.MazzarothRPC
         * @instance
         * @param {pb.IBlockHeaderRequest} request BlockHeaderRequest message or plain object
         * @returns {Promise<pb.BlockHeaderReply>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link pb.MazzarothRPC#getBlockHeaderByNumber}.
         * @memberof pb.MazzarothRPC
         * @typedef GetBlockHeaderByNumberCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {pb.BlockHeaderReply} [response] BlockHeaderReply
         */

        /**
         * Calls GetBlockHeaderByNumber.
         * @function getBlockHeaderByNumber
         * @memberof pb.MazzarothRPC
         * @instance
         * @param {pb.IBlockHeaderRequest} request BlockHeaderRequest message or plain object
         * @param {pb.MazzarothRPC.GetBlockHeaderByNumberCallback} callback Node-style callback called with the error, if any, and BlockHeaderReply
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(MazzarothRPC.prototype.getBlockHeaderByNumber = function getBlockHeaderByNumber(request, callback) {
            return this.rpcCall(getBlockHeaderByNumber, $root.pb.BlockHeaderRequest, $root.pb.BlockHeaderReply, request, callback);
        }, "name", { value: "GetBlockHeaderByNumber" });

        /**
         * Calls GetBlockHeaderByNumber.
         * @function getBlockHeaderByNumber
         * @memberof pb.MazzarothRPC
         * @instance
         * @param {pb.IBlockHeaderRequest} request BlockHeaderRequest message or plain object
         * @returns {Promise<pb.BlockHeaderReply>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link pb.MazzarothRPC#contractDeploy}.
         * @memberof pb.MazzarothRPC
         * @typedef ContractDeployCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {pb.ContractDeployResponse} [response] ContractDeployResponse
         */

        /**
         * Calls ContractDeploy.
         * @function contractDeploy
         * @memberof pb.MazzarothRPC
         * @instance
         * @param {pb.IContractDeployRequest} request ContractDeployRequest message or plain object
         * @param {pb.MazzarothRPC.ContractDeployCallback} callback Node-style callback called with the error, if any, and ContractDeployResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(MazzarothRPC.prototype.contractDeploy = function contractDeploy(request, callback) {
            return this.rpcCall(contractDeploy, $root.pb.ContractDeployRequest, $root.pb.ContractDeployResponse, request, callback);
        }, "name", { value: "ContractDeploy" });

        /**
         * Calls ContractDeploy.
         * @function contractDeploy
         * @memberof pb.MazzarothRPC
         * @instance
         * @param {pb.IContractDeployRequest} request ContractDeployRequest message or plain object
         * @returns {Promise<pb.ContractDeployResponse>} Promise
         * @variation 2
         */

        return MazzarothRPC;
    })();

    pb.Transaction = (function() {

        /**
         * Properties of a Transaction.
         * @memberof pb
         * @interface ITransaction
         * @property {Uint8Array|null} [contractId] Transaction contractId
         * @property {string|null} [channel] Transaction channel
         * @property {Uint8Array|null} [senderId] Transaction senderId
         * @property {number|Long|null} [nonce] Transaction nonce
         * @property {string|null} [call] Transaction call
         * @property {Array.<Uint8Array>|null} [input] Transaction input
         */

        /**
         * Constructs a new Transaction.
         * @memberof pb
         * @classdesc Represents a Transaction.
         * @implements ITransaction
         * @constructor
         * @param {pb.ITransaction=} [properties] Properties to set
         */
        function Transaction(properties) {
            this.input = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Transaction contractId.
         * @member {Uint8Array} contractId
         * @memberof pb.Transaction
         * @instance
         */
        Transaction.prototype.contractId = $util.newBuffer([]);

        /**
         * Transaction channel.
         * @member {string} channel
         * @memberof pb.Transaction
         * @instance
         */
        Transaction.prototype.channel = "";

        /**
         * Transaction senderId.
         * @member {Uint8Array} senderId
         * @memberof pb.Transaction
         * @instance
         */
        Transaction.prototype.senderId = $util.newBuffer([]);

        /**
         * Transaction nonce.
         * @member {number|Long} nonce
         * @memberof pb.Transaction
         * @instance
         */
        Transaction.prototype.nonce = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Transaction call.
         * @member {string} call
         * @memberof pb.Transaction
         * @instance
         */
        Transaction.prototype.call = "";

        /**
         * Transaction input.
         * @member {Array.<Uint8Array>} input
         * @memberof pb.Transaction
         * @instance
         */
        Transaction.prototype.input = $util.emptyArray;

        /**
         * Creates a new Transaction instance using the specified properties.
         * @function create
         * @memberof pb.Transaction
         * @static
         * @param {pb.ITransaction=} [properties] Properties to set
         * @returns {pb.Transaction} Transaction instance
         */
        Transaction.create = function create(properties) {
            return new Transaction(properties);
        };

        /**
         * Encodes the specified Transaction message. Does not implicitly {@link pb.Transaction.verify|verify} messages.
         * @function encode
         * @memberof pb.Transaction
         * @static
         * @param {pb.ITransaction} message Transaction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Transaction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.contractId != null && message.hasOwnProperty("contractId"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.contractId);
            if (message.channel != null && message.hasOwnProperty("channel"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.channel);
            if (message.senderId != null && message.hasOwnProperty("senderId"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.senderId);
            if (message.nonce != null && message.hasOwnProperty("nonce"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.nonce);
            if (message.call != null && message.hasOwnProperty("call"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.call);
            if (message.input != null && message.input.length)
                for (let i = 0; i < message.input.length; ++i)
                    writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.input[i]);
            return writer;
        };

        /**
         * Encodes the specified Transaction message, length delimited. Does not implicitly {@link pb.Transaction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Transaction
         * @static
         * @param {pb.ITransaction} message Transaction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Transaction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Transaction message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Transaction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Transaction} Transaction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Transaction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Transaction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.contractId = reader.bytes();
                    break;
                case 2:
                    message.channel = reader.string();
                    break;
                case 3:
                    message.senderId = reader.bytes();
                    break;
                case 4:
                    message.nonce = reader.uint64();
                    break;
                case 5:
                    message.call = reader.string();
                    break;
                case 6:
                    if (!(message.input && message.input.length))
                        message.input = [];
                    message.input.push(reader.bytes());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Transaction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Transaction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Transaction} Transaction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Transaction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Transaction message.
         * @function verify
         * @memberof pb.Transaction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Transaction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.contractId != null && message.hasOwnProperty("contractId"))
                if (!(message.contractId && typeof message.contractId.length === "number" || $util.isString(message.contractId)))
                    return "contractId: buffer expected";
            if (message.channel != null && message.hasOwnProperty("channel"))
                if (!$util.isString(message.channel))
                    return "channel: string expected";
            if (message.senderId != null && message.hasOwnProperty("senderId"))
                if (!(message.senderId && typeof message.senderId.length === "number" || $util.isString(message.senderId)))
                    return "senderId: buffer expected";
            if (message.nonce != null && message.hasOwnProperty("nonce"))
                if (!$util.isInteger(message.nonce) && !(message.nonce && $util.isInteger(message.nonce.low) && $util.isInteger(message.nonce.high)))
                    return "nonce: integer|Long expected";
            if (message.call != null && message.hasOwnProperty("call"))
                if (!$util.isString(message.call))
                    return "call: string expected";
            if (message.input != null && message.hasOwnProperty("input")) {
                if (!Array.isArray(message.input))
                    return "input: array expected";
                for (let i = 0; i < message.input.length; ++i)
                    if (!(message.input[i] && typeof message.input[i].length === "number" || $util.isString(message.input[i])))
                        return "input: buffer[] expected";
            }
            return null;
        };

        /**
         * Creates a Transaction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Transaction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Transaction} Transaction
         */
        Transaction.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Transaction)
                return object;
            let message = new $root.pb.Transaction();
            if (object.contractId != null)
                if (typeof object.contractId === "string")
                    $util.base64.decode(object.contractId, message.contractId = $util.newBuffer($util.base64.length(object.contractId)), 0);
                else if (object.contractId.length)
                    message.contractId = object.contractId;
            if (object.channel != null)
                message.channel = String(object.channel);
            if (object.senderId != null)
                if (typeof object.senderId === "string")
                    $util.base64.decode(object.senderId, message.senderId = $util.newBuffer($util.base64.length(object.senderId)), 0);
                else if (object.senderId.length)
                    message.senderId = object.senderId;
            if (object.nonce != null)
                if ($util.Long)
                    (message.nonce = $util.Long.fromValue(object.nonce)).unsigned = true;
                else if (typeof object.nonce === "string")
                    message.nonce = parseInt(object.nonce, 10);
                else if (typeof object.nonce === "number")
                    message.nonce = object.nonce;
                else if (typeof object.nonce === "object")
                    message.nonce = new $util.LongBits(object.nonce.low >>> 0, object.nonce.high >>> 0).toNumber(true);
            if (object.call != null)
                message.call = String(object.call);
            if (object.input) {
                if (!Array.isArray(object.input))
                    throw TypeError(".pb.Transaction.input: array expected");
                message.input = [];
                for (let i = 0; i < object.input.length; ++i)
                    if (typeof object.input[i] === "string")
                        $util.base64.decode(object.input[i], message.input[i] = $util.newBuffer($util.base64.length(object.input[i])), 0);
                    else if (object.input[i].length)
                        message.input[i] = object.input[i];
            }
            return message;
        };

        /**
         * Creates a plain object from a Transaction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Transaction
         * @static
         * @param {pb.Transaction} message Transaction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Transaction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.input = [];
            if (options.defaults) {
                if (options.bytes === String)
                    object.contractId = "";
                else {
                    object.contractId = [];
                    if (options.bytes !== Array)
                        object.contractId = $util.newBuffer(object.contractId);
                }
                object.channel = "";
                if (options.bytes === String)
                    object.senderId = "";
                else {
                    object.senderId = [];
                    if (options.bytes !== Array)
                        object.senderId = $util.newBuffer(object.senderId);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.nonce = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.nonce = options.longs === String ? "0" : 0;
                object.call = "";
            }
            if (message.contractId != null && message.hasOwnProperty("contractId"))
                object.contractId = options.bytes === String ? $util.base64.encode(message.contractId, 0, message.contractId.length) : options.bytes === Array ? Array.prototype.slice.call(message.contractId) : message.contractId;
            if (message.channel != null && message.hasOwnProperty("channel"))
                object.channel = message.channel;
            if (message.senderId != null && message.hasOwnProperty("senderId"))
                object.senderId = options.bytes === String ? $util.base64.encode(message.senderId, 0, message.senderId.length) : options.bytes === Array ? Array.prototype.slice.call(message.senderId) : message.senderId;
            if (message.nonce != null && message.hasOwnProperty("nonce"))
                if (typeof message.nonce === "number")
                    object.nonce = options.longs === String ? String(message.nonce) : message.nonce;
                else
                    object.nonce = options.longs === String ? $util.Long.prototype.toString.call(message.nonce) : options.longs === Number ? new $util.LongBits(message.nonce.low >>> 0, message.nonce.high >>> 0).toNumber(true) : message.nonce;
            if (message.call != null && message.hasOwnProperty("call"))
                object.call = message.call;
            if (message.input && message.input.length) {
                object.input = [];
                for (let j = 0; j < message.input.length; ++j)
                    object.input[j] = options.bytes === String ? $util.base64.encode(message.input[j], 0, message.input[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.input[j]) : message.input[j];
            }
            return object;
        };

        /**
         * Converts this Transaction to JSON.
         * @function toJSON
         * @memberof pb.Transaction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Transaction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Transaction;
    })();

    pb.SignedTransaction = (function() {

        /**
         * Properties of a SignedTransaction.
         * @memberof pb
         * @interface ISignedTransaction
         * @property {Uint8Array|null} [transaction] SignedTransaction transaction
         * @property {Uint8Array|null} [signature] SignedTransaction signature
         */

        /**
         * Constructs a new SignedTransaction.
         * @memberof pb
         * @classdesc Represents a SignedTransaction.
         * @implements ISignedTransaction
         * @constructor
         * @param {pb.ISignedTransaction=} [properties] Properties to set
         */
        function SignedTransaction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SignedTransaction transaction.
         * @member {Uint8Array} transaction
         * @memberof pb.SignedTransaction
         * @instance
         */
        SignedTransaction.prototype.transaction = $util.newBuffer([]);

        /**
         * SignedTransaction signature.
         * @member {Uint8Array} signature
         * @memberof pb.SignedTransaction
         * @instance
         */
        SignedTransaction.prototype.signature = $util.newBuffer([]);

        /**
         * Creates a new SignedTransaction instance using the specified properties.
         * @function create
         * @memberof pb.SignedTransaction
         * @static
         * @param {pb.ISignedTransaction=} [properties] Properties to set
         * @returns {pb.SignedTransaction} SignedTransaction instance
         */
        SignedTransaction.create = function create(properties) {
            return new SignedTransaction(properties);
        };

        /**
         * Encodes the specified SignedTransaction message. Does not implicitly {@link pb.SignedTransaction.verify|verify} messages.
         * @function encode
         * @memberof pb.SignedTransaction
         * @static
         * @param {pb.ISignedTransaction} message SignedTransaction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SignedTransaction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.transaction != null && message.hasOwnProperty("transaction"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.transaction);
            if (message.signature != null && message.hasOwnProperty("signature"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signature);
            return writer;
        };

        /**
         * Encodes the specified SignedTransaction message, length delimited. Does not implicitly {@link pb.SignedTransaction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SignedTransaction
         * @static
         * @param {pb.ISignedTransaction} message SignedTransaction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SignedTransaction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SignedTransaction message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SignedTransaction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SignedTransaction} SignedTransaction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SignedTransaction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.SignedTransaction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.transaction = reader.bytes();
                    break;
                case 2:
                    message.signature = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SignedTransaction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SignedTransaction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SignedTransaction} SignedTransaction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SignedTransaction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SignedTransaction message.
         * @function verify
         * @memberof pb.SignedTransaction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SignedTransaction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.transaction != null && message.hasOwnProperty("transaction"))
                if (!(message.transaction && typeof message.transaction.length === "number" || $util.isString(message.transaction)))
                    return "transaction: buffer expected";
            if (message.signature != null && message.hasOwnProperty("signature"))
                if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                    return "signature: buffer expected";
            return null;
        };

        /**
         * Creates a SignedTransaction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SignedTransaction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SignedTransaction} SignedTransaction
         */
        SignedTransaction.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.SignedTransaction)
                return object;
            let message = new $root.pb.SignedTransaction();
            if (object.transaction != null)
                if (typeof object.transaction === "string")
                    $util.base64.decode(object.transaction, message.transaction = $util.newBuffer($util.base64.length(object.transaction)), 0);
                else if (object.transaction.length)
                    message.transaction = object.transaction;
            if (object.signature != null)
                if (typeof object.signature === "string")
                    $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
                else if (object.signature.length)
                    message.signature = object.signature;
            return message;
        };

        /**
         * Creates a plain object from a SignedTransaction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SignedTransaction
         * @static
         * @param {pb.SignedTransaction} message SignedTransaction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SignedTransaction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.transaction = "";
                else {
                    object.transaction = [];
                    if (options.bytes !== Array)
                        object.transaction = $util.newBuffer(object.transaction);
                }
                if (options.bytes === String)
                    object.signature = "";
                else {
                    object.signature = [];
                    if (options.bytes !== Array)
                        object.signature = $util.newBuffer(object.signature);
                }
            }
            if (message.transaction != null && message.hasOwnProperty("transaction"))
                object.transaction = options.bytes === String ? $util.base64.encode(message.transaction, 0, message.transaction.length) : options.bytes === Array ? Array.prototype.slice.call(message.transaction) : message.transaction;
            if (message.signature != null && message.hasOwnProperty("signature"))
                object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
            return object;
        };

        /**
         * Converts this SignedTransaction to JSON.
         * @function toJSON
         * @memberof pb.SignedTransaction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SignedTransaction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SignedTransaction;
    })();

    pb.AcceptedTransaction = (function() {

        /**
         * Properties of an AcceptedTransaction.
         * @memberof pb
         * @interface IAcceptedTransaction
         * @property {number|Long|null} [id] AcceptedTransaction id
         * @property {Uint8Array|null} [signedTransaction] AcceptedTransaction signedTransaction
         */

        /**
         * Constructs a new AcceptedTransaction.
         * @memberof pb
         * @classdesc Represents an AcceptedTransaction.
         * @implements IAcceptedTransaction
         * @constructor
         * @param {pb.IAcceptedTransaction=} [properties] Properties to set
         */
        function AcceptedTransaction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AcceptedTransaction id.
         * @member {number|Long} id
         * @memberof pb.AcceptedTransaction
         * @instance
         */
        AcceptedTransaction.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * AcceptedTransaction signedTransaction.
         * @member {Uint8Array} signedTransaction
         * @memberof pb.AcceptedTransaction
         * @instance
         */
        AcceptedTransaction.prototype.signedTransaction = $util.newBuffer([]);

        /**
         * Creates a new AcceptedTransaction instance using the specified properties.
         * @function create
         * @memberof pb.AcceptedTransaction
         * @static
         * @param {pb.IAcceptedTransaction=} [properties] Properties to set
         * @returns {pb.AcceptedTransaction} AcceptedTransaction instance
         */
        AcceptedTransaction.create = function create(properties) {
            return new AcceptedTransaction(properties);
        };

        /**
         * Encodes the specified AcceptedTransaction message. Does not implicitly {@link pb.AcceptedTransaction.verify|verify} messages.
         * @function encode
         * @memberof pb.AcceptedTransaction
         * @static
         * @param {pb.IAcceptedTransaction} message AcceptedTransaction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AcceptedTransaction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.id);
            if (message.signedTransaction != null && message.hasOwnProperty("signedTransaction"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signedTransaction);
            return writer;
        };

        /**
         * Encodes the specified AcceptedTransaction message, length delimited. Does not implicitly {@link pb.AcceptedTransaction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.AcceptedTransaction
         * @static
         * @param {pb.IAcceptedTransaction} message AcceptedTransaction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AcceptedTransaction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AcceptedTransaction message from the specified reader or buffer.
         * @function decode
         * @memberof pb.AcceptedTransaction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.AcceptedTransaction} AcceptedTransaction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AcceptedTransaction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.AcceptedTransaction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
                    break;
                case 2:
                    message.signedTransaction = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AcceptedTransaction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.AcceptedTransaction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.AcceptedTransaction} AcceptedTransaction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AcceptedTransaction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AcceptedTransaction message.
         * @function verify
         * @memberof pb.AcceptedTransaction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AcceptedTransaction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            if (message.signedTransaction != null && message.hasOwnProperty("signedTransaction"))
                if (!(message.signedTransaction && typeof message.signedTransaction.length === "number" || $util.isString(message.signedTransaction)))
                    return "signedTransaction: buffer expected";
            return null;
        };

        /**
         * Creates an AcceptedTransaction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.AcceptedTransaction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.AcceptedTransaction} AcceptedTransaction
         */
        AcceptedTransaction.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.AcceptedTransaction)
                return object;
            let message = new $root.pb.AcceptedTransaction();
            if (object.id != null)
                if ($util.Long)
                    (message.id = $util.Long.fromValue(object.id)).unsigned = true;
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
            if (object.signedTransaction != null)
                if (typeof object.signedTransaction === "string")
                    $util.base64.decode(object.signedTransaction, message.signedTransaction = $util.newBuffer($util.base64.length(object.signedTransaction)), 0);
                else if (object.signedTransaction.length)
                    message.signedTransaction = object.signedTransaction;
            return message;
        };

        /**
         * Creates a plain object from an AcceptedTransaction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.AcceptedTransaction
         * @static
         * @param {pb.AcceptedTransaction} message AcceptedTransaction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AcceptedTransaction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.id = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.signedTransaction = "";
                else {
                    object.signedTransaction = [];
                    if (options.bytes !== Array)
                        object.signedTransaction = $util.newBuffer(object.signedTransaction);
                }
            }
            if (message.id != null && message.hasOwnProperty("id"))
                if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
            if (message.signedTransaction != null && message.hasOwnProperty("signedTransaction"))
                object.signedTransaction = options.bytes === String ? $util.base64.encode(message.signedTransaction, 0, message.signedTransaction.length) : options.bytes === Array ? Array.prototype.slice.call(message.signedTransaction) : message.signedTransaction;
            return object;
        };

        /**
         * Converts this AcceptedTransaction to JSON.
         * @function toJSON
         * @memberof pb.AcceptedTransaction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AcceptedTransaction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AcceptedTransaction;
    })();

    /**
     * TransactionStatus enum.
     * @name pb.TransactionStatus
     * @enum {string}
     * @property {number} TX_UNKNOWN=0 TX_UNKNOWN value
     * @property {number} TX_ACCEPTED=1 TX_ACCEPTED value
     * @property {number} TX_REJECTED=2 TX_REJECTED value
     * @property {number} TX_CONFIRMED=3 TX_CONFIRMED value
     * @property {number} TX_NOT_FOUND=4 TX_NOT_FOUND value
     */
    pb.TransactionStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "TX_UNKNOWN"] = 0;
        values[valuesById[1] = "TX_ACCEPTED"] = 1;
        values[valuesById[2] = "TX_REJECTED"] = 2;
        values[valuesById[3] = "TX_CONFIRMED"] = 3;
        values[valuesById[4] = "TX_NOT_FOUND"] = 4;
        return values;
    })();

    pb.Contract = (function() {

        /**
         * Properties of a Contract.
         * @memberof pb
         * @interface IContract
         * @property {string|null} [name] Contract name
         * @property {Uint8Array|null} [ownerId] Contract ownerId
         * @property {Uint8Array|null} [wasmBytes] Contract wasmBytes
         */

        /**
         * Constructs a new Contract.
         * @memberof pb
         * @classdesc Represents a Contract.
         * @implements IContract
         * @constructor
         * @param {pb.IContract=} [properties] Properties to set
         */
        function Contract(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Contract name.
         * @member {string} name
         * @memberof pb.Contract
         * @instance
         */
        Contract.prototype.name = "";

        /**
         * Contract ownerId.
         * @member {Uint8Array} ownerId
         * @memberof pb.Contract
         * @instance
         */
        Contract.prototype.ownerId = $util.newBuffer([]);

        /**
         * Contract wasmBytes.
         * @member {Uint8Array} wasmBytes
         * @memberof pb.Contract
         * @instance
         */
        Contract.prototype.wasmBytes = $util.newBuffer([]);

        /**
         * Creates a new Contract instance using the specified properties.
         * @function create
         * @memberof pb.Contract
         * @static
         * @param {pb.IContract=} [properties] Properties to set
         * @returns {pb.Contract} Contract instance
         */
        Contract.create = function create(properties) {
            return new Contract(properties);
        };

        /**
         * Encodes the specified Contract message. Does not implicitly {@link pb.Contract.verify|verify} messages.
         * @function encode
         * @memberof pb.Contract
         * @static
         * @param {pb.IContract} message Contract message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Contract.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.ownerId != null && message.hasOwnProperty("ownerId"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.ownerId);
            if (message.wasmBytes != null && message.hasOwnProperty("wasmBytes"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.wasmBytes);
            return writer;
        };

        /**
         * Encodes the specified Contract message, length delimited. Does not implicitly {@link pb.Contract.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Contract
         * @static
         * @param {pb.IContract} message Contract message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Contract.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Contract message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Contract
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Contract} Contract
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Contract.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Contract();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.ownerId = reader.bytes();
                    break;
                case 3:
                    message.wasmBytes = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Contract message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Contract
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Contract} Contract
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Contract.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Contract message.
         * @function verify
         * @memberof pb.Contract
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Contract.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.ownerId != null && message.hasOwnProperty("ownerId"))
                if (!(message.ownerId && typeof message.ownerId.length === "number" || $util.isString(message.ownerId)))
                    return "ownerId: buffer expected";
            if (message.wasmBytes != null && message.hasOwnProperty("wasmBytes"))
                if (!(message.wasmBytes && typeof message.wasmBytes.length === "number" || $util.isString(message.wasmBytes)))
                    return "wasmBytes: buffer expected";
            return null;
        };

        /**
         * Creates a Contract message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Contract
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Contract} Contract
         */
        Contract.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Contract)
                return object;
            let message = new $root.pb.Contract();
            if (object.name != null)
                message.name = String(object.name);
            if (object.ownerId != null)
                if (typeof object.ownerId === "string")
                    $util.base64.decode(object.ownerId, message.ownerId = $util.newBuffer($util.base64.length(object.ownerId)), 0);
                else if (object.ownerId.length)
                    message.ownerId = object.ownerId;
            if (object.wasmBytes != null)
                if (typeof object.wasmBytes === "string")
                    $util.base64.decode(object.wasmBytes, message.wasmBytes = $util.newBuffer($util.base64.length(object.wasmBytes)), 0);
                else if (object.wasmBytes.length)
                    message.wasmBytes = object.wasmBytes;
            return message;
        };

        /**
         * Creates a plain object from a Contract message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Contract
         * @static
         * @param {pb.Contract} message Contract
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Contract.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.name = "";
                if (options.bytes === String)
                    object.ownerId = "";
                else {
                    object.ownerId = [];
                    if (options.bytes !== Array)
                        object.ownerId = $util.newBuffer(object.ownerId);
                }
                if (options.bytes === String)
                    object.wasmBytes = "";
                else {
                    object.wasmBytes = [];
                    if (options.bytes !== Array)
                        object.wasmBytes = $util.newBuffer(object.wasmBytes);
                }
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.ownerId != null && message.hasOwnProperty("ownerId"))
                object.ownerId = options.bytes === String ? $util.base64.encode(message.ownerId, 0, message.ownerId.length) : options.bytes === Array ? Array.prototype.slice.call(message.ownerId) : message.ownerId;
            if (message.wasmBytes != null && message.hasOwnProperty("wasmBytes"))
                object.wasmBytes = options.bytes === String ? $util.base64.encode(message.wasmBytes, 0, message.wasmBytes.length) : options.bytes === Array ? Array.prototype.slice.call(message.wasmBytes) : message.wasmBytes;
            return object;
        };

        /**
         * Converts this Contract to JSON.
         * @function toJSON
         * @memberof pb.Contract
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Contract.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Contract;
    })();

    pb.SignedContract = (function() {

        /**
         * Properties of a SignedContract.
         * @memberof pb
         * @interface ISignedContract
         * @property {Uint8Array|null} [contract] SignedContract contract
         * @property {Uint8Array|null} [signature] SignedContract signature
         */

        /**
         * Constructs a new SignedContract.
         * @memberof pb
         * @classdesc Represents a SignedContract.
         * @implements ISignedContract
         * @constructor
         * @param {pb.ISignedContract=} [properties] Properties to set
         */
        function SignedContract(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SignedContract contract.
         * @member {Uint8Array} contract
         * @memberof pb.SignedContract
         * @instance
         */
        SignedContract.prototype.contract = $util.newBuffer([]);

        /**
         * SignedContract signature.
         * @member {Uint8Array} signature
         * @memberof pb.SignedContract
         * @instance
         */
        SignedContract.prototype.signature = $util.newBuffer([]);

        /**
         * Creates a new SignedContract instance using the specified properties.
         * @function create
         * @memberof pb.SignedContract
         * @static
         * @param {pb.ISignedContract=} [properties] Properties to set
         * @returns {pb.SignedContract} SignedContract instance
         */
        SignedContract.create = function create(properties) {
            return new SignedContract(properties);
        };

        /**
         * Encodes the specified SignedContract message. Does not implicitly {@link pb.SignedContract.verify|verify} messages.
         * @function encode
         * @memberof pb.SignedContract
         * @static
         * @param {pb.ISignedContract} message SignedContract message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SignedContract.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.contract != null && message.hasOwnProperty("contract"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.contract);
            if (message.signature != null && message.hasOwnProperty("signature"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signature);
            return writer;
        };

        /**
         * Encodes the specified SignedContract message, length delimited. Does not implicitly {@link pb.SignedContract.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SignedContract
         * @static
         * @param {pb.ISignedContract} message SignedContract message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SignedContract.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SignedContract message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SignedContract
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SignedContract} SignedContract
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SignedContract.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.SignedContract();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.contract = reader.bytes();
                    break;
                case 2:
                    message.signature = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SignedContract message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SignedContract
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SignedContract} SignedContract
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SignedContract.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SignedContract message.
         * @function verify
         * @memberof pb.SignedContract
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SignedContract.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.contract != null && message.hasOwnProperty("contract"))
                if (!(message.contract && typeof message.contract.length === "number" || $util.isString(message.contract)))
                    return "contract: buffer expected";
            if (message.signature != null && message.hasOwnProperty("signature"))
                if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                    return "signature: buffer expected";
            return null;
        };

        /**
         * Creates a SignedContract message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SignedContract
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SignedContract} SignedContract
         */
        SignedContract.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.SignedContract)
                return object;
            let message = new $root.pb.SignedContract();
            if (object.contract != null)
                if (typeof object.contract === "string")
                    $util.base64.decode(object.contract, message.contract = $util.newBuffer($util.base64.length(object.contract)), 0);
                else if (object.contract.length)
                    message.contract = object.contract;
            if (object.signature != null)
                if (typeof object.signature === "string")
                    $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
                else if (object.signature.length)
                    message.signature = object.signature;
            return message;
        };

        /**
         * Creates a plain object from a SignedContract message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SignedContract
         * @static
         * @param {pb.SignedContract} message SignedContract
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SignedContract.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.contract = "";
                else {
                    object.contract = [];
                    if (options.bytes !== Array)
                        object.contract = $util.newBuffer(object.contract);
                }
                if (options.bytes === String)
                    object.signature = "";
                else {
                    object.signature = [];
                    if (options.bytes !== Array)
                        object.signature = $util.newBuffer(object.signature);
                }
            }
            if (message.contract != null && message.hasOwnProperty("contract"))
                object.contract = options.bytes === String ? $util.base64.encode(message.contract, 0, message.contract.length) : options.bytes === Array ? Array.prototype.slice.call(message.contract) : message.contract;
            if (message.signature != null && message.hasOwnProperty("signature"))
                object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
            return object;
        };

        /**
         * Converts this SignedContract to JSON.
         * @function toJSON
         * @memberof pb.SignedContract
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SignedContract.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SignedContract;
    })();

    pb.AcceptedContract = (function() {

        /**
         * Properties of an AcceptedContract.
         * @memberof pb
         * @interface IAcceptedContract
         * @property {Uint8Array|null} [contractId] AcceptedContract contractId
         * @property {Uint8Array|null} [signedContract] AcceptedContract signedContract
         */

        /**
         * Constructs a new AcceptedContract.
         * @memberof pb
         * @classdesc Represents an AcceptedContract.
         * @implements IAcceptedContract
         * @constructor
         * @param {pb.IAcceptedContract=} [properties] Properties to set
         */
        function AcceptedContract(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AcceptedContract contractId.
         * @member {Uint8Array} contractId
         * @memberof pb.AcceptedContract
         * @instance
         */
        AcceptedContract.prototype.contractId = $util.newBuffer([]);

        /**
         * AcceptedContract signedContract.
         * @member {Uint8Array} signedContract
         * @memberof pb.AcceptedContract
         * @instance
         */
        AcceptedContract.prototype.signedContract = $util.newBuffer([]);

        /**
         * Creates a new AcceptedContract instance using the specified properties.
         * @function create
         * @memberof pb.AcceptedContract
         * @static
         * @param {pb.IAcceptedContract=} [properties] Properties to set
         * @returns {pb.AcceptedContract} AcceptedContract instance
         */
        AcceptedContract.create = function create(properties) {
            return new AcceptedContract(properties);
        };

        /**
         * Encodes the specified AcceptedContract message. Does not implicitly {@link pb.AcceptedContract.verify|verify} messages.
         * @function encode
         * @memberof pb.AcceptedContract
         * @static
         * @param {pb.IAcceptedContract} message AcceptedContract message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AcceptedContract.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.contractId != null && message.hasOwnProperty("contractId"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.contractId);
            if (message.signedContract != null && message.hasOwnProperty("signedContract"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signedContract);
            return writer;
        };

        /**
         * Encodes the specified AcceptedContract message, length delimited. Does not implicitly {@link pb.AcceptedContract.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.AcceptedContract
         * @static
         * @param {pb.IAcceptedContract} message AcceptedContract message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AcceptedContract.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AcceptedContract message from the specified reader or buffer.
         * @function decode
         * @memberof pb.AcceptedContract
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.AcceptedContract} AcceptedContract
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AcceptedContract.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.AcceptedContract();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.contractId = reader.bytes();
                    break;
                case 2:
                    message.signedContract = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AcceptedContract message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.AcceptedContract
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.AcceptedContract} AcceptedContract
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AcceptedContract.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AcceptedContract message.
         * @function verify
         * @memberof pb.AcceptedContract
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AcceptedContract.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.contractId != null && message.hasOwnProperty("contractId"))
                if (!(message.contractId && typeof message.contractId.length === "number" || $util.isString(message.contractId)))
                    return "contractId: buffer expected";
            if (message.signedContract != null && message.hasOwnProperty("signedContract"))
                if (!(message.signedContract && typeof message.signedContract.length === "number" || $util.isString(message.signedContract)))
                    return "signedContract: buffer expected";
            return null;
        };

        /**
         * Creates an AcceptedContract message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.AcceptedContract
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.AcceptedContract} AcceptedContract
         */
        AcceptedContract.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.AcceptedContract)
                return object;
            let message = new $root.pb.AcceptedContract();
            if (object.contractId != null)
                if (typeof object.contractId === "string")
                    $util.base64.decode(object.contractId, message.contractId = $util.newBuffer($util.base64.length(object.contractId)), 0);
                else if (object.contractId.length)
                    message.contractId = object.contractId;
            if (object.signedContract != null)
                if (typeof object.signedContract === "string")
                    $util.base64.decode(object.signedContract, message.signedContract = $util.newBuffer($util.base64.length(object.signedContract)), 0);
                else if (object.signedContract.length)
                    message.signedContract = object.signedContract;
            return message;
        };

        /**
         * Creates a plain object from an AcceptedContract message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.AcceptedContract
         * @static
         * @param {pb.AcceptedContract} message AcceptedContract
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AcceptedContract.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.contractId = "";
                else {
                    object.contractId = [];
                    if (options.bytes !== Array)
                        object.contractId = $util.newBuffer(object.contractId);
                }
                if (options.bytes === String)
                    object.signedContract = "";
                else {
                    object.signedContract = [];
                    if (options.bytes !== Array)
                        object.signedContract = $util.newBuffer(object.signedContract);
                }
            }
            if (message.contractId != null && message.hasOwnProperty("contractId"))
                object.contractId = options.bytes === String ? $util.base64.encode(message.contractId, 0, message.contractId.length) : options.bytes === Array ? Array.prototype.slice.call(message.contractId) : message.contractId;
            if (message.signedContract != null && message.hasOwnProperty("signedContract"))
                object.signedContract = options.bytes === String ? $util.base64.encode(message.signedContract, 0, message.signedContract.length) : options.bytes === Array ? Array.prototype.slice.call(message.signedContract) : message.signedContract;
            return object;
        };

        /**
         * Converts this AcceptedContract to JSON.
         * @function toJSON
         * @memberof pb.AcceptedContract
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AcceptedContract.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AcceptedContract;
    })();

    /**
     * ContractStatus enum.
     * @name pb.ContractStatus
     * @enum {string}
     * @property {number} CT_UNKNOWN=0 CT_UNKNOWN value
     * @property {number} CT_ACCEPTED=1 CT_ACCEPTED value
     * @property {number} CT_REJECTED=2 CT_REJECTED value
     * @property {number} CT_ACTIVE=3 CT_ACTIVE value
     * @property {number} CT_PAUSED=4 CT_PAUSED value
     * @property {number} CT_DEACTIVATED=5 CT_DEACTIVATED value
     * @property {number} CT_NOT_FOUND=6 CT_NOT_FOUND value
     */
    pb.ContractStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "CT_UNKNOWN"] = 0;
        values[valuesById[1] = "CT_ACCEPTED"] = 1;
        values[valuesById[2] = "CT_REJECTED"] = 2;
        values[valuesById[3] = "CT_ACTIVE"] = 3;
        values[valuesById[4] = "CT_PAUSED"] = 4;
        values[valuesById[5] = "CT_DEACTIVATED"] = 5;
        values[valuesById[6] = "CT_NOT_FOUND"] = 6;
        return values;
    })();

    pb.Block = (function() {

        /**
         * Properties of a Block.
         * @memberof pb
         * @interface IBlock
         * @property {Array.<string>|null} [transactionHashes] Block transactionHashes
         * @property {Array.<string>|null} [receipts] Block receipts
         * @property {Array.<string>|null} [events] Block events
         * @property {string|null} [transactionDb] Block transactionDb
         */

        /**
         * Constructs a new Block.
         * @memberof pb
         * @classdesc Represents a Block.
         * @implements IBlock
         * @constructor
         * @param {pb.IBlock=} [properties] Properties to set
         */
        function Block(properties) {
            this.transactionHashes = [];
            this.receipts = [];
            this.events = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Block transactionHashes.
         * @member {Array.<string>} transactionHashes
         * @memberof pb.Block
         * @instance
         */
        Block.prototype.transactionHashes = $util.emptyArray;

        /**
         * Block receipts.
         * @member {Array.<string>} receipts
         * @memberof pb.Block
         * @instance
         */
        Block.prototype.receipts = $util.emptyArray;

        /**
         * Block events.
         * @member {Array.<string>} events
         * @memberof pb.Block
         * @instance
         */
        Block.prototype.events = $util.emptyArray;

        /**
         * Block transactionDb.
         * @member {string} transactionDb
         * @memberof pb.Block
         * @instance
         */
        Block.prototype.transactionDb = "";

        /**
         * Creates a new Block instance using the specified properties.
         * @function create
         * @memberof pb.Block
         * @static
         * @param {pb.IBlock=} [properties] Properties to set
         * @returns {pb.Block} Block instance
         */
        Block.create = function create(properties) {
            return new Block(properties);
        };

        /**
         * Encodes the specified Block message. Does not implicitly {@link pb.Block.verify|verify} messages.
         * @function encode
         * @memberof pb.Block
         * @static
         * @param {pb.IBlock} message Block message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Block.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.transactionHashes != null && message.transactionHashes.length)
                for (let i = 0; i < message.transactionHashes.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.transactionHashes[i]);
            if (message.receipts != null && message.receipts.length)
                for (let i = 0; i < message.receipts.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.receipts[i]);
            if (message.events != null && message.events.length)
                for (let i = 0; i < message.events.length; ++i)
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.events[i]);
            if (message.transactionDb != null && message.hasOwnProperty("transactionDb"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.transactionDb);
            return writer;
        };

        /**
         * Encodes the specified Block message, length delimited. Does not implicitly {@link pb.Block.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Block
         * @static
         * @param {pb.IBlock} message Block message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Block.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Block message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Block
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Block} Block
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Block.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Block();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.transactionHashes && message.transactionHashes.length))
                        message.transactionHashes = [];
                    message.transactionHashes.push(reader.string());
                    break;
                case 2:
                    if (!(message.receipts && message.receipts.length))
                        message.receipts = [];
                    message.receipts.push(reader.string());
                    break;
                case 3:
                    if (!(message.events && message.events.length))
                        message.events = [];
                    message.events.push(reader.string());
                    break;
                case 4:
                    message.transactionDb = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Block message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Block
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Block} Block
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Block.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Block message.
         * @function verify
         * @memberof pb.Block
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Block.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.transactionHashes != null && message.hasOwnProperty("transactionHashes")) {
                if (!Array.isArray(message.transactionHashes))
                    return "transactionHashes: array expected";
                for (let i = 0; i < message.transactionHashes.length; ++i)
                    if (!$util.isString(message.transactionHashes[i]))
                        return "transactionHashes: string[] expected";
            }
            if (message.receipts != null && message.hasOwnProperty("receipts")) {
                if (!Array.isArray(message.receipts))
                    return "receipts: array expected";
                for (let i = 0; i < message.receipts.length; ++i)
                    if (!$util.isString(message.receipts[i]))
                        return "receipts: string[] expected";
            }
            if (message.events != null && message.hasOwnProperty("events")) {
                if (!Array.isArray(message.events))
                    return "events: array expected";
                for (let i = 0; i < message.events.length; ++i)
                    if (!$util.isString(message.events[i]))
                        return "events: string[] expected";
            }
            if (message.transactionDb != null && message.hasOwnProperty("transactionDb"))
                if (!$util.isString(message.transactionDb))
                    return "transactionDb: string expected";
            return null;
        };

        /**
         * Creates a Block message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Block
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Block} Block
         */
        Block.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Block)
                return object;
            let message = new $root.pb.Block();
            if (object.transactionHashes) {
                if (!Array.isArray(object.transactionHashes))
                    throw TypeError(".pb.Block.transactionHashes: array expected");
                message.transactionHashes = [];
                for (let i = 0; i < object.transactionHashes.length; ++i)
                    message.transactionHashes[i] = String(object.transactionHashes[i]);
            }
            if (object.receipts) {
                if (!Array.isArray(object.receipts))
                    throw TypeError(".pb.Block.receipts: array expected");
                message.receipts = [];
                for (let i = 0; i < object.receipts.length; ++i)
                    message.receipts[i] = String(object.receipts[i]);
            }
            if (object.events) {
                if (!Array.isArray(object.events))
                    throw TypeError(".pb.Block.events: array expected");
                message.events = [];
                for (let i = 0; i < object.events.length; ++i)
                    message.events[i] = String(object.events[i]);
            }
            if (object.transactionDb != null)
                message.transactionDb = String(object.transactionDb);
            return message;
        };

        /**
         * Creates a plain object from a Block message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Block
         * @static
         * @param {pb.Block} message Block
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Block.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.transactionHashes = [];
                object.receipts = [];
                object.events = [];
            }
            if (options.defaults)
                object.transactionDb = "";
            if (message.transactionHashes && message.transactionHashes.length) {
                object.transactionHashes = [];
                for (let j = 0; j < message.transactionHashes.length; ++j)
                    object.transactionHashes[j] = message.transactionHashes[j];
            }
            if (message.receipts && message.receipts.length) {
                object.receipts = [];
                for (let j = 0; j < message.receipts.length; ++j)
                    object.receipts[j] = message.receipts[j];
            }
            if (message.events && message.events.length) {
                object.events = [];
                for (let j = 0; j < message.events.length; ++j)
                    object.events[j] = message.events[j];
            }
            if (message.transactionDb != null && message.hasOwnProperty("transactionDb"))
                object.transactionDb = message.transactionDb;
            return object;
        };

        /**
         * Converts this Block to JSON.
         * @function toJSON
         * @memberof pb.Block
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Block.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Block;
    })();

    pb.BlockHeader = (function() {

        /**
         * Properties of a BlockHeader.
         * @memberof pb
         * @interface IBlockHeader
         * @property {string|null} [timestamp] BlockHeader timestamp
         * @property {number|Long|null} [blockHeight] BlockHeader blockHeight
         * @property {string|null} [merkleRoot] BlockHeader merkleRoot
         * @property {string|null} [previousHeader] BlockHeader previousHeader
         */

        /**
         * Constructs a new BlockHeader.
         * @memberof pb
         * @classdesc Represents a BlockHeader.
         * @implements IBlockHeader
         * @constructor
         * @param {pb.IBlockHeader=} [properties] Properties to set
         */
        function BlockHeader(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BlockHeader timestamp.
         * @member {string} timestamp
         * @memberof pb.BlockHeader
         * @instance
         */
        BlockHeader.prototype.timestamp = "";

        /**
         * BlockHeader blockHeight.
         * @member {number|Long} blockHeight
         * @memberof pb.BlockHeader
         * @instance
         */
        BlockHeader.prototype.blockHeight = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * BlockHeader merkleRoot.
         * @member {string} merkleRoot
         * @memberof pb.BlockHeader
         * @instance
         */
        BlockHeader.prototype.merkleRoot = "";

        /**
         * BlockHeader previousHeader.
         * @member {string} previousHeader
         * @memberof pb.BlockHeader
         * @instance
         */
        BlockHeader.prototype.previousHeader = "";

        /**
         * Creates a new BlockHeader instance using the specified properties.
         * @function create
         * @memberof pb.BlockHeader
         * @static
         * @param {pb.IBlockHeader=} [properties] Properties to set
         * @returns {pb.BlockHeader} BlockHeader instance
         */
        BlockHeader.create = function create(properties) {
            return new BlockHeader(properties);
        };

        /**
         * Encodes the specified BlockHeader message. Does not implicitly {@link pb.BlockHeader.verify|verify} messages.
         * @function encode
         * @memberof pb.BlockHeader
         * @static
         * @param {pb.IBlockHeader} message BlockHeader message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BlockHeader.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.timestamp);
            if (message.blockHeight != null && message.hasOwnProperty("blockHeight"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.blockHeight);
            if (message.merkleRoot != null && message.hasOwnProperty("merkleRoot"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.merkleRoot);
            if (message.previousHeader != null && message.hasOwnProperty("previousHeader"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.previousHeader);
            return writer;
        };

        /**
         * Encodes the specified BlockHeader message, length delimited. Does not implicitly {@link pb.BlockHeader.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.BlockHeader
         * @static
         * @param {pb.IBlockHeader} message BlockHeader message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BlockHeader.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BlockHeader message from the specified reader or buffer.
         * @function decode
         * @memberof pb.BlockHeader
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.BlockHeader} BlockHeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BlockHeader.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.BlockHeader();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.timestamp = reader.string();
                    break;
                case 2:
                    message.blockHeight = reader.uint64();
                    break;
                case 3:
                    message.merkleRoot = reader.string();
                    break;
                case 4:
                    message.previousHeader = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BlockHeader message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.BlockHeader
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.BlockHeader} BlockHeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BlockHeader.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BlockHeader message.
         * @function verify
         * @memberof pb.BlockHeader
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BlockHeader.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isString(message.timestamp))
                    return "timestamp: string expected";
            if (message.blockHeight != null && message.hasOwnProperty("blockHeight"))
                if (!$util.isInteger(message.blockHeight) && !(message.blockHeight && $util.isInteger(message.blockHeight.low) && $util.isInteger(message.blockHeight.high)))
                    return "blockHeight: integer|Long expected";
            if (message.merkleRoot != null && message.hasOwnProperty("merkleRoot"))
                if (!$util.isString(message.merkleRoot))
                    return "merkleRoot: string expected";
            if (message.previousHeader != null && message.hasOwnProperty("previousHeader"))
                if (!$util.isString(message.previousHeader))
                    return "previousHeader: string expected";
            return null;
        };

        /**
         * Creates a BlockHeader message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.BlockHeader
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.BlockHeader} BlockHeader
         */
        BlockHeader.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.BlockHeader)
                return object;
            let message = new $root.pb.BlockHeader();
            if (object.timestamp != null)
                message.timestamp = String(object.timestamp);
            if (object.blockHeight != null)
                if ($util.Long)
                    (message.blockHeight = $util.Long.fromValue(object.blockHeight)).unsigned = true;
                else if (typeof object.blockHeight === "string")
                    message.blockHeight = parseInt(object.blockHeight, 10);
                else if (typeof object.blockHeight === "number")
                    message.blockHeight = object.blockHeight;
                else if (typeof object.blockHeight === "object")
                    message.blockHeight = new $util.LongBits(object.blockHeight.low >>> 0, object.blockHeight.high >>> 0).toNumber(true);
            if (object.merkleRoot != null)
                message.merkleRoot = String(object.merkleRoot);
            if (object.previousHeader != null)
                message.previousHeader = String(object.previousHeader);
            return message;
        };

        /**
         * Creates a plain object from a BlockHeader message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.BlockHeader
         * @static
         * @param {pb.BlockHeader} message BlockHeader
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BlockHeader.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.timestamp = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.blockHeight = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.blockHeight = options.longs === String ? "0" : 0;
                object.merkleRoot = "";
                object.previousHeader = "";
            }
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                object.timestamp = message.timestamp;
            if (message.blockHeight != null && message.hasOwnProperty("blockHeight"))
                if (typeof message.blockHeight === "number")
                    object.blockHeight = options.longs === String ? String(message.blockHeight) : message.blockHeight;
                else
                    object.blockHeight = options.longs === String ? $util.Long.prototype.toString.call(message.blockHeight) : options.longs === Number ? new $util.LongBits(message.blockHeight.low >>> 0, message.blockHeight.high >>> 0).toNumber(true) : message.blockHeight;
            if (message.merkleRoot != null && message.hasOwnProperty("merkleRoot"))
                object.merkleRoot = message.merkleRoot;
            if (message.previousHeader != null && message.hasOwnProperty("previousHeader"))
                object.previousHeader = message.previousHeader;
            return object;
        };

        /**
         * Converts this BlockHeader to JSON.
         * @function toJSON
         * @memberof pb.BlockHeader
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BlockHeader.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BlockHeader;
    })();

    return pb;
})();

export { $root as default };
