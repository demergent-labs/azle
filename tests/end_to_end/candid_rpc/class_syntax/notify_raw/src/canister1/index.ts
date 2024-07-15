import { candidEncode, notify, Principal, trap, update } from 'azle';

export default class {
    @update([])
    sendNotification(): void {
        return notify(
            Principal.fromText(
                process.env.CANISTER2_PRINCIPAL ??
                    trap('process.env.CANISTER2_PRINCIPAL is undefined')
            ),
            'receiveNotification',
            {
                raw: Uint8Array.from(candidEncode('()')),
                payment: 0n
            }
        );
    }
}
