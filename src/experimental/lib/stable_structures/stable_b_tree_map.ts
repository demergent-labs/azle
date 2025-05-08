import { stableJson } from '#lib/stable_structures/stable_json';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export interface Serializable {
    toBytes: (data: any) => Uint8Array;
    fromBytes: (bytes: Uint8Array) => any;
}

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
// TODO make this function's return type explicit https://github.com/demergent-labs/azle/issues/1860
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function StableBTreeMap<Key = any, Value = any>(
    memoryIdNumber: number,
    keySerializable: Serializable = stableJson,
    valueSerializable: Serializable = stableJson
) {
    const memoryId = memoryIdNumber.toString();

    if (
        globalThis._azleIcExperimental !== undefined &&
        globalThis._azleNodejsWasmEnvironment !== true
    ) {
        globalThis._azleIcExperimental.stableBTreeMapInit(memoryId);
    }

    isSerializable(keySerializable);
    isSerializable(valueSerializable);

    return {
        /**
         * Checks if the given key exists in the map.
         * @param key the key to check.
         * @returns `true` if the key exists in the map, `false` otherwise.
         */
        containsKey(key: Key): boolean {
            if (globalThis._azleIcExperimental === undefined) {
                return undefined as any;
            }

            const encodedKey = keySerializable.toBytes(key);

            return globalThis._azleIcExperimental.stableBTreeMapContainsKey(
                memoryId,
                encodedKey.buffer instanceof ArrayBuffer
                    ? encodedKey.buffer
                    : new Uint8Array(encodedKey).buffer
            );
        },
        /**
         * Retrieves the value stored at the provided key.
         * @param key the location from which to retrieve.
         * @returns the value associated with the given key, if it exists.
         */
        get(key: Key): Value | null {
            if (globalThis._azleIcExperimental === undefined) {
                return undefined as any;
            }

            const encodedKey = keySerializable.toBytes(key);

            const encodedResult =
                globalThis._azleIcExperimental.stableBTreeMapGet(
                    memoryId,
                    encodedKey.buffer instanceof ArrayBuffer
                        ? encodedKey.buffer
                        : new Uint8Array(encodedKey).buffer
                );

            if (encodedResult === undefined) {
                return null;
            } else {
                return valueSerializable.fromBytes(
                    new Uint8Array(encodedResult)
                );
            }
        },
        /**
         * Inserts a value into the map at the provided key.
         * @param key the location at which to insert.
         * @param value the value to insert.
         * @returns the previous value of the key, if present.
         */
        insert(key: Key, value: Value): Value | null {
            if (globalThis._azleIcExperimental === undefined) {
                return undefined as any;
            }

            const encodedKey = keySerializable.toBytes(key);
            const encodedValue = valueSerializable.toBytes(value);

            const encodedResult =
                globalThis._azleIcExperimental.stableBTreeMapInsert(
                    memoryId,
                    encodedKey.buffer instanceof ArrayBuffer
                        ? encodedKey.buffer
                        : new Uint8Array(encodedKey).buffer,
                    encodedValue.buffer instanceof ArrayBuffer
                        ? encodedValue.buffer
                        : new Uint8Array(encodedValue).buffer
                );

            if (encodedResult === undefined) {
                return null;
            } else {
                return valueSerializable.fromBytes(
                    new Uint8Array(encodedResult)
                );
            }
        },
        /**
         * Checks if the map is empty.
         * @returns `true` if the map contains no elements, `false` otherwise.
         */
        isEmpty(): boolean {
            if (globalThis._azleIcExperimental === undefined) {
                return undefined as any;
            }

            return globalThis._azleIcExperimental.stableBTreeMapIsEmpty(
                memoryId
            );
        },
        /**
         * Retrieves the items in the map in sorted order.
         * @param startIndex the starting index to begin retrieval
         * @param length the number of items to retrieve
         * @returns tuples representing key/value pairs.
         */
        items(startIndex?: number, length?: number): [Key, Value][] {
            if (globalThis._azleIcExperimental === undefined) {
                return undefined as any;
            }

            const encodedItems =
                globalThis._azleIcExperimental.stableBTreeMapItems(
                    memoryId,
                    startIndex?.toString() ?? '0',
                    length?.toString() ?? 'NOT_SET'
                );

            // TODO too much copying
            return encodedItems.map(([encodedKey, encodedValue]) => {
                return [
                    keySerializable.fromBytes(new Uint8Array(encodedKey)),
                    valueSerializable.fromBytes(new Uint8Array(encodedValue))
                ];
            });
        },
        /**
         * The keys for each element in the map in sorted order.
         * @param startIndex the starting index to begin retrieval
         * @param length the number of keys to retrieve
         * @returns they keys in the map.
         */
        keys(startIndex?: number, length?: number): Key[] {
            if (globalThis._azleIcExperimental === undefined) {
                return undefined as any;
            }

            const encodedKeys =
                globalThis._azleIcExperimental.stableBTreeMapKeys(
                    memoryId,
                    startIndex?.toString() ?? '0',
                    length?.toString() ?? 'NOT_SET'
                );

            // TODO too much copying
            return encodedKeys.map((encodedKey) => {
                return keySerializable.fromBytes(new Uint8Array(encodedKey));
            });
        },
        /**
         * Checks to see how many elements are in the map.
         * @returns the number of elements in the map.
         */
        len(): number {
            if (globalThis._azleIcExperimental === undefined) {
                return undefined as any;
            }

            return Number(
                globalThis._azleIcExperimental.stableBTreeMapLen(memoryId)
            );
        },
        /**
         * Removes a key from the map.
         * @param key the location from which to remove.
         * @returns the previous value at the key if it exists, `null` otherwise.
         */
        remove(key: Key): Value | null {
            if (globalThis._azleIcExperimental === undefined) {
                return undefined as any;
            }

            const encodedKey = keySerializable.toBytes(key);

            const encodedValue =
                globalThis._azleIcExperimental.stableBTreeMapRemove(
                    memoryId,
                    encodedKey.buffer instanceof ArrayBuffer
                        ? encodedKey.buffer
                        : new Uint8Array(encodedKey).buffer
                );

            if (encodedValue === undefined) {
                return null;
            } else {
                return valueSerializable.fromBytes(
                    new Uint8Array(encodedValue)
                );
            }
        },
        /**
         * The values in the map in sorted order.
         * @param startIndex the starting index to begin retrieval
         * @param length the number of values to retrieve
         * @returns the values in the map.
         */
        values(startIndex?: number, length?: number): Value[] {
            if (globalThis._azleIcExperimental === undefined) {
                return undefined as any;
            }

            const encodedValues =
                globalThis._azleIcExperimental.stableBTreeMapValues(
                    memoryId,
                    startIndex?.toString() ?? '0',
                    length?.toString() ?? 'NOT_SET'
                );

            // TODO too much copying
            return encodedValues.map((encodedValue) => {
                return valueSerializable.fromBytes(
                    new Uint8Array(encodedValue)
                );
            });
        }
    };
}

function isSerializable(obj: any): asserts obj is Serializable {
    if (obj.toBytes === undefined) {
        throw new Error(`value must have a toBytes method`);
    }

    if (obj.fromBytes === undefined) {
        throw new Error(`value must have a fromBytes method`);
    }
}
