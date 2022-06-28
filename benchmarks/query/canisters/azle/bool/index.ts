import { ic, nat32, nat64, Query } from 'azle';

type QueryBoolResult = {
    boolean: boolean;
    wasm_instructions: nat64;
};

export function query_bool_init_stack(num_inits: nat32): Query<QueryBoolResult> {
    let i = 0;
    let boolean = false;

    while (i < num_inits) {
        boolean = i % 2 === 0 ? true : false;
        i += 1;
    }

    return {
        boolean,
        wasm_instructions: ic.performance_counter(0)
    };
}

let query_bool_init_heap_storage: { [key: string]: boolean; } = {};

export function query_bool_init_heap(num_inits: nat32): Query<QueryBoolResult> {
    let i = 0;

    while (i < num_inits) {
        query_bool_init_heap_storage[`bool${i}`] = i % 2 === 0 ? true : false;
        i += 1;
    }

    return {
        boolean: query_bool_init_heap_storage.bool0,
        wasm_instructions: ic.performance_counter(0)
    };
}