import { ic, nat32, nat64, Update } from 'azle';

let text_init_heap_storage: { [key: string]: string | undefined; } = {};

export function text_init_stack(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        let value: string = i % 2 === 0 ? 'hello' : '';
        console.log(value);
        i += 1;
    }

    return ic.performance_counter(0);
}

export function text_init_heap(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        text_init_heap_storage[`element${i}`] = i % 2 === 0 ? 'hello' : '';
        i += 1;
    }

    return ic.performance_counter(0);
}