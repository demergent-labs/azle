import { blob, Canister, ic, heartbeat, query, serialize } from 'azle';
import { managementCanister } from 'azle/canisters/management';

let initialized: blob = Uint8Array.from([]);

export default Canister({
    heartbeat: heartbeat(async () => {
        const randomness = await getRandomness();

        initialized = randomness;
        console.log('heartbeat initialized', randomness.length);
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
        return await ic.call(managementCanister.raw_rand);
    }
}
