import { blob, ok, Query, Heartbeat } from 'azle';
import { management_canister } from 'azle/canisters/management';

let initialized: blob = Uint8Array.from([]);

export async function heartbeat(): Promise<Heartbeat> {
    const randomness_result = await management_canister.raw_rand().call();

    if (ok(randomness_result)) {
        initialized = randomness_result.ok;
        console.log('heartbeat initialized', randomness_result.ok.length);
    }
}

export function get_initialized(): Query<blob> {
    return initialized;
}
