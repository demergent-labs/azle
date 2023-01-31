import { blob, $heartbeat, ok, $query } from 'azle';
import { management_canister } from 'azle/canisters/management';

let initialized: blob = Uint8Array.from([]);

$heartbeat;
export async function heartbeat(): Promise<void> {
    const randomness_result = await management_canister.raw_rand().call();

    if (ok(randomness_result)) {
        initialized = randomness_result.ok;
        console.log('heartbeat initialized', randomness_result.ok.length);
    }
}

$query;
export function get_initialized(): blob {
    return initialized;
}
