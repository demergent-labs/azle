import { ic, InspectMessage, Update } from 'azle';

export function inspect_message(): InspectMessage {
    console.log('inspect_message called');

    if (ic.method_name() === 'accessible') {
        ic.accept_message();
        return;
    }

    if (ic.method_name() === 'inaccessible') {
        return;
    }

    throw `Method "${ic.method_name()}" not allowed`;
}

export function accessible(): Update<boolean> {
    return true;
}

export function inaccessible(): Update<boolean> {
    return false;
}

export function also_inaccessible(): Update<boolean> {
    return false;
}
