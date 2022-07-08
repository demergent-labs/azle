import { ic, nat32, nat64, Update } from 'azle';

let nat64_init_heap_storage: { [key: string]: nat64 | undefined; } = {};

export function nat64_init_stack(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        let value: nat64 = i % 2 === 0 ? 18_446_744_073_709_551_615n : 0n;
        console.log(value);
        i += 1;
    }

    return ic.performance_counter(0);
}

export function nat64_init_heap(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        nat64_init_heap_storage[`element${i}`] = i % 2 === 0 ? 18_446_744_073_709_551_615n : 0n;
        i += 1;
    }

    return ic.performance_counter(0);
}