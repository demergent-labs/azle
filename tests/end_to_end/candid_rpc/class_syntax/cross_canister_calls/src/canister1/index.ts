import { call, IDL, notify, update } from 'azle';

import { Account, AccountArgs } from '../canister2/types';

const canister2Id: string = getCanister2Id();

export default class {
    @update([IDL.Text, IDL.Text, IDL.Nat64], IDL.Nat64)
    async transfer(from: string, to: string, amount: bigint): Promise<bigint> {
        return await call(canister2Id, 'transfer', {
            paramIdls: [IDL.Text, IDL.Text, IDL.Nat64],
            returnIdl: IDL.Nat64,
            args: [from, to, amount]
        });
    }

    @update([IDL.Text], IDL.Nat64)
    async balance(id: string): Promise<bigint> {
        return await call(canister2Id, 'balance', {
            paramIdls: [IDL.Text],
            returnIdl: IDL.Nat64,
            args: [id]
        });
    }

    @update([AccountArgs], IDL.Opt(Account))
    async account(args: AccountArgs): Promise<[Account] | []> {
        return await call(canister2Id, 'account', {
            paramIdls: [AccountArgs],
            returnIdl: IDL.Opt(Account),
            args: [args]
        });
    }

    @update([], IDL.Vec(Account))
    async accounts(): Promise<Account[]> {
        return await call(canister2Id, 'accounts', {
            returnIdl: IDL.Vec(Account)
        });
    }

    @update([], IDL.Empty)
    async trap(): Promise<never> {
        return (await call(canister2Id, 'trap')) as never;
    }

    @update([])
    sendNotification(): void {
        return notify(canister2Id, 'receiveNotification', {
            paramIdls: [IDL.Text],
            args: ['This is the notification'],
            payment: 10n
        });
    }
}

function getCanister2Id(): string {
    if (process.env.CANISTER2_PRINCIPAL !== undefined) {
        return process.env.CANISTER2_PRINCIPAL;
    }

    if (globalThis._azleInsideCanister === true) {
        return 'PRE_INIT_EXECUTION';
    }

    throw new Error(`process.env.CANISTER2_PRINCIPAL is not defined`);
}
