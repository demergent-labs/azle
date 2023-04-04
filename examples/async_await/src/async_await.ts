import { blob, match, Result, $update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

$update;
export async function getRandomnessDirectly(): Promise<blob> {
    const randomnessResult = await managementCanister.raw_rand().call();

    return match(randomnessResult, {
        Ok: (randomness) => randomness,
        Err: () => Uint8Array.from([])
    });
}

$update;
export async function getRandomnessIndirectly(): Promise<blob> {
    const indirectRandomnessResult = await getRandomness();

    return match(indirectRandomnessResult, {
        Ok: (indirectRandomness) => indirectRandomness,
        Err: () => Uint8Array.from([])
    });
}

$update;
export async function getRandomnessSuperIndirectly(): Promise<blob> {
    const randomnessResult0 = await getRandomnessLevel0();

    return match(randomnessResult0, {
        Ok: async (randomness0) => {
            const randomnessResult1 = await getRandomnessLevel1();

            return match(randomnessResult1, {
                Ok: async (randomness1) => {
                    const randomnessResult2 = await getRandomnessLevel2();

                    return match(randomnessResult2, {
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

async function getRandomnessLevel0(): Promise<Result<blob, string>> {
    return await getRandomnessLevel1();
}

async function getRandomnessLevel1(): Promise<Result<blob, string>> {
    return await getRandomnessLevel2();
}

async function getRandomnessLevel2(): Promise<Result<blob, string>> {
    return await getRandomness();
}

async function getRandomness(): Promise<Result<blob, string>> {
    return await managementCanister.raw_rand().call();
}
