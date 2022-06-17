import { InspectMessage, Update } from 'azle';

export function inspectMessage(): InspectMessage {
    console.log('inspect_message initialized');
}

// This method will always return a 403
export function getInitialized(): Update<boolean> {
    return true;
}
