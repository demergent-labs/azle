import { $heartbeat, $query } from 'azle';

let initialized = false;

$heartbeat;
export function heartbeat() {
    initialized = true;
    console.log('heartbeat initialized', initialized);
}

$query;
export function get_initialized(): boolean {
    return initialized;
}
