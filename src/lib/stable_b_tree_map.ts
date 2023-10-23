import { TypeMapping } from './candid';
import { None, Opt, Some } from './candid/types/constructed/opt';
import { nat64 } from './candid/types/primitive/nats/nat64';
import { nat8 } from './candid/types/primitive/nats/nat8';
import { encode, decode } from './candid/serde';

// TODO we should probably try to make it work with bigint, Principal, etc
// TODO out of the box
// TODO we probably need to allow the user to pass in their own encoding/decoding for Json as well
// TODO we need a way to make the types good in TypeMapping
export class StableJson {
    static toBytes(data: any): Uint8Array {
        return Uint8Array.from(Buffer.from(JSON.stringify(data)));
    }

    static fromBytes(bytes: Uint8Array): any {
        return JSON.parse(Buffer.from(bytes).toString());
    }
}

export interface Serializable {
    toBytes: (data: any) => Uint8Array;
    fromBytes: (bytes: Uint8Array) => any;
}

export function StableBTreeMap<
    Key extends Partial<Serializable>,
    Value extends Partial<Serializable>
>(keyType: Key, valueType: Value, memoryId: nat8) {
    // TODO we don't really need to candid encode this, it's just a number
    const candidEncodedMemoryId = encode(nat8, memoryId).buffer;

    if (globalThis._azleIc !== undefined) {
        globalThis._azleIc.stableBTreeMapInit(candidEncodedMemoryId);
    }

    isSerializable(keyType);
    isSerializable(valueType);

    return {
        /**
         * Checks if the given key exists in the map.
         * @param key the key to check.
         * @returns `true` if the key exists in the map, `false` otherwise.
         */
        containsKey(key: TypeMapping<Key>): boolean {
            if (globalThis._azleIc === undefined) {
                return undefined as any;
            }

            const encodedKey = keyType.toBytes(key).buffer;

            return globalThis._azleIc.stableBTreeMapContainsKey(
                candidEncodedMemoryId,
                encodedKey
            );
        },
        /**
         * Retrieves the value stored at the provided key.
         * @param key the location from which to retrieve.
         * @returns the value associated with the given key, if it exists.
         */
        get(key: TypeMapping<Key>): Opt<TypeMapping<Value>> {
            if (globalThis._azleIc === undefined) {
                return undefined as any;
            }

            const encodedKey = keyType.toBytes(key).buffer;

            const encodedResult = globalThis._azleIc.stableBTreeMapGet(
                candidEncodedMemoryId,
                encodedKey
            );

            if (encodedResult === undefined) {
                return None;
            } else {
                return Some(valueType.fromBytes(new Uint8Array(encodedResult)));
            }
        },
        /**
         * Inserts a value into the map at the provided key.
         * @param key the location at which to insert.
         * @param value the value to insert.
         * @returns the previous value of the key, if present.
         */
        insert(
            key: TypeMapping<Key>,
            value: TypeMapping<Value>
        ): Opt<TypeMapping<Value>> {
            if (globalThis._azleIc === undefined) {
                return undefined as any;
            }

            const encodedKey = keyType.toBytes(key).buffer;
            const encodedValue = valueType.toBytes(value).buffer;

            const encodedResult = globalThis._azleIc.stableBTreeMapInsert(
                candidEncodedMemoryId,
                encodedKey,
                encodedValue
            );

            if (encodedResult === undefined) {
                return None;
            } else {
                return Some(valueType.fromBytes(new Uint8Array(encodedResult)));
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

            return globalThis._azleIc.stableBTreeMapIsEmpty(
                candidEncodedMemoryId
            );
        },
        /**
         * Retrieves the items in the map in sorted order.
         * @returns tuples representing key/value pairs.
         */
        items(): [TypeMapping<Key>, TypeMapping<Value>][] {
            if (globalThis._azleIc === undefined) {
                return undefined as any;
            }

            const encodedItems = globalThis._azleIc.stableBTreeMapItems(
                candidEncodedMemoryId
            );

            // TODO too much copying
            return encodedItems.map(([encodedKey, encodedValue]) => {
                return [
                    keyType.fromBytes(new Uint8Array(encodedKey)),
                    valueType.fromBytes(new Uint8Array(encodedValue))
                ];
            });
        },
        /**
         * The keys for each element in the map in sorted order.
         * @returns they keys in the map.
         */
        keys(): TypeMapping<Key>[] {
            if (globalThis._azleIc === undefined) {
                return undefined as any;
            }

            const encodedKeys = globalThis._azleIc.stableBTreeMapKeys(
                candidEncodedMemoryId
            );

            // TODO too much copying
            return encodedKeys.map((encodedKey) => {
                return keyType.fromBytes(new Uint8Array(encodedKey));
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

            const candidEncodedLen = globalThis._azleIc.stableBTreeMapLen(
                candidEncodedMemoryId
            );

            return decode(nat64, candidEncodedLen);
        },
        /**
         * Removes a key from the map.
         * @param key the location from which to remove.
         * @returns the previous value at the key if it exists, `null` otherwise.
         */
        remove(key: TypeMapping<Key>): Opt<TypeMapping<Value>> {
            if (globalThis._azleIc === undefined) {
                return undefined as any;
            }

            const encodedKey = keyType.toBytes(key).buffer;

            const encodedValue = globalThis._azleIc.stableBTreeMapRemove(
                candidEncodedMemoryId,
                encodedKey
            );

            if (encodedValue === undefined) {
                return None;
            } else {
                return Some(valueType.fromBytes(new Uint8Array(encodedValue)));
            }
        },
        /**
         * The values in the map in sorted order.
         * @returns the values in the map.
         */
        values(): TypeMapping<Value>[] {
            if (globalThis._azleIc === undefined) {
                return undefined as any;
            }

            const encodedValues = globalThis._azleIc.stableBTreeMapValues(
                candidEncodedMemoryId
            );

            // TODO too much copying
            return encodedValues.map((encodedValue) => {
                return valueType.fromBytes(new Uint8Array(encodedValue));
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
