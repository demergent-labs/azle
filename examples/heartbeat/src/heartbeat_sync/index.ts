import { $heartbeat, $query } from 'azle';

let initialized = false;

$heartbeat;
export function heartbeat(): void {
    initialized = true;
    console.log('heartbeat initialized', initialized);
}

$query;
export function getInitialized(): boolean {
    return initialized;
}
