import { StableBTreeMap, Query } from 'azle';

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

let stable_map = new StableBTreeMap<string, string>(0, 10, 100);

export function get(key: string): Query<string> {
    return stable_map.get(key);
}
