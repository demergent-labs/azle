import { ic, Principal, Service, update, Void } from 'azle';

export default Service({
    sendNotification: update([], Void, () => {
        return ic.notifyRaw(
            Principal.fromText(
                process.env.CANISTER2_PRINCIPAL ??
                    ic.trap('process.env.CANISTER2_PRINCIPAL is undefined')
            ),
            'receiveNotification',
            Uint8Array.from(ic.candidEncode('()')),
            0n
        );
    })
});
