import { Query, Heartbeat } from 'azle';

let inititalized = false;

export function heartbeat(): Heartbeat {
    inititalized = true;
    console.log('heartbeat initialized', inititalized);
}

export function get_initialized(): Query<boolean> {
    return inititalized;
}
