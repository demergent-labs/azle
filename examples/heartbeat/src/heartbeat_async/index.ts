import { blob, $heartbeat, match, $query } from 'azle';
import { managementCanister } from 'azle/canisters/management';

let initialized: blob = Uint8Array.from([]);

$heartbeat;
export async function heartbeat(): Promise<void> {
    const randomnessResult = await managementCanister.raw_rand().call();

    match(randomnessResult, {
        Ok: (randomness) => {
            initialized = randomness;
            console.log('heartbeat initialized', randomness.length);
        },
        Err: () => {}
    });
}

$query;
export function getInitialized(): blob {
    return initialized;
}
