import { None, Opt, Some } from '../candid/types/constructed/opt';
import { nat64 } from '../candid/types/primitive/nats/nat64';
import { nat8 } from '../candid/types/primitive/nats/nat8';
import { stableJson } from './stable_json';

export interface Serializable {
    toBytes: (data: any) => Uint8Array;
    fromBytes: (bytes: Uint8Array) => any;
}

export function StableBTreeMap<Key = any, Value = any>(
    memoryIdNumber: nat8,
    keySerializable: Serializable = stableJson,
    valueSerializable: Serializable = stableJson
) {
    const memoryId = memoryIdNumber.toString();

    if (
        globalThis._azleIc !== undefined &&
        globalThis._azleWasmtimeCandidEnvironment !== true
    ) {
        globalThis._azleIc.stableBTreeMapInit(memoryId);
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
            if (globalThis._azleIc === undefined) {
                return undefined as any;
            }

            const encodedKey = keySerializable.toBytes(key).buffer;

            return globalThis._azleIc.stableBTreeMapContainsKey(
                memoryId,
                encodedKey
            );
        },
        /**
         * Retrieves the value stored at the provided key.
         * @param key the location from which to retrieve.
         * @returns the value associated with the given key, if it exists.
         */
        get(key: Key): Opt<Value> {
            if (globalThis._azleIc === undefined) {
                return undefined as any;
            }

            const encodedKey = keySerializable.toBytes(key).buffer;

            const encodedResult = globalThis._azleIc.stableBTreeMapGet(
                memoryId,
                encodedKey
            );

            if (encodedResult === undefined) {
                return None;
            } else {
                return Some(
                    valueSerializable.fromBytes(new Uint8Array(encodedResult))
                );
            }
        },
        /**
         * Inserts a value into the map at the provided key.
         * @param key the location at which to insert.
         * @param value the value to insert.
         * @returns the previous value of the key, if present.
         */
        insert(key: Key, value: Value): Opt<Value> {
            if (globalThis._azleIc === undefined) {
                return undefined as any;
            }

            const encodedKey = keySerializable.toBytes(key).buffer;
            const encodedValue = valueSerializable.toBytes(value).buffer;

            const encodedResult = globalThis._azleIc.stableBTreeMapInsert(
                memoryId,
                encodedKey,
                encodedValue
            );

            if (encodedResult === undefined) {
                return None;
            } else {
                return Some(
                    valueSerializable.fromBytes(new Uint8Array(encodedResult))
                );
            }
        },
        /**
         * Checks if the map is empty.
         * @returns `true` if the map contains no elements, `false` otherwise.
         */
        isEmpty(): boolean {
            if (globalThis._azleIc === undefined) {
                return undefined as any;
            }

            return globalThis._azleIc.stableBTreeMapIsEmpty(memoryId);
        },
        /**
         * Retrieves the items in the map in sorted order.
         * @param startIndex the starting index to begin retrieval
         * @param length the number of items to retrieve
         * @returns tuples representing key/value pairs.
         */
        items(startIndex?: number, length?: number): [Key, Value][] {
            if (globalThis._azleIc === undefined) {
                return undefined as any;
            }

            const encodedItems = globalThis._azleIc.stableBTreeMapItems(
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
            if (globalThis._azleIc === undefined) {
                return undefined as any;
            }

            const encodedKeys = globalThis._azleIc.stableBTreeMapKeys(
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
        len(): nat64 {
            if (globalThis._azleIc === undefined) {
                return undefined as any;
            }

            return BigInt(globalThis._azleIc.stableBTreeMapLen(memoryId));
        },
        /**
         * Removes a key from the map.
         * @param key the location from which to remove.
         * @returns the previous value at the key if it exists, `null` otherwise.
         */
        remove(key: Key): Opt<Value> {
            if (globalThis._azleIc === undefined) {
                return undefined as any;
            }

            const encodedKey = keySerializable.toBytes(key).buffer;

            const encodedValue = globalThis._azleIc.stableBTreeMapRemove(
                memoryId,
                encodedKey
            );

            if (encodedValue === undefined) {
                return None;
            } else {
                return Some(
                    valueSerializable.fromBytes(new Uint8Array(encodedValue))
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
            if (globalThis._azleIc === undefined) {
                return undefined as any;
            }

            const encodedValues = globalThis._azleIc.stableBTreeMapValues(
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
