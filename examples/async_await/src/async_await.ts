import { blob, ok, Update } from 'azle';

import { management_canister } from 'azle/canisters/management';

export async function get_randomness_directly(): Promise<Update<blob>> {
    const randomness_result = await management_canister.raw_rand().call();

    if (!ok(randomness_result)) {
        return Uint8Array.from([]);
    }

    return randomness_result.ok;
}

export async function get_randomness_indirectly(): Promise<Update<blob>> {
    const indirect_randomness = await get_randomness();

    return indirect_randomness;
}

export async function get_randomness_super_indirectly(): Promise<Update<blob>> {
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
    const randomness_result = await management_canister.raw_rand().call();

    if (!ok(randomness_result)) {
        return Uint8Array.from([]);
    }

    return randomness_result.ok;
}
