import { call, IDL } from 'azle';
import { blob, Canister, heartbeat, query } from 'azle/experimental';

let initialized: blob = Uint8Array.from([]);

export default Canister({
    heartbeat: heartbeat(async () => {
        const randomness = await getRandomness();

        initialized = randomness;
        console.info('heartbeat initialized', randomness.length);
    }),
    getInitialized: query([], blob, () => {
        return initialized;
    })
});

async function getRandomness(): Promise<Uint8Array> {
    if (process.env.AZLE_TEST_FETCH === 'true') {
        const response = await fetch(`icp://aaaaa-aa/raw_rand`);
        const responseJson = await response.json();

        return responseJson;
    } else {
        return await call('aaaaa-aa', 'raw_rand', {
            returnIdlType: IDL.Vec(IDL.Nat8)
        });
    }
}
