import { blob, float32, ic, nat32, nat64, Principal, Update } from 'azle';

type User = {
    principal: Principal;
    age: nat32;
    deceased: boolean;
    dna: blob;
    height: float32;
    username: string;
};

let record_init_heap_storage: { [key: string]: User | undefined; } = {};

export function record_init_stack(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        let value: User = i % 2 === 0 ? {
            principal: Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai'),
            age: 43,
            deceased: false,
            dna: Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
            height: 6.25,
            username: 'djohn'
        } : {
            principal: Principal.fromText('aaaaa-aa'),
            age: 123,
            deceased: true,
            dna: Uint8Array.from([1, 0, 2, 3, 4, 5, 6, 7, 8, 9]),
            height: 5.45,
            username: 'gramps'
        };
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    return ic.performance_counter(0);
}

export function record_init_heap(num_inits: nat32): Update<nat64> {
    let i = 0;

    while (i < num_inits) {
        record_init_heap_storage[`element${i}`] = i % 2 === 0 ? {
            principal: Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai'),
            age: 43,
            deceased: false,
            dna: Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
            height: 6.25,
            username: 'djohn'
        } : {
            principal: Principal.fromText('aaaaa-aa'),
            age: 123,
            deceased: true,
            dna: Uint8Array.from([1, 0, 2, 3, 4, 5, 6, 7, 8, 9]),
            height: 5.45,
            username: 'gramps'
        };
        i += 1;
    }

    return ic.performance_counter(0);
}