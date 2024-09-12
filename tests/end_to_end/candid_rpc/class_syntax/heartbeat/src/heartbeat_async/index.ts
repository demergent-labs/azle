import { call, heartbeat, IDL, query } from 'azle';

export default class {
    initialized: Uint8Array = Uint8Array.from([]);

    @heartbeat
    async heartbeat(): Promise<void> {
        const randomness = await getRandomness();

        this.initialized = randomness;
        console.info('heartbeat initialized', randomness.length);
    }

    @query([], IDL.Vec(IDL.Nat8))
    getInitialized(): Uint8Array {
        return this.initialized;
    }
}

async function getRandomness(): Promise<Uint8Array> {
    return await call('aaaaa-aa', 'raw_rand', {
        returnIdlType: IDL.Vec(IDL.Nat8)
    });
}
