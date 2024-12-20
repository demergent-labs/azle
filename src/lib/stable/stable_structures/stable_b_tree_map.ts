import { stableJson } from './stable_json';

export interface Serializable {
    toBytes: (data: any) => Uint8Array;
    fromBytes: (bytes: Uint8Array) => any;
}

export class StableBTreeMap<Key = any, Value = any> {
    memoryId: number;
    keySerializable: Serializable;
    valueSerializable: Serializable;

    constructor(
        memoryId: number,
        keySerializable: Serializable = stableJson,
        valueSerializable: Serializable = stableJson
    ) {
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
     * @param key the key to check.
     * @returns `true` if the key exists in the map, `false` otherwise.
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
                encodedKey.buffer
            );
        }

        return globalThis._azleIcStable.stableBTreeMapContainsKey(
            this.memoryId,
            encodedKey
        );
    }

    /**
     * Retrieves the value stored at the provided key.
     * @param key the location from which to retrieve.
     * @returns the value associated with the given key, if it exists.
     */
    get(key: Key): Value | null {
        if (
            globalThis._azleIcStable === undefined &&
            globalThis._azleIcExperimental === undefined
        ) {
            return undefined as any;
        }

        const encodedKey = this.keySerializable.toBytes(key);

        const encodedResult =
            globalThis._azleIcExperimental !== undefined
                ? globalThis._azleIcExperimental.stableBTreeMapGet(
                      this.memoryId.toString(),
                      encodedKey.buffer
                  )
                : globalThis._azleIcStable.stableBTreeMapGet(
                      this.memoryId,
                      encodedKey
                  );

        if (encodedResult === undefined) {
            return null;
        } else {
            return this.valueSerializable.fromBytes(
                new Uint8Array(encodedResult)
            );
        }
    }

    /**
     * Inserts a value into the map at the provided key.
     * @param key the location at which to insert.
     * @param value the value to insert.
     * @returns the previous value of the key, if present.
     */
    insert(key: Key, value: Value): Value | null {
        if (
            globalThis._azleIcStable === undefined &&
            globalThis._azleIcExperimental === undefined
        ) {
            return undefined as any;
        }

        const encodedKey = this.keySerializable.toBytes(key);
        const encodedValue = this.valueSerializable.toBytes(value);

        const encodedResult =
            globalThis._azleIcExperimental !== undefined
                ? globalThis._azleIcExperimental.stableBTreeMapInsert(
                      this.memoryId.toString(),
                      encodedKey.buffer,
                      encodedValue.buffer
                  )
                : globalThis._azleIcStable.stableBTreeMapInsert(
                      this.memoryId,
                      encodedKey,
                      encodedValue
                  );

        if (encodedResult === undefined) {
            return null;
        } else {
            return this.valueSerializable.fromBytes(
                new Uint8Array(encodedResult)
            );
        }
    }

    /**
     * Checks if the map is empty.
     * @returns `true` if the map contains no elements, `false` otherwise.
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

        return globalThis._azleIcStable.stableBTreeMapIsEmpty(this.memoryId);
    }

    /**
     * Retrieves the items in the map in sorted order.
     * @param startIndex the starting index to begin retrieval
     * @param length the number of items to retrieve
     * @returns tuples representing key/value pairs.
     */
    items(startIndex?: number, length?: number): [Key, Value][] {
        if (
            globalThis._azleIcStable === undefined &&
            globalThis._azleIcExperimental === undefined
        ) {
            return undefined as any;
        }

        const encodedItems =
            globalThis._azleIcExperimental !== undefined
                ? globalThis._azleIcExperimental.stableBTreeMapItems(
                      this.memoryId.toString(),
                      startIndex?.toString() ?? '0',
                      length?.toString() ?? 'NOT_SET'
                  )
                : globalThis._azleIcStable.stableBTreeMapItems(
                      this.memoryId,
                      startIndex ?? 0,
                      length ?? -1
                  );

        // TODO too much copying
        return encodedItems.map(([encodedKey, encodedValue]) => {
            return [
                this.keySerializable.fromBytes(new Uint8Array(encodedKey)),
                this.valueSerializable.fromBytes(new Uint8Array(encodedValue))
            ];
        });
    }

    /**
     * The keys for each element in the map in sorted order.
     * @param startIndex the starting index to begin retrieval
     * @param length the number of keys to retrieve
     * @returns the keys in the map.
     */
    keys(startIndex?: number, length?: number): Key[] {
        if (
            globalThis._azleIcStable === undefined &&
            globalThis._azleIcExperimental === undefined
        ) {
            return undefined as any;
        }

        const encodedKeys =
            globalThis._azleIcExperimental !== undefined
                ? globalThis._azleIcExperimental.stableBTreeMapKeys(
                      this.memoryId.toString(),
                      startIndex?.toString() ?? '0',
                      length?.toString() ?? 'NOT_SET'
                  )
                : globalThis._azleIcStable.stableBTreeMapKeys(
                      this.memoryId,
                      startIndex ?? 0,
                      length ?? -1
                  );

        // TODO too much copying
        return encodedKeys.map((encodedKey) => {
            return this.keySerializable.fromBytes(new Uint8Array(encodedKey));
        });
    }

    /**
     * Checks to see how many elements are in the map.
     * @returns the number of elements in the map.
     */
    len(): bigint {
        if (
            globalThis._azleIcStable === undefined &&
            globalThis._azleIcExperimental === undefined
        ) {
            return undefined as any;
        }

        if (globalThis._azleIcExperimental !== undefined) {
            return BigInt(
                globalThis._azleIcExperimental.stableBTreeMapLen(
                    this.memoryId.toString()
                )
            );
        }

        return BigInt(
            globalThis._azleIcStable.stableBTreeMapLen(this.memoryId)
        );
    }

    /**
     * Removes a key from the map.
     * @param key the location from which to remove.
     * @returns the previous value at the key if it exists, `null` otherwise.
     */
    remove(key: Key): Value | null {
        if (
            globalThis._azleIcStable === undefined &&
            globalThis._azleIcExperimental === undefined
        ) {
            return undefined as any;
        }

        const encodedKey = this.keySerializable.toBytes(key);

        const encodedValue =
            globalThis._azleIcExperimental !== undefined
                ? globalThis._azleIcExperimental.stableBTreeMapRemove(
                      this.memoryId.toString(),
                      encodedKey.buffer
                  )
                : globalThis._azleIcStable.stableBTreeMapRemove(
                      this.memoryId,
                      encodedKey
                  );

        if (encodedValue === undefined) {
            return null;
        } else {
            return this.valueSerializable.fromBytes(
                new Uint8Array(encodedValue)
            );
        }
    }

    /**
     * The values in the map in sorted order.
     * @param startIndex the starting index to begin retrieval
     * @param length the number of values to retrieve
     * @returns the values in the map.
     */
    values(startIndex?: number, length?: number): Value[] {
        if (
            globalThis._azleIcStable === undefined &&
            globalThis._azleIcExperimental === undefined
        ) {
            return undefined as any;
        }

        const encodedValues =
            globalThis._azleIcExperimental !== undefined
                ? globalThis._azleIcExperimental.stableBTreeMapValues(
                      this.memoryId.toString(),
                      startIndex?.toString() ?? '0',
                      length?.toString() ?? 'NOT_SET'
                  )
                : globalThis._azleIcStable.stableBTreeMapValues(
                      this.memoryId,
                      startIndex ?? 0,
                      length ?? -1
                  );

        // TODO too much copying
        return encodedValues.map((encodedValue) => {
            return this.valueSerializable.fromBytes(
                new Uint8Array(encodedValue)
            );
        });
    }
}
