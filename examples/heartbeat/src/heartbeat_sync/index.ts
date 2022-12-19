import { Query, Heartbeat } from 'azle';

let initialized = false;

export function heartbeat(): Heartbeat {
    initialized = true;
    console.log('heartbeat initialized', initialized);
}

export function get_initialized(): Query<boolean> {
    return initialized;
}
