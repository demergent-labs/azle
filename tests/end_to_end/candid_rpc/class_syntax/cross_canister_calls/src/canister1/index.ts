import { call, IDL, notify, update } from 'azle';

import { Account, AccountArgs } from '../canister2/types';

export default class {
    canister2Id: string = getCanister2Id();

    @update([IDL.Text, IDL.Text, IDL.Nat64], IDL.Nat64)
    async transfer(from: string, to: string, amount: bigint): Promise<bigint> {
        return await call(this.canister2Id, 'transfer', {
            paramIdlTypes: [IDL.Text, IDL.Text, IDL.Nat64],
            returnIdlType: IDL.Nat64,
            args: [from, to, amount]
        });
    }

    @update([IDL.Text], IDL.Nat64)
    async balance(id: string): Promise<bigint> {
        return await call(this.canister2Id, 'balance', {
            paramIdlTypes: [IDL.Text],
            returnIdlType: IDL.Nat64,
            args: [id]
        });
    }

    @update([AccountArgs], IDL.Opt(Account))
    async account(args: AccountArgs): Promise<[Account] | []> {
        return await call(this.canister2Id, 'account', {
            paramIdlTypes: [AccountArgs],
            returnIdlType: IDL.Opt(Account),
            args: [args]
        });
    }

    @update([], IDL.Vec(Account))
    async accounts(): Promise<Account[]> {
        return await call(this.canister2Id, 'accounts', {
            returnIdlType: IDL.Vec(Account)
        });
    }

    @update([], IDL.Empty)
    async trap(): Promise<never> {
        return (await call(this.canister2Id, 'trap')) as never;
    }

    @update([])
    sendNotification(): void {
        return notify(this.canister2Id, 'receiveNotification', {
            paramIdlTypes: [IDL.Text],
            args: ['This is the notification'],
            payment: 10n
        });
    }
}

function getCanister2Id(): string {
    if (process.env.CANISTER2_PRINCIPAL !== undefined) {
        return process.env.CANISTER2_PRINCIPAL;
    }

    throw new Error(`process.env.CANISTER2_PRINCIPAL is not defined`);
}
