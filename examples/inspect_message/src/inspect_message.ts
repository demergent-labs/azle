import { ic, InspectMessage, Update } from 'azle';

export function inspectMessage(): InspectMessage {
    console.log('inspectMessage called');
    ic.accept_message();
}

export function acceptMessage(): Update<boolean> {
    return true;
}
