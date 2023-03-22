import {
    CanisterResult,
    nat64,
    Opt,
    Record,
    Service,
    serviceQuery,
    serviceUpdate
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
    transfer: (
        from: string,
        to: string,
        amount: nat64
    ) => CanisterResult<nat64>;

    @serviceQuery
    balance: (id: string) => CanisterResult<nat64>;

    @serviceQuery
    account: (accountArgs: AccountArgs) => CanisterResult<Opt<Account>>;

    @serviceQuery
    accounts: () => CanisterResult<Account[]>;

    @serviceQuery
    trap: () => CanisterResult<string>;

    @serviceUpdate
    receiveNotification: (message: string) => CanisterResult<void>;
}
