import { blob, Principal, Service, update, Void } from 'azle';

// TODO use the actual management canister from azle/canisters/management
class ManagementCanister extends Service {
    @update([], blob)
    raw_rand: () => Promise<blob>;
}

const managementCanister = new ManagementCanister(
    Principal.fromText('aaaaa-aa')
);

export default class {
    @update([], blob)
    async getRandomnessDirectly(): Promise<blob> {
        return await managementCanister.raw_rand();
    }

    @update([], blob)
    async getRandomnessIndirectly(): Promise<blob> {
        return await getRandomness();
    }

    @update([], blob)
    async getRandomnessSuperIndirectly(): Promise<blob> {
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
    async returnPromiseVoid(): Promise<void> {
        await managementCanister.raw_rand();
    }
}

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
    return await managementCanister.raw_rand();
}
