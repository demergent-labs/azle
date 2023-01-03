import { nat64, Opt, Query, Update, StableBTreeMap } from 'azle';

// Error Cases
//
// let without_type_params = new StableBTreeMap('0, 10, 100);
// let with_incorrect_type_params = new StableBTreeMap<string>(0, 10, 100);
// let without_args = new StableBTreeMap<string, string>();
// let with_incorrect_args = new StableBTreeMap<string, string>('with_incorrect_args');
// const args = ['stable_map', 100, 1000];
// let with_spread_args = new StableBTreeMap<string, string>(...args);
// let with_non_number_literal_memory_id = new StableBTreeMap<string, string>('stable_map4', 10, 100);
// let with_out_of_range_memory_id = new StableBTreeMap<string, string>(300, 10, 100);
// let with_float_memory_id = new StableBTreeMap<string, string>(100.5, 10, 100);
// let with_large_second_param = new StableBTreeMap<string, string>(0, 4_294_967_295, 100);
// let with_large_third_param = new StableBTreeMap<string, string>(0, 100, 4_294_967_295);

type Key = string;
type Value = string;

let stable_map = new StableBTreeMap<Key, Value>(0, 100, 500);

export function contains_key(key: Key): Query<boolean> {
    return stable_map.containsKey(key);
}

export function get(key: Key): Query<Opt<Value>> {
    return stable_map.get(key);
}

export function insert(key: Key, value: Value): Update<Opt<Value>> {
    return stable_map.insert(key, value);
}

export function is_empty(): Query<boolean> {
    return stable_map.isEmpty();
}

export function len(): Query<nat64> {
    return stable_map.len();
}

export function remove(key: Key): Update<Opt<Value>> {
    return stable_map.remove(key);
}
