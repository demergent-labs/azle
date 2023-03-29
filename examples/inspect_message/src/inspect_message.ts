import { ic, $inspectMessage, $update } from 'azle';

$inspectMessage;
export function inspectMessage(): void {
    console.log('inspectMessage called');

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
export function alsoInaccessible(): boolean {
    return false;
}
