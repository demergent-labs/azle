import { acceptMessage, msgMethodName } from 'azle';
import {
    bool,
    Canister,
    inspectMessage,
    nat64,
    Record,
    text,
    update
} from 'azle/experimental';

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
    accessible: update([text], bool, (message) => {
        console.info(`accessible called with message: ${message}`);
        return true;
    }),
    inaccessible: update([nat64], bool, (number) => {
        console.info(`inaccessible called with number: ${number}`);
        return false;
    }),
    alsoInaccessible: update([Record({ prop1: text })], bool, (record) => {
        console.info(`alsoInaccessible called with record: ${record}`);
        return false;
    })
});
