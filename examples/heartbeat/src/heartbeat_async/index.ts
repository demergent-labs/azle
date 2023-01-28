import { blob, ok, Query, Heartbeat } from 'azle';
import { management_canister } from 'azle/canisters/management';

let initialized: blob = Uint8Array.from([]);

export async function heartbeat_(): Promise<Heartbeat> {
    const randomness_result = await management_canister.raw_rand().call();

    if (ok(randomness_result)) {
        initialized = randomness_result.ok;
        console.log('heartbeat initialized', randomness_result.ok.length);
    }
}

export function get_initialized(): Query<blob> {
    return initialized;
}

// class API

import { heartbeat, query } from 'azle';

export default class {
    initialized: blob = Uint8Array.from([]);

    @heartbeat
    async heartbeat_() {
        const randomness_result = await management_canister.raw_rand().call();

        if (ok(randomness_result)) {
            this.initialized = randomness_result.ok;
            console.log('heartbeat initialized', randomness_result.ok.length);
        }
    }

    @query
    get_initialized(): blob {
        return this.initialized;
    }
}
