import { blob, ic, heartbeat, query, Service } from 'azle';
import { managementCanister } from 'azle/canisters/management';

export default class extends Service {
    initialized: blob = Uint8Array.from([]);

    @heartbeat
    async heartbeat() {
        const randomness = await ic.call(managementCanister.raw_rand);

        this.initialized = randomness;
        console.log('heartbeat initialized', randomness.length);
    }

    @query([], blob)
    getInitialized(): blob {
        return this.initialized;
    }
}
