import { call, IDL, update } from 'azle';

export default class {
    @update
    test(): void {
        globalThis._azleIcExperimental?.debugPrint(
            JSON.parse('514264568357333960000').toString()
        );
        globalThis._azleIcExperimental?.debugPrint(
            JSON.parse('-97274737924886480000').toString()
        );
        globalThis._azleIcExperimental?.debugPrint(
            JSON.parse('-386699494791093900000').toString()
        );
        globalThis._azleIcExperimental?.debugPrint(
            JSON.parse('945084679698654700000').toString()
        );
    }

    @update([], IDL.Vec(IDL.Nat8))
    async getRandomnessDirectly(): Promise<Uint8Array> {
        return await call<undefined, Uint8Array>('aaaaa-aa', 'raw_rand', {
            returnIdlType: IDL.Vec(IDL.Nat8)
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

    @update
    async returnPromiseVoid(): Promise<void> {
        await call<undefined, Uint8Array>('aaaaa-aa', 'raw_rand', {
            returnIdlType: IDL.Vec(IDL.Nat8)
        });
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
    return await call<undefined, Uint8Array>('aaaaa-aa', 'raw_rand', {
        returnIdlType: IDL.Vec(IDL.Nat8)
    });
}
