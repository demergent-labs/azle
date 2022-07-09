import { ic, int16, nat32, nat64, Update } from 'azle';

let int16_init_heap_storage: { [key: string]: int16 | undefined; } = {};

export function int16_init_stack(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        let value: int16 = i % 2 === 0 ? 32_767 : 0;
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    return ic.performance_counter(0);
}

export function int16_init_heap(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        int16_init_heap_storage[`element${i}`] = i % 2 === 0 ? 32_767 : 0;
        i += 1;
    }

    return ic.performance_counter(0);
}