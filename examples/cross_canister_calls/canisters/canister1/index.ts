import {
    Canister,
    ic,
    init,
    nat64,
    Opt,
    Principal,
    text,
    update,
    Vec,
    Void
} from 'azle';
import Canister2 from '../canister2';
import { Account, AccountArgs } from '../canister2/types';

let canister2: typeof Canister2;

export default Canister({
    init: init([], () => {
        canister2 = Canister2(
            Principal.fromText(
                process.env.CANISTER2_PRINCIPAL ??
                    ic.trap('process.env.CANISTER2_PRINCIPAL is undefined')
            )
        );
    }),
    transfer: update([text, text, nat64], nat64, async (from, to, amount) => {
        return await ic.call(canister2.transfer, {
            args: [from, to, amount]
        });
    }),
    balance: update([text], nat64, async (id) => {
        return await ic.call(canister2.balance, {
            args: [id]
        });
    }),
    account: update([AccountArgs], Opt(Account), async (args) => {
        return await ic.call(canister2.account, {
            args: [args]
        });
    }),
    accounts: update([], Vec(Account), async () => {
        return await ic.call(canister2.accounts, {
            args: []
        });
    }),
    trap: update([], text, async () => {
        return await ic.call(canister2.trap, {
            args: []
        });
    }),
    sendNotification: update([], Void, () => {
        return ic.notify(canister2.receiveNotification, {
            args: ['This is the notification'],
            cycles: 10n
        });
    })
});
