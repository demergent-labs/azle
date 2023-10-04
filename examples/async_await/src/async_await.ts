import { blob, Canister, ic, update, Void } from 'azle';
import { managementCanister } from 'azle/canisters/management';

export default Canister({
    getRandomnessDirectly: update([], blob, async () => {
        return await ic.call(managementCanister.raw_rand);
    }),
    getRandomnessIndirectly: update([], blob, async () => {
        return await getRandomness();
    }),
    getRandomnessSuperIndirectly: update([], blob, async () => {
        const randomness0 = await getRandomnessLevel0();
        const randomness1 = await getRandomnessLevel1();
        const randomness2 = await getRandomnessLevel2();

        return Uint8Array.from([
            ...randomness0,
            ...randomness1,
            ...randomness2
        ]);
    }),
    returnPromiseVoid: update([], Void, async () => {
        await ic.call(managementCanister.raw_rand);
    })
});

async function getRandomnessLevel0(): Promise<blob> {
    return await getRandomnessLevel1();
}

async function getRandomnessLevel1(): Promise<blob> {
    return await getRandomnessLevel2();
}

async function getRandomnessLevel2(): Promise<blob> {
    return await getRandomness();
}

async function getRandomness(): Promise<blob> {
    return await ic.call(managementCanister.raw_rand);
}
