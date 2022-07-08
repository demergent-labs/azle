import { ic, int8, nat32, nat64, Update } from 'azle';

let int8_init_heap_storage: { [key: string]: int8 | undefined; } = {};

export function int8_init_stack(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        let value: int8 = i % 2 === 0 ? 127 : 0;
        console.log(value);
        i += 1;
    }

    return ic.performance_counter(0);
}

export function int8_init_heap(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        int8_init_heap_storage[`element${i}`] = i % 2 === 0 ? 127 : 0;
        i += 1;
    }

    return ic.performance_counter(0);
}