import { ic, nat8, nat32, nat64, Opt } from './index';

/**
 * A Map based on a self-balancing tree that persists across
 * canister upgrades.
 */
export class StableBTreeMap<Key, Value> {
    memoryId: nat8;

    /**
     * Creates a new StableBTreeMap object.
     * @param memoryId the memory id at which to instantiate this map.
     * @param maxKeySize the largest size (in bytes) a key can be.
     * @param maxValueSize the largest size (in bytes) a value can be.
     */
    constructor(memoryId: nat8, maxKeySize: nat32, maxValueSize: nat32) {
        this.memoryId = memoryId;

        // Note: Although maxKeySize and maxValueSize aren't used here, they
        // are read by Azle at compilation time and are necessary to properly
        // initialize the StableBTreeMap.
    }

    /**
     * Checks if the given key exists in the map.
     * @param key the key to check.
     * @returns `true` if the key exists in the map, `false` otherwise.
     */
    containsKey(key: Key): boolean {
        // @ts-ignore
        return ic.stableBTreeMapContainsKey(this.memoryId, key);
    }

    /**
     * Retrieves the value stored at the provided key.
     * @param key the location from which to retrieve.
     * @returns the value associated with the given key, if it exists.
     */
    get(key: Key): Opt<Value> {
        // @ts-ignore
        return ic.stableBTreeMapGet<Key, Value>(this.memoryId, key);
    }

    /**
     * Inserts a value into the map at the provided key.
     * @param key the location at which to insert.
     * @param value the value to insert.
     * @returns the previous value of the key, if present.
     */
    insert(key: Key, value: Value): Opt<Value> {
        // @ts-ignore
        return ic.stableBTreeMapInsert(this.memoryId, key, value);
    }

    /**
     * Checks if the map is empty.
     * @returns `true` if the map contains no elements, `false` otherwise.
     */
    isEmpty(): boolean {
        // @ts-ignore
        return ic.stableBTreeMapIsEmpty(this.memoryId);
    }

    /**
     * Retrieves the items in the map in sorted order.
     * @returns tuples representing key/value pairs.
     */
    items(): [Key, Value][] {
        // @ts-ignore
        return ic.stableBTreeMapItems(this.memoryId);
    }

    /**
     * The keys for each element in the map in sorted order.
     * @returns they keys in the map.
     */
    keys(): Key[] {
        // @ts-ignore
        return ic.stableBTreeMapKeys(this.memoryId);
    }

    /**
     * Checks to see how many elements are in the map.
     * @returns the number of elements in the map.
     */
    len(): nat64 {
        // @ts-ignore
        return ic.stableBTreeMapLen(this.memoryId);
    }

    /**
     * Removes a key from the map.
     * @param key the location from which to remove.
     * @returns the previous value at the key if it exists, `null` otherwise.
     */
    remove(key: Key): Opt<Value> {
        // @ts-ignore
        return ic.stableBTreeMapRemove(this.memoryId, key);
    }

    /**
     * The values in the map in sorted order.
     * @returns the values in the map.
     */
    values(): Value[] {
        // @ts-ignore
        return ic.stableBTreeMapValues(this.memoryId);
    }
}
