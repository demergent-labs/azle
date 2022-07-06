import { ic, int, nat32, nat64, Update } from 'azle';

let int_init_heap_storage: { [key: string]: int | undefined; } = {};

export function int_init_stack(num_inits: nat32): Update<nat64> {
    const performance_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        let value = i % 2 === 0 ? 170_141_183_460_469_231_731_687_303_715_884_105_727n : 0n;
        console.log(value);
        i += 1;
    }

    const performance_end = ic.performance_counter(0);

    return performance_end - performance_start;
}

export function int_init_heap(num_inits: nat32): Update<nat64> {
    const performance_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        int_init_heap_storage[`int${i}`] = i % 2 === 0 ? 170_141_183_460_469_231_731_687_303_715_884_105_727n : 0n;
        i += 1;
    }

    const performance_end = ic.performance_counter(0);

    return performance_end - performance_start;

}

// TODO add in all int types