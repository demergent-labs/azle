import { IDL, query, update } from 'azle';

export default class {
    @update([])
    sendNotification() {
        return ic.notifyRaw(
            Principal.fromText(
                process.env.CANISTER2_PRINCIPAL ??
                    ic.trap('process.env.CANISTER2_PRINCIPAL is undefined')
            ),
            'receiveNotification',
            Uint8Array.from(ic.candidEncode('()')),
            0n
        );
    }
}
