import { ic, InspectMessage, Update } from 'azle';

export function inspect_message_(): InspectMessage {
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

// class API

import { inspect_message, update } from 'azle';

export default class {
    @inspect_message
    inspect_message_() {
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

    @update
    accessible(): boolean {
        return true;
    }

    @update
    inaccessible(): boolean {
        return false;
    }

    @update
    also_inaccessible(): boolean {
        return false;
    }
}
