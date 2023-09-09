import { bool, ic, inspectMessage, Service, update } from 'azle';

export default class extends Service {
    @inspectMessage
    inspectMessage() {
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

    @update([], bool)
    accessible(): bool {
        return true;
    }

    @update([], bool)
    inaccessible(): bool {
        return false;
    }

    @update([], bool)
    alsoInaccessible(): bool {
        return false;
    }
}
