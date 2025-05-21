import { call, IDL } from 'azle';
import { blob, Canister, update, Void } from 'azle/experimental';

export default Canister({
    getRandomnessDirectly: update([], blob, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(`icp://aaaaa-aa/raw_rand`);
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call<undefined, Uint8Array>('aaaaa-aa', 'raw_rand', {
                returnIdlType: IDL.Vec(IDL.Nat8)
            });
        }
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
    getRandomnessSuperIndirectlyAndConcurrently: update([], blob, async () => {
        const [randomness0, randomness1, randomness2] = await Promise.all([
            getRandomnessLevel0(),
            getRandomnessLevel1(),
            getRandomnessLevel2()
        ]);

        return Uint8Array.from([
            ...randomness0,
            ...randomness1,
            ...randomness2
        ]);
    }),
    returnPromiseVoid: update([], Void, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://aaaaa-aa/raw_rand`);
        } else {
            await call<undefined, Uint8Array>('aaaaa-aa', 'raw_rand', {
                returnIdlType: IDL.Vec(IDL.Nat8)
            });
        }
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
    if (process.env.AZLE_TEST_FETCH === 'true') {
        const response = await fetch(`icp://aaaaa-aa/raw_rand`);
        const responseJson = await response.json();

        return responseJson;
    } else {
        return await call<undefined, Uint8Array>('aaaaa-aa', 'raw_rand', {
            returnIdlType: IDL.Vec(IDL.Nat8)
        });
    }
}
