import { ic, nat32, nat64, Update } from 'azle';

let null_init_heap_storage: { [key: string]: null | undefined; } = {};

export function null_init_stack(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        let value: null = i % 2 === 0 ? null : null;
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    return ic.performance_counter(0);
}

export function null_init_heap(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        null_init_heap_storage[`element${i}`] = i % 2 === 0 ? null : null;
        i += 1;
    }

    return ic.performance_counter(0);
}