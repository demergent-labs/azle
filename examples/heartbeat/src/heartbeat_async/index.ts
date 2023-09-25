import { blob, ic, heartbeat, query, Service } from 'azle';
import { managementCanister } from 'azle/canisters/management';

let initialized: blob = Uint8Array.from([]);

export default Service({
    heartbeat: heartbeat(async () => {
        const randomness = await ic.call(managementCanister.raw_rand);

        initialized = randomness;
        console.log('heartbeat initialized', randomness.length);
    }),
    getInitialized: query([], blob, () => {
        return initialized;
    })
});
