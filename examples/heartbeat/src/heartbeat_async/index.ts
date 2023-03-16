import { blob, $heartbeat, match, $query } from 'azle';
import { management_canister } from 'azle/canisters/management';

let initialized: blob = Uint8Array.from([]);

$heartbeat;
export async function heartbeat(): Promise<void> {
    const randomness_result = await management_canister.raw_rand().call();

    match(randomness_result, {
        ok: (randomness) => {
            initialized = randomness;
            console.log('heartbeat initialized', randomness.length);
        },
        err: () => {}
    });
}

$query;
export function get_initialized(): blob {
    return initialized;
}
