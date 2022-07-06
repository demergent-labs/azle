import { ic, nat32, nat64, Update } from 'azle';

let boolean_init_heap_storage: { [key: string]: boolean | undefined; } = {};

type BooleanResult = {
    value: boolean;
    wasm_instructions: nat64;
};

type BooleansResult = {
    value: boolean[];
    wasm_instructions: nat64;
};

export function boolean_candid_serde_one(boolean: boolean): Update<BooleanResult> {
    return {
        value: boolean,
        wasm_instructions: ic.performance_counter(0)
    };
}

export function boolean_candid_serde_many(booleans: boolean[]): Update<BooleansResult> {
    return {
        value: booleans,
        wasm_instructions: ic.performance_counter(0)
    };
}

export function boolean_init_stack(num_inits: nat32): Update<BooleanResult> {
    let i = 0;
    let value = false;

    while (i < num_inits) {
        value = i % 2 === 0 ? true : false;
        i += 1;
    }

    return {
        value,
        wasm_instructions: ic.performance_counter(0)
    };
}

export function boolean_init_heap(num_inits: nat32): Update<BooleanResult> {
    let i = 0;

    while (i < num_inits) {
        boolean_init_heap_storage[`bool${i}`] = i % 2 === 0 ? true : false;
        i += 1;
    }

    return {
        value: boolean_init_heap_storage.bool0 ?? true,
        wasm_instructions: ic.performance_counter(0)
    };
}