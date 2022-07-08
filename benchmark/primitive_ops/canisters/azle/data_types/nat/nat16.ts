import { ic, nat16, nat32, nat64, Update } from 'azle';

let nat16_init_heap_storage: { [key: string]: nat16 | undefined; } = {};

export function nat16_init_stack(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        let value: nat16 = i % 2 === 0 ? 65_535 : 0;
        console.log(value);
        i += 1;
    }

    return ic.performance_counter(0);
}

export function nat16_init_heap(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        nat16_init_heap_storage[`element${i}`] = i % 2 === 0 ? 65_535 : 0;
        i += 1;
    }

    return ic.performance_counter(0);
}