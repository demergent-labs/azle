import { ic, nat32, nat64, Update } from 'azle';

let vec_init_heap_storage: { [key: string]: nat32[] | undefined; } = {};

export function vec_init_stack(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        let value: nat32[] = i % 2 === 0 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : [];
        console.log(value);
        i += 1;
    }

    return ic.performance_counter(0);
}

export function vec_init_heap(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        vec_init_heap_storage[`element${i}`] = i % 2 === 0 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : [];
        i += 1;
    }

    return ic.performance_counter(0);
}