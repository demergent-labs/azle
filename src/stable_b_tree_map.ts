import { ic, nat8, nat32, nat64, Opt, Record, Variant } from '../index';

type KeyTooLarge = Record<{
    given: nat32;
    max: nat32;
}>;

type ValueTooLarge = Record<{
    given: nat32;
    max: nat32;
}>;

export type InsertError = Variant<{
    KeyTooLarge: KeyTooLarge;
    ValueTooLarge: ValueTooLarge;
}>;

/**
 * A Map based on a self-balancing tree that persists across
 * canister upgrades.
 */
export class StableBTreeMap<Key, Value> {
    memory_id: nat8;

    /**
     * Creates a new StableBTreeMap object.
     * @param memory_id the memory id at which to instantiate this map.
     * @param max_key_size the largest size (in bytes) a key can be.
     * @param max_value_size the largest size (in bytes) a value can be.
     */
    constructor(memory_id: nat8, max_key_size: nat32, max_value_size: nat32) {
        this.memory_id = memory_id;

        // Note: Although max_key_size and max_value_size aren't used here, they
        // are read by Azle at compilation time and are necessary to properly
        // initialize the StableBTreeMap.
    }

    /**
     * Checks if the given key exists in the map.
     * @param key the key to check.
     * @returns `true` if the key exists in the map, `false` otherwise.
     */
    contains_key(key: Key): boolean {
        // @ts-ignore
        return ic.stable_b_tree_map_contains_key(this.memory_id, key);
    }

    /**
     * Retrieves the value stored at the provided key.
     * @param key the location from which to retrieve.
     * @returns the value associated with the given key, if it exists.
     */
    get(key: Key): Opt<Value> {
        // @ts-ignore
        return ic.stable_b_tree_map_get<Key, Value>(this.memory_id, key);
    }

    /**
     * Inserts a value into the map at the provided key.
     * @param key the location at which to insert.
     * @param value the value to insert.
     * @returns the previous value of the key, if present.
     */
    insert(
        key: Key,
        value: Value
    ): Variant<{
        ok: Opt<Value>;
        err: InsertError;
    }> {
        // @ts-ignore
        return ic.stable_b_tree_map_insert(this.memory_id, key, value);
    }

    /**
     * Checks if the map is empty.
     * @returns `true` if the map contains no elements, `false` otherwise.
     */
    is_empty(): boolean {
        // @ts-ignore
        return ic.stable_b_tree_map_is_empty(this.memory_id);
    }

    /**
     * Retrieves the items in the map in sorted order.
     * @returns tuples representing key/value pairs.
     */
    items(): [Key, Value][] {
        // @ts-ignore
        return ic.stable_b_tree_map_items(this.memory_id);
    }

    /**
     * The keys for each element in the map in sorted order.
     * @returns they keys in the map.
     */
    keys(): Key[] {
        // @ts-ignore
        return ic.stable_b_tree_map_keys(this.memory_id);
    }

    /**
     * Checks to see how many elements are in the map.
     * @returns the number of elements in the map.
     */
    len(): nat64 {
        // @ts-ignore
        return ic.stable_b_tree_map_len(this.memory_id);
    }

    /**
     * Removes a key from the map.
     * @param key the location from which to remove.
     * @returns the previous value at the key if it exists, `null` otherwise.
     */
    remove(key: Key): Opt<Value> {
        // @ts-ignore
        return ic.stable_b_tree_map_remove(this.memory_id, key);
    }

    /**
     * The values in the map in sorted order.
     * @returns the values in the map.
     */
    values(): Value[] {
        // @ts-ignore
        return ic.stable_b_tree_map_values(this.memory_id);
    }
}
