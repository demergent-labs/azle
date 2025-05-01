import { msgMethodName } from 'azle';
import {
    bool,
    Canister,
    ic,
    inspectMessage,
    nat64,
    Record,
    text,
    update
} from 'azle/experimental';

export default Canister({
    inspectMessage: inspectMessage(() => {
        console.info('inspectMessage called');

        const methodName = msgMethodName();

        if (
            methodName === 'accessible' ||
            methodName === '_azle_reject_callbacks_len' ||
            methodName === '_azle_resolve_callbacks_len' ||
            methodName === '_azle_timer_callbacks_len' ||
            methodName === '_azle_actions_len' ||
            methodName === '_azle_inter_canister_call_futures_len'
        ) {
            ic.acceptMessage();
            return;
        }

        if (methodName === 'inaccessible') {
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
