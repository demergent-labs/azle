import { blob, match, $update, Variant } from 'azle';
import { management_canister } from 'azle/canisters/management';

type RawRandResult = Variant<{
    Ok: blob;
    Err: string;
}>;

$update;
export async function get_randomness_directly(): Promise<blob> {
    const randomness_result = await management_canister.raw_rand().call();

    return match(randomness_result, {
        Ok: (randomness) => randomness,
        Err: () => Uint8Array.from([])
    });
}

$update;
export async function get_randomness_indirectly(): Promise<blob> {
    const indirect_randomness_result = await get_randomness();

    return match(indirect_randomness_result, {
        Ok: (indirect_randomness) => indirect_randomness,
        Err: () => Uint8Array.from([])
    });
}

$update;
export async function get_randomness_super_indirectly(): Promise<blob> {
    const randomness_result0 = await get_randomness_level0();

    return match(randomness_result0, {
        Ok: async (randomness0) => {
            const randomness_result1 = await get_randomness_level1();

            return match(randomness_result1, {
                Ok: async (randomness1) => {
                    const randomness_result2 = await get_randomness_level2();

                    return match(randomness_result2, {
                        Ok: (randomness2) => {
                            return Uint8Array.from([
                                ...randomness0,
                                ...randomness1,
                                ...randomness2
                            ]);
                        },
                        Err: () => Uint8Array.from([])
                    });
                },
                Err: () => Uint8Array.from([])
            });
        },
        Err: () => Uint8Array.from([])
    });
}

async function get_randomness_level0(): Promise<RawRandResult> {
    return await get_randomness_level1();
}

async function get_randomness_level1(): Promise<RawRandResult> {
    return await get_randomness_level2();
}

async function get_randomness_level2(): Promise<RawRandResult> {
    return await get_randomness();
}

async function get_randomness(): Promise<RawRandResult> {
    return await management_canister.raw_rand().call();
}
