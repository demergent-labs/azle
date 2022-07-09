import { ic, nat32, nat64, Opt, Update } from 'azle';

let opt_init_heap_storage: { [key: string]: Opt<boolean> | undefined; } = {};

export function opt_init_stack(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        let value: Opt<boolean> = i % 2 === 0 ? true : null;
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    return ic.performance_counter(0);
}

export function opt_init_heap(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        opt_init_heap_storage[`bool${i}`] = i % 2 === 0 ? true : null;
        i += 1;
    }

    return ic.performance_counter(0);
}