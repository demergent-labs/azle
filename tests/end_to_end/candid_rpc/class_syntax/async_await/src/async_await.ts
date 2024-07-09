import { call, IDL, update } from 'azle';

export default class {
    @update([], IDL.Vec(IDL.Nat8))
    async getRandomnessDirectly(): Promise<Uint8Array> {
        return await call('aaaaa-aa', 'raw_rand', {
            returnIdl: IDL.Vec(IDL.Nat8)
        });
    }

    @update([], IDL.Vec(IDL.Nat8))
    async getRandomnessIndirectly(): Promise<Uint8Array> {
        return await getRandomness();
    }

    @update([], IDL.Vec(IDL.Nat8))
    async getRandomnessSuperIndirectly(): Promise<Uint8Array> {
        const randomness0 = await getRandomnessLevel0();
        const randomness1 = await getRandomnessLevel1();
        const randomness2 = await getRandomnessLevel2();

        return Uint8Array.from([
            ...randomness0,
            ...randomness1,
            ...randomness2
        ]);
    }

    @update([])
    async returnPromiseVoid(): Promise<void> {
        await call('aaaaa-aa', 'raw_rand', { returnIdl: IDL.Vec(IDL.Nat8) });
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
    return await call('aaaaa-aa', 'raw_rand', { returnIdl: IDL.Vec(IDL.Nat8) });
}
