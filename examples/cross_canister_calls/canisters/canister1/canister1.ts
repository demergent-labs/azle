import {
    ic,
    nat64,
    Opt,
    Principal,
    Service,
    text,
    update,
    Vec,
    Void
} from 'azle';
import { Account, AccountArgs, Canister2 } from '../canister2/types';

export default class extends Service {
    canister2 = new Canister2(
        Principal.fromText(
            process.env.CANISTER2_PRINCIPAL ??
                ic.trap('process.env.CANISTER2_PRINCIPAL is undefined')
        )
    );

    @update([text, text, nat64], nat64)
    async transfer(from: text, to: text, amount: nat64): Promise<nat64> {
        return await ic.call(this.canister2.transfer, {
            args: [from, to, amount]
        });
    }

    @update([text], nat64)
    async balance(id: text): Promise<nat64> {
        return await ic.call(this.canister2.balance, {
            args: [id]
        });
    }

    @update([AccountArgs], Opt(Account))
    async account(args: AccountArgs): Promise<Opt<Account>> {
        return await ic.call(this.canister2.account, {
            args: [args]
        });
    }

    @update([], Vec(Account))
    async accounts(): Promise<Vec<Account>> {
        return await ic.call(this.canister2.accounts, {
            args: []
        });
    }

    @update([], text)
    async trap(): Promise<text> {
        return await ic.call(this.canister2.trap, {
            args: []
        });
    }

    @update([], Void)
    sendNotification(): Void {
        return ic.notify(this.canister2.receiveNotification, {
            args: ['This is the notification'],
            cycles: 10n
        });
    }
}
