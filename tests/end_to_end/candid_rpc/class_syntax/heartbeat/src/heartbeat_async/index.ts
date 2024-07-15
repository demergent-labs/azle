import { call, heartbeat, IDL, query } from 'azle';

let initialized: Uint8Array = Uint8Array.from([]);

export default class {
    @heartbeat
    async heartbeat(): Promise<void> {
        const randomness = await getRandomness();

        initialized = randomness;
        console.log('heartbeat initialized', randomness.length);
    }

    @query([], IDL.Vec(IDL.Nat8))
    getInitialized(): Uint8Array {
        return initialized;
    }
}

async function getRandomness(): Promise<Uint8Array> {
    return await call('aaaaa-aa', 'raw_rand', {
        returnIdlType: IDL.Vec(IDL.Nat8)
    });
}
