import { ic, nat32, nat64, Update } from 'azle';

let null_init_heap_storage: { [key: string]: null | undefined; } = {};

type NullResult = {
    value: null; // TODO seems like null values in records is broken
    wasm_instructions: nat64;
};

export function null_init_stack(num_inits: nat32): Update<NullResult> {
    let i = 0;
    let value = null;

    while (i < num_inits) {
        value = i % 2 === 0 ? null : null;
        i += 1;
    }

    return {
        value,
        wasm_instructions: ic.performance_counter(0)
    };
}

export function null_init_heap(num_inits: nat32): Update<NullResult> {
    let i = 0;

    while (i < num_inits) {
        null_init_heap_storage[`null${i}`] = i % 2 === 0 ? null : undefined;
        i += 1;
    }

    return {
        value: null_init_heap_storage.null0 ?? null,
        wasm_instructions: ic.performance_counter(0)
    };
}