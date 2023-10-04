import { blob, Canister, ic, heartbeat, query } from 'azle';
import { managementCanister } from 'azle/canisters/management';

let initialized: blob = Uint8Array.from([]);

export default Canister({
    heartbeat: heartbeat(async () => {
        const randomness = await ic.call(managementCanister.raw_rand);

        initialized = randomness;
        console.log('heartbeat initialized', randomness.length);
    }),
    getInitialized: query([], blob, () => {
        return initialized;
    })
});
