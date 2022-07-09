import { ic, float64, nat32, nat64, Update } from 'azle';

let heap_storage: { [key: string]: float64 | undefined; } = {};

export function float64_init_stack(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        let value = i % 2 === 0 ? Math.PI : Math.E;
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    return ic.performance_counter(0);
}

export function float64_init_heap(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        heap_storage[`item${i}`] = i % 2 === 0 ? Math.PI : Math.E;
        i += 1;
    }

    return ic.performance_counter(0);
}