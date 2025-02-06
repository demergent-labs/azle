import { call, Principal, trap, update } from 'azle';

export default class {
    @update
    async sendNotification(): Promise<void> {
        return await call<undefined, void>(
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
    }
}
