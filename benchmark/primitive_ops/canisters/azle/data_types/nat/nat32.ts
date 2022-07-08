import { ic, nat32, nat64, Update } from 'azle';

let nat32_init_heap_storage: { [key: string]: nat32 | undefined; } = {};

export function nat32_init_stack(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        let value: nat32 = i % 2 === 0 ? 4_294_967_295 : 0;
        console.log(value);
        i += 1;
    }

    return ic.performance_counter(0);
}

export function nat32_init_heap(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        nat32_init_heap_storage[`element${i}`] = i % 2 === 0 ? 4_294_967_295 : 0;
        i += 1;
    }

    return ic.performance_counter(0);
}