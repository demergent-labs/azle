import { ic, nat32, nat64, Principal, Update } from 'azle';

let principal_init_heap_storage: { [key: string]: Principal | undefined; } = {};

export function principal_init_stack(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        let value: Principal = i % 2 === 0 ? Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai') : Principal.fromText('aaaaa-aa');
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    return ic.performance_counter(0);
}

export function principal_init_heap(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        principal_init_heap_storage[`element${i}`] = i % 2 === 0 ? Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai') : Principal.fromText('aaaaa-aa');
        i += 1;
    }

    return ic.performance_counter(0);
}