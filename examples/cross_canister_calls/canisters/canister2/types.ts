import {
    CallResult,
    nat64,
    Opt,
    Record,
    Service,
    serviceQuery,
    serviceUpdate,
    Vec
} from 'azle';

// TODO start using principals instead of strings for ids
export type State = {
    accounts: {
        [id: string]: Account;
    };
    notification: string;
};

export type Account = Record<{
    id: string;
    balance: nat64;
}>;

export type AccountArgs = Record<{
    id: string;
}>;

export class Canister2 extends Service {
    @serviceUpdate
    transfer: (from: string, to: string, amount: nat64) => CallResult<nat64>;

    @serviceQuery
    balance: (id: string) => CallResult<nat64>;

    @serviceQuery
    account: (accountArgs: AccountArgs) => CallResult<Opt<Account>>;

    @serviceQuery
    accounts: () => CallResult<Vec<Account>>;

    @serviceQuery
    trap: () => CallResult<string>;

    @serviceUpdate
    receiveNotification: (message: string) => CallResult<void>;
}
