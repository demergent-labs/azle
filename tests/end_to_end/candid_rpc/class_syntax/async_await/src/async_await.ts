import { call, IDL, update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

export default class {
    @update([], IDL.Vec(IDL.Nat8))
    async getRandomnessDirectly() {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(`icp://aaaaa-aa/raw_rand`);
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call(managementCanister.raw_rand);
        }
    }
    @update([], IDL.Vec(IDL.Nat8))
    async getRandomnessIndirectly() {
        return await getRandomness();
    }
    @update([], IDL.Vec(IDL.Nat8))
    async getRandomnessSuperIndirectly() {
        const randomness0 = await getRandomnessLevel0();
        const randomness1 = await getRandomnessLevel1();
        const randomness2 = await getRandomnessLevel2();

        return Uint8Array.from([
            ...randomness0,
            ...randomness1,
            ...randomness2
        ]);
    }
    @update([], Void)
    async returnPromiseVoid() {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://aaaaa-aa/raw_rand`);
        } else {
            await call(managementCanister.raw_rand);
        }
    }
}

async function getRandomnessLevel0(): Promise<Uint8Array> {
    return await getRandomnessLevel1();
}

async function getRandomnessLevel1(): Promise<Uint8Array> {
    return await getRandomnessLevel2();
}

async function getRandomnessLevel2(): Promise<Uint8Array> {
    return await getRandomness();
}

async function getRandomness(): Promise<Uint8Array> {
    if (process.env.AZLE_TEST_FETCH === 'true') {
        const response = await fetch(`icp://aaaaa-aa/raw_rand`);
        const responseJson = await response.json();

        return responseJson;
    } else {
        return await call(managementCanister.raw_rand);
    }
}
