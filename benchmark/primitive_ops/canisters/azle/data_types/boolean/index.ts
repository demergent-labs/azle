import { ic, nat32, nat64, Update } from 'azle';

let boolean_init_heap_storage: { [key: string]: boolean | undefined; } = {};

export function boolean_init_stack(num_inits: nat32): Update<nat64> {
    const performance_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        let value = i % 2 === 0 ? true : false;
        console.log(value);
        i += 1;
    }

    const performance_end = ic.performance_counter(0);

    return performance_end - performance_start;
}

export function boolean_init_heap(num_inits: nat32): Update<nat64> {
    const performance_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        boolean_init_heap_storage[`bool${i}`] = i % 2 === 0 ? true : false;
        i += 1;
    }

    const performance_end = ic.performance_counter(0);

    return performance_end - performance_start;
}