import { acceptMessage, msgMethodName } from 'azle';
import { bool, Canister, inspectMessage, update } from 'azle/experimental';

export default Canister({
    inspectMessage: inspectMessage(() => {
        console.info('inspectMessage called');

        if (msgMethodName() === 'accessible') {
            acceptMessage();
            return;
        }

        if (msgMethodName() === 'inaccessible') {
            return;
        }

        throw `Method "${msgMethodName()}" not allowed`;
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
