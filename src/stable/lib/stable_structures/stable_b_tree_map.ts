import { stableJson } from '#lib/stable_structures/stable_json';

import { validateUnsignedInteger } from '../error';

/**
 * Interface used by `StableBTreeMap` to store and retrieve keys and values as bytes in stable memory.
 *
 * @remarks
 *
 * The interface describes an object that can serialize/deserialize data to/from bytes.
 *
 * `StableBTreeMap` uses a default `Serializable` called `stableJson`, which serializes data to/from ICP-enabled JSON bytes.
 *
 * You can provide your own `Serializable` implementations for keys or values to store data in different formats.
 */
export interface Serializable {
    toBytes: (data: any) => Uint8Array;
    fromBytes: (bytes: Uint8Array) => any;
}

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
export class StableBTreeMap<Key = any, Value = any> {
    memoryId: number;
    keySerializable: Serializable;
    valueSerializable: Serializable;

    constructor(
        memoryId: number,
        keySerializable: Serializable = stableJson,
        valueSerializable: Serializable = stableJson
    ) {
        if (memoryId < 0) {
            throw new Error('StableBTreeMap memoryId cannot be negative');
        }

        if (memoryId > 253) {
            throw new Error(
                'StableBTreeMap memoryId cannot be greater than 253 (memoryId 254 and 255 are reserved by Azle and ic-stable-structures respectively'
            );
        }

        this.memoryId = memoryId;
        this.keySerializable = keySerializable;
        this.valueSerializable = valueSerializable;

        if (globalThis._azleNodeWasmEnvironment !== true) {
            if (globalThis._azleIcExperimental !== undefined) {
                globalThis._azleIcExperimental.stableBTreeMapInit(
                    memoryId.toString()
                );
            }

            if (globalThis._azleIcStable !== undefined) {
                globalThis._azleIcStable.stableBTreeMapInit(memoryId);
            }
        }
    }

    /**
     * Checks if the given key exists in the map.
     *
     * @param key - The key to check
     * @returns `true` if the key exists in the map, `false` otherwise
     */
    containsKey(key: Key): boolean {
        if (
            globalThis._azleIcStable === undefined &&
            globalThis._azleIcExperimental === undefined
        ) {
            return undefined as any;
        }

        const encodedKey = this.keySerializable.toBytes(key);

        if (globalThis._azleIcExperimental !== undefined) {
            return globalThis._azleIcExperimental.stableBTreeMapContainsKey(
                this.memoryId.toString(),
                encodedKey.buffer instanceof ArrayBuffer
                    ? encodedKey.buffer
                    : new Uint8Array(encodedKey).buffer
            );
        }

        if (globalThis._azleIcStable !== undefined) {
            return globalThis._azleIcStable.stableBTreeMapContainsKey(
                this.memoryId,
                encodedKey
            );
        }

        throw new Error(
            'Neither globalThis._azleIcStable nor globalThis._azleIcExperimental are defined'
        );
    }

    /**
     * Retrieves the value stored at the provided key if it exists.
     *
     * @param key - The key whose value will be retrieved
     * @returns The value associated with the key, or undefined if the key doesn't exist
     */
    get(key: Key): Value | undefined {
        if (
            globalThis._azleIcStable === undefined &&
            globalThis._azleIcExperimental === undefined
        ) {
            return undefined;
        }

        const encodedKey = this.keySerializable.toBytes(key);

        const encodedResult =
            globalThis._azleIcExperimental !== undefined
                ? globalThis._azleIcExperimental.stableBTreeMapGet(
                      this.memoryId.toString(),
                      encodedKey.buffer instanceof ArrayBuffer
                          ? encodedKey.buffer
                          : new Uint8Array(encodedKey).buffer
                  )
                : globalThis._azleIcStable !== undefined
                  ? globalThis._azleIcStable.stableBTreeMapGet(
                        this.memoryId,
                        encodedKey
                    )
                  : ((): never => {
                        throw new Error(
                            'Neither globalThis._azleIcStable nor globalThis._azleIcExperimental are defined'
                        );
                    })();

        if (encodedResult === undefined) {
            return encodedResult;
        } else {
            return this.valueSerializable.fromBytes(
                encodedResult instanceof Uint8Array
                    ? encodedResult
                    : new Uint8Array(encodedResult)
            );
        }
    }

    /**
     * Inserts a value into the map at the provided key.
     * If the key already exists, its value is updated.
     *
     * @param key - The key at which to store the value
     * @param value - The value to store
     *
     * @returns The previous value at the key if it existed, undefined otherwise
     */
    insert(key: Key, value: Value): Value | undefined {
        if (
            globalThis._azleIcStable === undefined &&
            globalThis._azleIcExperimental === undefined
        ) {
            return undefined;
        }

        const encodedKey = this.keySerializable.toBytes(key);
        const encodedValue = this.valueSerializable.toBytes(value);

        const encodedResult =
            globalThis._azleIcExperimental !== undefined
                ? globalThis._azleIcExperimental.stableBTreeMapInsert(
                      this.memoryId.toString(),
                      encodedKey.buffer instanceof ArrayBuffer
                          ? encodedKey.buffer
                          : new Uint8Array(encodedKey).buffer,
                      encodedValue.buffer instanceof ArrayBuffer
                          ? encodedValue.buffer
                          : new Uint8Array(encodedValue).buffer
                  )
                : globalThis._azleIcStable !== undefined
                  ? globalThis._azleIcStable.stableBTreeMapInsert(
                        this.memoryId,
                        encodedKey,
                        encodedValue
                    )
                  : ((): never => {
                        throw new Error(
                            'Neither globalThis._azleIcStable nor globalThis._azleIcExperimental are defined'
                        );
                    })();

        if (encodedResult === undefined) {
            return encodedResult;
        } else {
            return this.valueSerializable.fromBytes(
                encodedResult instanceof Uint8Array
                    ? encodedResult
                    : new Uint8Array(encodedResult)
            );
        }
    }

    /**
     * Checks if the map is empty.
     *
     * @returns `true` if the map contains no elements, `false` otherwise
     */
    isEmpty(): boolean {
        if (
            globalThis._azleIcStable === undefined &&
            globalThis._azleIcExperimental === undefined
        ) {
            return undefined as any;
        }

        if (globalThis._azleIcExperimental !== undefined) {
            return globalThis._azleIcExperimental.stableBTreeMapIsEmpty(
                this.memoryId.toString()
            );
        }

        if (globalThis._azleIcStable !== undefined) {
            return globalThis._azleIcStable.stableBTreeMapIsEmpty(
                this.memoryId
            );
        }

        throw new Error(
            'Neither globalThis._azleIcStable nor globalThis._azleIcExperimental are defined'
        );
    }

    /**
     * Retrieves the items in the map in byte-level (not based on the JavaScript runtime value) sorted order by key.
     *
     * @param startIndex - Optional index at which to start retrieving items (inclusive). Represented as a u32 (max size 2^32 - 1)
     * @param length - Optional maximum number of items to retrieve. Represented as a u32 (max size 2^32 - 1)
     *
     * @returns Array of key-value pair tuples, in byte-level (not based on the JavaScript runtime value) sorted order by key
     */
    items(startIndex?: number, length?: number): [Key, Value][] {
        if (
            globalThis._azleIcStable === undefined &&
            globalThis._azleIcExperimental === undefined
        ) {
            return undefined as any;
        }

        if (startIndex !== undefined) {
            validateUnsignedInteger(
                'StableBTreeMap.items startIndex',
                32,
                startIndex
            );
        }

        if (length !== undefined) {
            validateUnsignedInteger('StableBTreeMap.items length', 32, length);
        }

        const encodedItems =
            globalThis._azleIcExperimental !== undefined
                ? globalThis._azleIcExperimental.stableBTreeMapItems(
                      this.memoryId.toString(),
                      startIndex?.toString() ?? '0',
                      length?.toString() ?? 'NOT_SET'
                  )
                : globalThis._azleIcStable !== undefined
                  ? globalThis._azleIcStable.stableBTreeMapItems(
                        this.memoryId,
                        startIndex,
                        length
                    )
                  : ((): never => {
                        throw new Error(
                            'Neither globalThis._azleIcStable nor globalThis._azleIcExperimental are defined'
                        );
                    })();

        return encodedItems.map(([encodedKey, encodedValue]) => {
            return [
                this.keySerializable.fromBytes(
                    encodedKey instanceof Uint8Array
                        ? encodedKey
                        : new Uint8Array(encodedKey)
                ),
                this.valueSerializable.fromBytes(
                    encodedValue instanceof Uint8Array
                        ? encodedValue
                        : new Uint8Array(encodedValue)
                )
            ];
        });
    }

    /**
     * Retrieves the keys in the map in byte-level (not based on the JavaScript runtime value) sorted order.
     *
     * @param startIndex - Optional index at which to start retrieving keys (inclusive). Represented as a u32 (max size 2^32 - 1)
     * @param length - Optional maximum number of keys to retrieve. Represented as a u32 (max size 2^32 - 1)
     *
     * @returns Array of keys in byte-level (not based on the JavaScript runtime value) sorted order
     */
    keys(startIndex?: number, length?: number): Key[] {
        if (
            globalThis._azleIcStable === undefined &&
            globalThis._azleIcExperimental === undefined
        ) {
            return undefined as any;
        }

        if (startIndex !== undefined) {
            validateUnsignedInteger(
                'StableBTreeMap.keys startIndex',
                32,
                startIndex
            );
        }

        if (length !== undefined) {
            validateUnsignedInteger('StableBTreeMap.keys length', 32, length);
        }

        const encodedKeys =
            globalThis._azleIcExperimental !== undefined
                ? globalThis._azleIcExperimental.stableBTreeMapKeys(
                      this.memoryId.toString(),
                      startIndex?.toString() ?? '0',
                      length?.toString() ?? 'NOT_SET'
                  )
                : globalThis._azleIcStable !== undefined
                  ? globalThis._azleIcStable.stableBTreeMapKeys(
                        this.memoryId,
                        startIndex,
                        length
                    )
                  : ((): never => {
                        throw new Error(
                            'Neither globalThis._azleIcStable nor globalThis._azleIcExperimental are defined'
                        );
                    })();

        return encodedKeys.map((encodedKey) => {
            return this.keySerializable.fromBytes(
                encodedKey instanceof Uint8Array
                    ? encodedKey
                    : new Uint8Array(encodedKey)
            );
        });
    }

    /**
     * Returns the number of key-value pairs in the map.
     *
     * @returns The number of key-value pairs in the map. Represented as a u32 (max size 2^32 - 1)
     */
    len(): number {
        if (
            globalThis._azleIcStable === undefined &&
            globalThis._azleIcExperimental === undefined
        ) {
            return undefined as any;
        }

        if (globalThis._azleIcExperimental !== undefined) {
            return Number(
                globalThis._azleIcExperimental.stableBTreeMapLen(
                    this.memoryId.toString()
                )
            );
        }

        if (globalThis._azleIcStable !== undefined) {
            return globalThis._azleIcStable.stableBTreeMapLen(this.memoryId);
        }

        throw new Error(
            'Neither globalThis._azleIcStable nor globalThis._azleIcExperimental are defined'
        );
    }

    /**
     * Removes a key and its associated value from the map.
     *
     * @param key - The key to remove
     * @returns The value that was associated with the key, or undefined if the key didn't exist
     */
    remove(key: Key): Value | undefined {
        if (
            globalThis._azleIcStable === undefined &&
            globalThis._azleIcExperimental === undefined
        ) {
            return undefined;
        }

        const encodedKey = this.keySerializable.toBytes(key);

        const encodedValue =
            globalThis._azleIcExperimental !== undefined
                ? globalThis._azleIcExperimental.stableBTreeMapRemove(
                      this.memoryId.toString(),
                      encodedKey.buffer instanceof ArrayBuffer
                          ? encodedKey.buffer
                          : new Uint8Array(encodedKey).buffer
                  )
                : globalThis._azleIcStable !== undefined
                  ? globalThis._azleIcStable.stableBTreeMapRemove(
                        this.memoryId,
                        encodedKey
                    )
                  : ((): never => {
                        throw new Error(
                            'Neither globalThis._azleIcStable nor globalThis._azleIcExperimental are defined'
                        );
                    })();

        if (encodedValue === undefined) {
            return undefined;
        } else {
            return this.valueSerializable.fromBytes(
                encodedValue instanceof Uint8Array
                    ? encodedValue
                    : new Uint8Array(encodedValue)
            );
        }
    }

    /**
     * Retrieves the values in the map in byte-level (not based on the JavaScript runtime value) sorted order by key.
     *
     * @param startIndex - Optional index at which to start retrieving values (inclusive). Represented as a u32 (max size 2^32 - 1)
     * @param length - Optional maximum number of values to retrieve. Represented as a u32 (max size 2^32 - 1)
     * @returns Array of values, in byte-level (not based on the JavaScript runtime value) sorted order by key
     */
    values(startIndex?: number, length?: number): Value[] {
        if (
            globalThis._azleIcStable === undefined &&
            globalThis._azleIcExperimental === undefined
        ) {
            return undefined as any;
        }

        if (startIndex !== undefined) {
            validateUnsignedInteger(
                'StableBTreeMap.values startIndex',
                32,
                startIndex
            );
        }

        if (length !== undefined) {
            validateUnsignedInteger('StableBTreeMap.values length', 32, length);
        }

        const encodedValues =
            globalThis._azleIcExperimental !== undefined
                ? globalThis._azleIcExperimental.stableBTreeMapValues(
                      this.memoryId.toString(),
                      startIndex?.toString() ?? '0',
                      length?.toString() ?? 'NOT_SET'
                  )
                : globalThis._azleIcStable !== undefined
                  ? globalThis._azleIcStable.stableBTreeMapValues(
                        this.memoryId,
                        startIndex,
                        length
                    )
                  : ((): never => {
                        throw new Error(
                            'Neither globalThis._azleIcStable nor globalThis._azleIcExperimental are defined'
                        );
                    })();

        return encodedValues.map((encodedValue) => {
            return this.valueSerializable.fromBytes(
                encodedValue instanceof Uint8Array
                    ? encodedValue
                    : new Uint8Array(encodedValue)
            );
        });
    }
}
