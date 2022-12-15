// TODO let's just rename this example to async_await

import { blob, ic, ok, Principal, Update } from 'azle';

// TODO use the management canister once we have typed cross-canister calls
// import { ManagementCanister } from 'azle/canisters/management';

export async function get_randomness_directly(): Update<Promise<blob>> {
    const randomness_result = await ic.call_raw(
        Principal.fromText('aaaaa-aa'),
        'raw_rand',
        ic.candid_encode('()'),
        0n
    );

    if (!ok(randomness_result)) {
        return Uint8Array.from([]);
    }

    return randomness_result.ok;
}

export async function get_randomness_indirectly(): Update<Promise<blob>> {
    const indirect_randomness = await get_randomness();

    return indirect_randomness;
}

export async function get_randomness_super_indirectly(): Update<Promise<blob>> {
    const randomness0 = await get_randomness_level0();
    const randomness1 = await get_randomness_level1();
    const randomness2 = await get_randomness_level2();

    return Uint8Array.from([...randomness0, ...randomness1, ...randomness2]);
}

async function get_randomness_level0(): Promise<blob> {
    return await get_randomness_level1();
}

async function get_randomness_level1(): Promise<blob> {
    return await get_randomness_level2();
}

async function get_randomness_level2(): Promise<blob> {
    return await get_randomness();
}

async function get_randomness(): Promise<blob> {
    const randomness_result = await ic.call_raw(
        Principal.fromText('aaaaa-aa'),
        'raw_rand',
        ic.candid_encode('()'),
        0n
    );

    if (!ok(randomness_result)) {
        return Uint8Array.from([]);
    }

    return randomness_result.ok;
}
