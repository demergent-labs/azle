import { candidEncode, notify, trap } from 'azle';
import { Canister, Principal, update, Void } from 'azle/experimental';

export default Canister({
    sendNotification: update([], Void, () => {
        return notify(
            Principal.fromText(
                process.env.CANISTER2_PRINCIPAL ??
                    trap('process.env.CANISTER2_PRINCIPAL is undefined')
            ),
            'receiveNotification',
            {
                raw: candidEncode('()'),
                cycles: 0n
            }
        );
    })
});
