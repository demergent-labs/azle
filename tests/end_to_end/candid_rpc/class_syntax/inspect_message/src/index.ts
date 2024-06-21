import { acceptMessage, IDL, inspectMessage, methodName, update } from 'azle';

export default class {
    @inspectMessage
    inspectMessage() {
        console.log('inspectMessage called');

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
