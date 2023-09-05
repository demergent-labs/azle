import {
    candid,
    nat64,
    Opt,
    record,
    Record,
    query,
    Service,
    text,
    update,
    Vec,
    Void
} from 'azle';

// TODO start using principals instead of strings for ids
export type State = {
    accounts: {
        [id: string]: Account;
    };
    notification: string;
};

@record
export class Account extends Record {
    @candid(text)
    id: text;

    @candid(nat64)
    balance: nat64;
}

@record
export class AccountArgs extends Record {
    @candid(text)
    id: text;
}

export class Canister2 extends Service {
    @update([text, text, nat64], nat64)
    transfer: (from: text, to: text, amount: nat64) => nat64;

    @query([text], nat64)
    balance: (id: text) => nat64;

    @query([AccountArgs], Opt(Account as any))
    account: (accountArgs: AccountArgs) => Opt<Account>;

    @query([], Vec(Account as any))
    accounts: () => Vec<Account>;

    @query([], text)
    trap: () => text;

    @update([text], Void)
    receiveNotification: (message: text) => Void;
}
