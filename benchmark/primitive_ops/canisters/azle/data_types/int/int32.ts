import { ic, int32, nat32, nat64, Update } from 'azle';

let int32_init_heap_storage: { [key: string]: int32 | undefined; } = {};

export function int32_init_stack(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        let value: int32 = i % 2 === 0 ? 2_147_483_647 : 0;
        console.log(value);
        i += 1;
    }

    return ic.performance_counter(0);
}

export function int32_init_heap(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        int32_init_heap_storage[`element${i}`] = i % 2 === 0 ? 2_147_483_647 : 0;
        i += 1;
    }

    return ic.performance_counter(0);
}