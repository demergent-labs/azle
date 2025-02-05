import { call, candidEncode, Principal, trap, update } from 'azle';

export default class {
    @update
    async sendNotification(): Promise<void> {
        return await call<Uint8Array, void>(
            Principal.fromText(
                process.env.CANISTER2_PRINCIPAL ??
                    trap('process.env.CANISTER2_PRINCIPAL is undefined')
            ),
            'receiveNotification',
            {
                args: Uint8Array.from(candidEncode('()')),
                cycles: 0n,
                oneway: true,
                raw: true
            }
        );
    }
}
