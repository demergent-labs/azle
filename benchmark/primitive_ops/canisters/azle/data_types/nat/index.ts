import { ic, nat, nat32, nat64, Update } from 'azle';

let nat_init_heap_storage: { [key: string]: nat | undefined; } = {};

type NatResult = {
    value: nat;
    wasm_instructions: nat64;
};

type NatsResult = {
    value: nat[];
    wasm_instructions: nat64;
};

export function nat_candid_serde_one(nat: nat): Update<NatResult> {
    return {
        value: nat,
        wasm_instructions: ic.performance_counter(0)
    };
}

export function nat_candid_serde_many(nats: nat[]): Update<NatsResult> {
    return {
        value: nats,
        wasm_instructions: ic.performance_counter(0)
    };
}

export function nat_init_stack(num_inits: nat32): Update<NatResult> {
    let i = 0;
    let value = 0n;

    while (i < num_inits) {
        value = i % 2 === 0 ? 340_282_366_920_938_463_463_374_607_431_768_211_455n : 0n;
        i += 1;
    }

    return {
        value,
        wasm_instructions: ic.performance_counter(0)
    };
}

export function nat_init_heap(num_inits: nat32): Update<NatResult> {
    let i = 0;

    while (i < num_inits) {
        nat_init_heap_storage[`nat${i}`] = i % 2 === 0 ? 340_282_366_920_938_463_463_374_607_431_768_211_455n : 1n;
        i += 1;
    }

    return {
        value: nat_init_heap_storage.nat0 ?? 0n,
        wasm_instructions: ic.performance_counter(0)
    };
}

// TODO add in all nat types