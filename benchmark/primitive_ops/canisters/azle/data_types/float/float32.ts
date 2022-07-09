import { ic, float32, nat32, nat64, Update } from 'azle';

let float32_init_heap_storage: { [key: string]: float32 | undefined; } = {};

export function float32_init_stack(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        let value = i % 2 === 0 ? Math.PI : Math.E;
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    return ic.performance_counter(0);
}

export function float32_init_heap(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        float32_init_heap_storage[`item${i}`] = i % 2 === 0 ? Math.PI : Math.E;
        i += 1;
    }

    return ic.performance_counter(0);
}