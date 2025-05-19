"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StableBTreeMap = void 0;
var stable_json_1 = require("#lib/stable_structures/stable_json");
var error_1 = require("../error");
/**
 * Provides a `BTreeMap` implementation backed by stable memory that automatically persists across canister upgrades.
 *
 * @typeParam Key - The type of keys stored in the map
 * @typeParam Value - The type of values stored in the map
 *
 * @param memoryId - Unique identifier for this map's memory. Must be a number between 0 and 253 inclusive (254 and 255 are reserved by Azle and ic-stable-structures respectively)
 * @param keySerializable - Serializable for converting keys to/from bytes. Defaults to an ICP-enabled `stableJson`
 * @param valueSerializable - Serializable for converting values to/from bytes. Defaults to an ICP-enabled `stableJson`
 *
 * @remarks
 *
 * Keys are kept in sorted order based on their serialized bytes, not based on their JavaScript runtime values.
 * This byte-level ordering is based on the default implementation for `Vec<u8>` of `Ord` and `PartialOrd` in Rust.
 *
 */
var StableBTreeMap = /** @class */ (function () {
    function StableBTreeMap(memoryId, keySerializable, valueSerializable) {
        if (keySerializable === void 0) { keySerializable = stable_json_1.stableJson; }
        if (valueSerializable === void 0) { valueSerializable = stable_json_1.stableJson; }
        if (memoryId < 0) {
            throw new Error('StableBTreeMap memoryId cannot be negative');
        }
        if (memoryId > 253) {
            throw new Error('StableBTreeMap memoryId cannot be greater than 253 (memoryId 254 and 255 are reserved by Azle and ic-stable-structures respectively');
        }
        this.memoryId = memoryId;
        this.keySerializable = keySerializable;
        this.valueSerializable = valueSerializable;
        if (globalThis._azleNodejsWasmEnvironment !== true) {
            if (globalThis._azleIcExperimental !== undefined) {
                globalThis._azleIcExperimental.stableBTreeMapInit(memoryId.toString());
            }
            if (globalThis._azleIc !== undefined) {
                globalThis._azleIc.stableBTreeMapInit(memoryId);
            }
        }
    }
    /**
     * Checks if the given key exists in the map.
     *
     * @param key - The key to check
     * @returns `true` if the key exists in the map, `false` otherwise
     */
    StableBTreeMap.prototype.containsKey = function (key) {
        if (globalThis._azleIc === undefined &&
            globalThis._azleIcExperimental === undefined) {
            return undefined;
        }
        var encodedKey = this.keySerializable.toBytes(key);
        if (globalThis._azleIcExperimental !== undefined) {
            return globalThis._azleIcExperimental.stableBTreeMapContainsKey(this.memoryId.toString(), encodedKey.buffer instanceof ArrayBuffer
                ? encodedKey.buffer
                : new Uint8Array(encodedKey).buffer);
        }
        if (globalThis._azleIc !== undefined) {
            return globalThis._azleIc.stableBTreeMapContainsKey(this.memoryId, encodedKey);
        }
        throw new Error('Neither globalThis._azleIc nor globalThis._azleIcExperimental are defined');
    };
    /**
     * Retrieves the value stored at the provided key if it exists.
     *
     * @param key - The key whose value will be retrieved
     * @returns The value associated with the key, or undefined if the key doesn't exist
     */
    StableBTreeMap.prototype.get = function (key) {
        if (globalThis._azleIc === undefined &&
            globalThis._azleIcExperimental === undefined) {
            return undefined;
        }
        var encodedKey = this.keySerializable.toBytes(key);
        var encodedResult = globalThis._azleIcExperimental !== undefined
            ? globalThis._azleIcExperimental.stableBTreeMapGet(this.memoryId.toString(), encodedKey.buffer instanceof ArrayBuffer
                ? encodedKey.buffer
                : new Uint8Array(encodedKey).buffer)
            : globalThis._azleIc !== undefined
                ? globalThis._azleIc.stableBTreeMapGet(this.memoryId, encodedKey)
                : (function () {
                    throw new Error('Neither globalThis._azleIc nor globalThis._azleIcExperimental are defined');
                })();
        if (encodedResult === undefined) {
            return encodedResult;
        }
        else {
            return this.valueSerializable.fromBytes(encodedResult instanceof Uint8Array
                ? encodedResult
                : new Uint8Array(encodedResult));
        }
    };
    /**
     * Inserts a value into the map at the provided key.
     * If the key already exists, its value is updated.
     *
     * @param key - The key at which to store the value
     * @param value - The value to store
     *
     * @returns The previous value at the key if it existed, undefined otherwise
     */
    StableBTreeMap.prototype.insert = function (key, value) {
        if (globalThis._azleIc === undefined &&
            globalThis._azleIcExperimental === undefined) {
            return undefined;
        }
        var encodedKey = this.keySerializable.toBytes(key);
        var encodedValue = this.valueSerializable.toBytes(value);
        var encodedResult = globalThis._azleIcExperimental !== undefined
            ? globalThis._azleIcExperimental.stableBTreeMapInsert(this.memoryId.toString(), encodedKey.buffer instanceof ArrayBuffer
                ? encodedKey.buffer
                : new Uint8Array(encodedKey).buffer, encodedValue.buffer instanceof ArrayBuffer
                ? encodedValue.buffer
                : new Uint8Array(encodedValue).buffer)
            : globalThis._azleIc !== undefined
                ? globalThis._azleIc.stableBTreeMapInsert(this.memoryId, encodedKey, encodedValue)
                : (function () {
                    throw new Error('Neither globalThis._azleIc nor globalThis._azleIcExperimental are defined');
                })();
        if (encodedResult === undefined) {
            return encodedResult;
        }
        else {
            return this.valueSerializable.fromBytes(encodedResult instanceof Uint8Array
                ? encodedResult
                : new Uint8Array(encodedResult));
        }
    };
    /**
     * Checks if the map is empty.
     *
     * @returns `true` if the map contains no elements, `false` otherwise
     */
    StableBTreeMap.prototype.isEmpty = function () {
        if (globalThis._azleIc === undefined &&
            globalThis._azleIcExperimental === undefined) {
            return undefined;
        }
        if (globalThis._azleIcExperimental !== undefined) {
            return globalThis._azleIcExperimental.stableBTreeMapIsEmpty(this.memoryId.toString());
        }
        if (globalThis._azleIc !== undefined) {
            return globalThis._azleIc.stableBTreeMapIsEmpty(this.memoryId);
        }
        throw new Error('Neither globalThis._azleIc nor globalThis._azleIcExperimental are defined');
    };
    /**
     * Retrieves the items in the map in byte-level (not based on the JavaScript runtime value) sorted order by key.
     *
     * @param startIndex - Optional index at which to start retrieving items (inclusive). Represented as a u32 (max size 2^32 - 1)
     * @param length - Optional maximum number of items to retrieve. Represented as a u32 (max size 2^32 - 1)
     *
     * @returns Array of key-value pair tuples, in byte-level (not based on the JavaScript runtime value) sorted order by key
     */
    StableBTreeMap.prototype.items = function (startIndex, length) {
        var _this = this;
        var _a, _b;
        if (globalThis._azleIc === undefined &&
            globalThis._azleIcExperimental === undefined) {
            return undefined;
        }
        if (startIndex !== undefined) {
            (0, error_1.validateUnsignedInteger)('StableBTreeMap.items startIndex', 32, startIndex);
        }
        if (length !== undefined) {
            (0, error_1.validateUnsignedInteger)('StableBTreeMap.items length', 32, length);
        }
        var encodedItems = globalThis._azleIcExperimental !== undefined
            ? globalThis._azleIcExperimental.stableBTreeMapItems(this.memoryId.toString(), (_a = startIndex === null || startIndex === void 0 ? void 0 : startIndex.toString()) !== null && _a !== void 0 ? _a : '0', (_b = length === null || length === void 0 ? void 0 : length.toString()) !== null && _b !== void 0 ? _b : 'NOT_SET')
            : globalThis._azleIc !== undefined
                ? globalThis._azleIc.stableBTreeMapItems(this.memoryId, startIndex, length)
                : (function () {
                    throw new Error('Neither globalThis._azleIc nor globalThis._azleIcExperimental are defined');
                })();
        return encodedItems.map(function (_a) {
            var encodedKey = _a[0], encodedValue = _a[1];
            return [
                _this.keySerializable.fromBytes(encodedKey instanceof Uint8Array
                    ? encodedKey
                    : new Uint8Array(encodedKey)),
                _this.valueSerializable.fromBytes(encodedValue instanceof Uint8Array
                    ? encodedValue
                    : new Uint8Array(encodedValue))
            ];
        });
    };
    /**
     * Retrieves the keys in the map in byte-level (not based on the JavaScript runtime value) sorted order.
     *
     * @param startIndex - Optional index at which to start retrieving keys (inclusive). Represented as a u32 (max size 2^32 - 1)
     * @param length - Optional maximum number of keys to retrieve. Represented as a u32 (max size 2^32 - 1)
     *
     * @returns Array of keys in byte-level (not based on the JavaScript runtime value) sorted order
     */
    StableBTreeMap.prototype.keys = function (startIndex, length) {
        var _this = this;
        var _a, _b;
        if (globalThis._azleIc === undefined &&
            globalThis._azleIcExperimental === undefined) {
            return undefined;
        }
        if (startIndex !== undefined) {
            (0, error_1.validateUnsignedInteger)('StableBTreeMap.keys startIndex', 32, startIndex);
        }
        if (length !== undefined) {
            (0, error_1.validateUnsignedInteger)('StableBTreeMap.keys length', 32, length);
        }
        var encodedKeys = globalThis._azleIcExperimental !== undefined
            ? globalThis._azleIcExperimental.stableBTreeMapKeys(this.memoryId.toString(), (_a = startIndex === null || startIndex === void 0 ? void 0 : startIndex.toString()) !== null && _a !== void 0 ? _a : '0', (_b = length === null || length === void 0 ? void 0 : length.toString()) !== null && _b !== void 0 ? _b : 'NOT_SET')
            : globalThis._azleIc !== undefined
                ? globalThis._azleIc.stableBTreeMapKeys(this.memoryId, startIndex, length)
                : (function () {
                    throw new Error('Neither globalThis._azleIc nor globalThis._azleIcExperimental are defined');
                })();
        return encodedKeys.map(function (encodedKey) {
            return _this.keySerializable.fromBytes(encodedKey instanceof Uint8Array
                ? encodedKey
                : new Uint8Array(encodedKey));
        });
    };
    /**
     * Returns the number of key-value pairs in the map.
     *
     * @returns The number of key-value pairs in the map. Represented as a u32 (max size 2^32 - 1)
     */
    StableBTreeMap.prototype.len = function () {
        if (globalThis._azleIc === undefined &&
            globalThis._azleIcExperimental === undefined) {
            return undefined;
        }
        if (globalThis._azleIcExperimental !== undefined) {
            return Number(globalThis._azleIcExperimental.stableBTreeMapLen(this.memoryId.toString()));
        }
        if (globalThis._azleIc !== undefined) {
            return globalThis._azleIc.stableBTreeMapLen(this.memoryId);
        }
        throw new Error('Neither globalThis._azleIc nor globalThis._azleIcExperimental are defined');
    };
    /**
     * Removes a key and its associated value from the map.
     *
     * @param key - The key to remove
     * @returns The value that was associated with the key, or undefined if the key didn't exist
     */
    StableBTreeMap.prototype.remove = function (key) {
        if (globalThis._azleIc === undefined &&
            globalThis._azleIcExperimental === undefined) {
            return undefined;
        }
        var encodedKey = this.keySerializable.toBytes(key);
        var encodedValue = globalThis._azleIcExperimental !== undefined
            ? globalThis._azleIcExperimental.stableBTreeMapRemove(this.memoryId.toString(), encodedKey.buffer instanceof ArrayBuffer
                ? encodedKey.buffer
                : new Uint8Array(encodedKey).buffer)
            : globalThis._azleIc !== undefined
                ? globalThis._azleIc.stableBTreeMapRemove(this.memoryId, encodedKey)
                : (function () {
                    throw new Error('Neither globalThis._azleIc nor globalThis._azleIcExperimental are defined');
                })();
        if (encodedValue === undefined) {
            return undefined;
        }
        else {
            return this.valueSerializable.fromBytes(encodedValue instanceof Uint8Array
                ? encodedValue
                : new Uint8Array(encodedValue));
        }
    };
    /**
     * Retrieves the values in the map in byte-level (not based on the JavaScript runtime value) sorted order by key.
     *
     * @param startIndex - Optional index at which to start retrieving values (inclusive). Represented as a u32 (max size 2^32 - 1)
     * @param length - Optional maximum number of values to retrieve. Represented as a u32 (max size 2^32 - 1)
     * @returns Array of values, in byte-level (not based on the JavaScript runtime value) sorted order by key
     */
    StableBTreeMap.prototype.values = function (startIndex, length) {
        var _this = this;
        var _a, _b;
        if (globalThis._azleIc === undefined &&
            globalThis._azleIcExperimental === undefined) {
            return undefined;
        }
        if (startIndex !== undefined) {
            (0, error_1.validateUnsignedInteger)('StableBTreeMap.values startIndex', 32, startIndex);
        }
        if (length !== undefined) {
            (0, error_1.validateUnsignedInteger)('StableBTreeMap.values length', 32, length);
        }
        var encodedValues = globalThis._azleIcExperimental !== undefined
            ? globalThis._azleIcExperimental.stableBTreeMapValues(this.memoryId.toString(), (_a = startIndex === null || startIndex === void 0 ? void 0 : startIndex.toString()) !== null && _a !== void 0 ? _a : '0', (_b = length === null || length === void 0 ? void 0 : length.toString()) !== null && _b !== void 0 ? _b : 'NOT_SET')
            : globalThis._azleIc !== undefined
                ? globalThis._azleIc.stableBTreeMapValues(this.memoryId, startIndex, length)
                : (function () {
                    throw new Error('Neither globalThis._azleIc nor globalThis._azleIcExperimental are defined');
                })();
        return encodedValues.map(function (encodedValue) {
            return _this.valueSerializable.fromBytes(encodedValue instanceof Uint8Array
                ? encodedValue
                : new Uint8Array(encodedValue));
        });
    };
    return StableBTreeMap;
}());
exports.StableBTreeMap = StableBTreeMap;
