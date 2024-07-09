import { candidEncode, notifyRaw, Principal, trap, update } from 'azle';

export default class {
    @update([])
    sendNotification(): void {
        return notifyRaw(
            Principal.fromText(
                process.env.CANISTER2_PRINCIPAL ??
                    trap('process.env.CANISTER2_PRINCIPAL is undefined')
            ),
            'receiveNotification',
            Uint8Array.from(candidEncode('()')),
            0n
        );
    }
}
