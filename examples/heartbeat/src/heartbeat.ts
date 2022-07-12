import { Query, Heartbeat } from 'azle';

let inititalized = false;

export function heartbeat(): Heartbeat {
    inititalized = true;
    console.log('heartbeat initialized', inititalized);
}

export function getInitialized(): Query<boolean> {
    return inititalized;
}
