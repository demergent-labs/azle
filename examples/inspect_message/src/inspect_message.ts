import { InspectMessage, Update } from 'azle';

let initialized = false;

export function inspectMessage(): InspectMessage {
    initialized = true;
    console.log('inspect_message initialized', initialized);
}

export function getInitialized(): Update<boolean> {
    return initialized;
}
