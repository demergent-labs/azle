import { call, trap } from 'azle';
import { Canister, Principal, update, Void } from 'azle/experimental';

export default Canister({
    sendNotification: update([], Void, async () => {
        return await call(
            Principal.fromText(
                process.env.CANISTER2_PRINCIPAL ??
                    trap('process.env.CANISTER2_PRINCIPAL is undefined')
            ),
            'receiveNotification',
            {
                cycles: 0n,
                oneway: true,
                raw: true
            }
        );
    })
});
