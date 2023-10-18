import { CandidType } from './candid/candid_type';
import { TypeMapping } from './candid/type_mapping';
import { None, Opt, Some } from './candid/types/constructed/opt';
import { nat64 } from './candid/types/primitive/nats/nat64';
import { nat8 } from './candid/types/primitive/nats/nat8';
import { encode, decode } from './candid/serde';

export function StableBTreeMap<
    Key extends CandidType,
    Value extends CandidType
>(keyType: Key, valueType: Value, memoryId: nat8) {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }
    const candidEncodedMemoryId = encode(nat8, memoryId).buffer;

    globalThis._azleIc.stableBTreeMapInit(candidEncodedMemoryId);

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

            const candidEncodedMemoryId = encode(nat8, memoryId).buffer;
            const candidEncodedKey = encode(keyType, key).buffer;

            return globalThis._azleIc.stableBTreeMapContainsKey(
                candidEncodedMemoryId,
                candidEncodedKey
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

            const candidEncodedMemoryId = encode(nat8, memoryId).buffer;
            const candidEncodedKey = encode(keyType, key).buffer;

            const candidEncodedValue = globalThis._azleIc.stableBTreeMapGet(
                candidEncodedMemoryId,
                candidEncodedKey
            );

            if (candidEncodedValue === undefined) {
                return None;
            } else {
                return Some(decode(valueType, candidEncodedValue));
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

            const candidEncodedMemoryId = encode(nat8, memoryId).buffer;
            const candidEncodedKey = encode(keyType, key).buffer;
            const candidEncodedValue = encode(valueType, value).buffer;

            const candidEncodedResultValue =
                globalThis._azleIc.stableBTreeMapInsert(
                    candidEncodedMemoryId,
                    candidEncodedKey,
                    candidEncodedValue
                );

            if (candidEncodedResultValue === undefined) {
                return None;
            } else {
                return Some(decode(valueType, candidEncodedResultValue));
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

            const candidEncodedMemoryId = encode(nat8, memoryId).buffer;

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

            const candidEncodedMemoryId = encode(nat8, memoryId).buffer;

            const candidEncodedItems = globalThis._azleIc.stableBTreeMapItems(
                candidEncodedMemoryId
            );

            // TODO too much copying
            return candidEncodedItems.map((candidEncodedItem) => {
                return [
                    decode(keyType, candidEncodedItem[0]),
                    decode(valueType, candidEncodedItem[1])
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

            const candidEncodedMemoryId = encode(nat8, memoryId).buffer;

            const candidEncodedKeys = globalThis._azleIc.stableBTreeMapKeys(
                candidEncodedMemoryId
            );

            // TODO too much copying
            return candidEncodedKeys.map((candidEncodedKey) => {
                return decode(keyType, candidEncodedKey);
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

            const candidEncodedMemoryId = encode(nat8, memoryId).buffer;

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

            const candidEncodedMemoryId = encode(nat8, memoryId).buffer;
            const candidEncodedKey = encode(keyType, key).buffer;

            const candidEncodedValue = globalThis._azleIc.stableBTreeMapRemove(
                candidEncodedMemoryId,
                candidEncodedKey
            );

            if (candidEncodedValue === undefined) {
                return None;
            } else {
                return Some(decode(valueType, candidEncodedValue));
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

            const candidEncodedMemoryId = encode(nat8, memoryId).buffer;

            const candidEncodedValues = globalThis._azleIc.stableBTreeMapValues(
                candidEncodedMemoryId
            );

            // TODO too much copying
            return candidEncodedValues.map((candidEncodedValue) => {
                return decode(valueType, candidEncodedValue);
            });
        }
    };
}
