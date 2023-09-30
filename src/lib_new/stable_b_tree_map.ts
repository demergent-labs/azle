import { CandidType, None, Some, TypeMapping } from '../lib_functional';
import { IDL, nat8, nat64, Opt } from './index';
import { CandidClass, toIDLType } from './utils';
import { DecodeVisitor, EncodeVisitor } from './visitors/encode_decode';

function visitAndEncode<T>(fakeIdl: CandidClass, data: T): Uint8Array {
    const realIDL = toIDLType(fakeIdl, []);

    const encodeReadyKey = realIDL.accept(new EncodeVisitor(), {
        js_class: fakeIdl,
        js_data: data
    });

    return new Uint8Array(IDL.encode([realIDL], [encodeReadyKey]));
}

function decodeAndVisit<T>(fakeIdl: CandidClass, data: ArrayBuffer): any {
    const realIDL = toIDLType(fakeIdl, []);

    const candidDecodedValue = IDL.decode([realIDL], data)[0] as any;

    return realIDL.accept(new DecodeVisitor(), {
        js_class: fakeIdl,
        js_data: candidDecodedValue
    });
}

export function StableBTreeMap<
    Key extends CandidType,
    Value extends CandidType
>(keyType: Key, valueType: Value, memoryId: nat8) {
    const keyIdl = toIDLType(keyType, []);
    const valueIdl = toIDLType(valueType, []);

    const candidEncodedMemoryId = new Uint8Array(
        IDL.encode([IDL.Nat8], [memoryId])
    ).buffer;

    if ((globalThis as any)._azleIc !== undefined) {
        (globalThis as any)._azleIc.stableBTreeMapInit(candidEncodedMemoryId);
    }

    return {
        /**
         * Checks if the given key exists in the map.
         * @param key the key to check.
         * @returns `true` if the key exists in the map, `false` otherwise.
         */
        containsKey(key: TypeMapping<Key>): boolean {
            const candidEncodedMemoryId = visitAndEncode(
                IDL.Nat8,
                memoryId
            ).buffer;
            const candidEncodedKey = visitAndEncode(keyType, key).buffer;

            return (globalThis as any)._azleIc.stableBTreeMapContainsKey(
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
            const candidEncodedMemoryId = visitAndEncode(
                IDL.Nat8,
                memoryId
            ).buffer;
            const candidEncodedKey = visitAndEncode(keyType, key).buffer;

            const candidEncodedValue = (
                globalThis as any
            )._azleIc.stableBTreeMapGet(
                candidEncodedMemoryId,
                candidEncodedKey
            );

            if (candidEncodedValue === undefined) {
                return None;
            } else {
                return Some(decodeAndVisit(valueType, candidEncodedValue));
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
            const candidEncodedMemoryId = visitAndEncode(
                IDL.Nat8,
                memoryId
            ).buffer;
            const candidEncodedKey = visitAndEncode(keyType, key).buffer;
            const candidEncodedValue = visitAndEncode(valueType, value).buffer;

            const candidEncodedResultValue = (
                globalThis as any
            )._azleIc.stableBTreeMapInsert(
                candidEncodedMemoryId,
                candidEncodedKey,
                candidEncodedValue
            );

            if (candidEncodedResultValue === undefined) {
                return None;
            } else {
                return Some(
                    decodeAndVisit(valueType, candidEncodedResultValue)
                );
            }
        },
        /**
         * Checks if the map is empty.
         * @returns `true` if the map contains no elements, `false` otherwise.
         */
        isEmpty(): boolean {
            const candidEncodedMemoryId = visitAndEncode(
                IDL.Nat8,
                memoryId
            ).buffer;

            return (globalThis as any)._azleIc.stableBTreeMapIsEmpty(
                candidEncodedMemoryId
            );
        },
        /**
         * Retrieves the items in the map in sorted order.
         * @returns tuples representing key/value pairs.
         */
        items(): [TypeMapping<Key>, TypeMapping<Value>][] {
            const candidEncodedMemoryId = visitAndEncode(
                IDL.Nat8,
                memoryId
            ).buffer;

            const candidEncodedItems = (
                globalThis as any
            )._azleIc.stableBTreeMapItems(candidEncodedMemoryId);

            // TODO too much copying
            return candidEncodedItems.map((candidEncodedItem: any) => {
                return [
                    decodeAndVisit(keyType, candidEncodedItem[0]),
                    decodeAndVisit(valueType, candidEncodedItem[1])
                ];
            });
        },
        /**
         * The keys for each element in the map in sorted order.
         * @returns they keys in the map.
         */
        keys(): TypeMapping<Key>[] {
            const candidEncodedMemoryId = visitAndEncode(
                IDL.Nat8,
                memoryId
            ).buffer;

            const candidEncodedKeys = (
                globalThis as any
            )._azleIc.stableBTreeMapKeys(candidEncodedMemoryId);

            // TODO too much copying
            return candidEncodedKeys.map((candidEncodedKey: any) => {
                return decodeAndVisit(keyType, candidEncodedKey);
            });
        },
        /**
         * Checks to see how many elements are in the map.
         * @returns the number of elements in the map.
         */
        len(): nat64 {
            const candidEncodedMemoryId = visitAndEncode(
                IDL.Nat8,
                memoryId
            ).buffer;

            const candidEncodedLen = (
                globalThis as any
            )._azleIc.stableBTreeMapLen(candidEncodedMemoryId);

            return decodeAndVisit(IDL.Nat64, candidEncodedLen);
        },
        /**
         * Removes a key from the map.
         * @param key the location from which to remove.
         * @returns the previous value at the key if it exists, `null` otherwise.
         */
        remove(key: TypeMapping<Key>): Opt<TypeMapping<Value>> {
            const candidEncodedMemoryId = visitAndEncode(
                IDL.Nat8,
                memoryId
            ).buffer;
            const candidEncodedKey = visitAndEncode(keyType, key).buffer;

            const candidEncodedValue = (
                globalThis as any
            )._azleIc.stableBTreeMapRemove(
                candidEncodedMemoryId,
                candidEncodedKey
            );

            if (candidEncodedValue === undefined) {
                return None;
            } else {
                return Some(decodeAndVisit(valueType, candidEncodedValue));
            }
        },
        /**
         * The values in the map in sorted order.
         * @returns the values in the map.
         */
        values(): TypeMapping<Value>[] {
            const candidEncodedMemoryId = visitAndEncode(
                IDL.Nat8,
                memoryId
            ).buffer;

            const candidEncodedValues = (
                globalThis as any
            )._azleIc.stableBTreeMapValues(candidEncodedMemoryId);

            // TODO too much copying
            return candidEncodedValues.map((candidEncodedValue: any) => {
                return decodeAndVisit(valueType, candidEncodedValue);
            });
        }
    };
}
