import { bool, ic, inspectMessage, Service, update } from 'azle';

export default Service({
    inspectMessage: inspectMessage(() => {
        console.log('inspectMessage called');

        if (ic.methodName() === 'accessible') {
            ic.acceptMessage();
            return;
        }

        if (ic.methodName() === 'inaccessible') {
            return;
        }

        throw `Method "${ic.methodName()}" not allowed`;
    }),
    accessible: update([], bool, () => {
        return true;
    }),
    inaccessible: update([], bool, () => {
        return false;
    }),
    alsoInaccessible: update([], bool, () => {
        return false;
    })
});
