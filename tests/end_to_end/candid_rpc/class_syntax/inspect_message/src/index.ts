import { ic, IDL, inspectMessage, update } from 'azle';

export default class {
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

    @update([], IDL.Bool)
    accessible() {
        return true;
    }

    @update([], IDL.Bool)
    inaccessible() {
        return false;
    }

    @update([], IDL.Bool)
    alsoInaccessible() {
        return false;
    }
}
