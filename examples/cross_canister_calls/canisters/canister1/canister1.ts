import {
    ic,
    nat64,
    NotifyResult,
    Opt,
    Principal,
    text,
    update,
    Vec
} from 'azle';
import { Account, AccountArgs, Canister2 } from '../canister2/types';

// TODO figure out environment variables
const canister2 = new Canister2(
    Principal.fromText(
        process.env.CANISTER2_PRINCIPAL ??
            ic.trap('process.env.CANISTER2_PRINCIPAL is undefined')
    )
);

export default class {
    @update([text, text, nat64], nat64)
    async transfer(from: text, to: text, amount: nat64): Promise<nat64> {
        return await ic.call(canister2.transfer, {
            args: [from, to, amount]
        });
    }

    @update([text], nat64)
    async balance(id: text): Promise<nat64> {
        return await ic.call(canister2.balance, {
            args: [id]
        });
    }

    @update([AccountArgs], Opt(Account))
    async account(args: AccountArgs): Promise<Opt<Account>> {
        return await ic.call(canister2.account, {
            args: [args]
        });
    }

    @update([], Vec(Account))
    async accounts(): Promise<Vec<Account>> {
        return await ic.call(canister2.accounts, {
            args: []
        });
    }

    @update([], text)
    async trap(): Promise<text> {
        return await ic.call(canister2.trap, {
            args: []
        });
    }

    @update([], NotifyResult)
    sendNotification(): NotifyResult {
        return ic.notify(canister2.receiveNotification, {
            args: ['This is the notification'],
            cycles: 10n
        });
    }
}
