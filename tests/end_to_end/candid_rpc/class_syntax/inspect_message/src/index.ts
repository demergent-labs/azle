import { acceptMessage, IDL, inspectMessage, methodName, update } from 'azle';

export default class {
    @inspectMessage
    inspectMessage(): void {
        console.info('inspectMessage called');

        if (methodName() === 'accessible') {
            acceptMessage();
            return;
        }

        if (methodName() === 'inaccessible') {
            return;
        }

        throw `Method "${methodName()}" not allowed`;
    }

    @update([], IDL.Bool)
    accessible(): boolean {
        return true;
    }

    @update([], IDL.Bool)
    inaccessible(): boolean {
        return false;
    }

    @update([], IDL.Bool)
    alsoInaccessible(): boolean {
        return false;
    }
}
