import {
    Query,
    Heartbeat,
    ic
} from 'azle';

let inititalized = false;

export function heartbeat(): Heartbeat {
    inititalized = true;
    ic.print('heartbeat initialized', inititalized);
}

export function getInitialized(): Query<boolean> {
    return inititalized;
}