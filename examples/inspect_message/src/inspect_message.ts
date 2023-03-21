import { ic, $inspectMessage, $update } from 'azle';

$inspectMessage;
export function inspect_message() {
    console.log('inspect_message called');

    if (ic.methodName() === 'accessible') {
        ic.acceptMessage();
        return;
    }

    if (ic.methodName() === 'inaccessible') {
        return;
    }

    throw `Method "${ic.methodName()}" not allowed`;
}

$update;
export function accessible(): boolean {
    return true;
}

$update;
export function inaccessible(): boolean {
    return false;
}

$update;
export function also_inaccessible(): boolean {
    return false;
}
