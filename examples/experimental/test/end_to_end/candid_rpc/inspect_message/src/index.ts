import { acceptMessage, methodName } from 'azle';
import { bool, Canister, inspectMessage, update } from 'azle/experimental';

export default Canister({
    inspectMessage: inspectMessage(() => {
        console.info('inspectMessage called');

        if (methodName() === 'accessible') {
            acceptMessage();
            return;
        }

        if (methodName() === 'inaccessible') {
            return;
        }

        throw `Method "${methodName()}" not allowed`;
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
