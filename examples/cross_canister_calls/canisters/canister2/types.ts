import {
    CanisterResult,
    ExternalCanister,
    nat64,
    Opt,
    query,
    update
} from 'azle';

// TODO start using principals instead of strings for ids
export type State = {
    accounts: {
        [id: string]: Account;
    };
    notification: string;
};

export type Account = {
    id: string;
    balance: nat64;
};

export type AccountArgs = {
    id: string;
};

export class Canister2 extends ExternalCanister {
    @update
    transfer: (
        from: string,
        to: string,
        amount: nat64
    ) => CanisterResult<nat64>;

    @query
    balance: (id: string) => CanisterResult<nat64>;

    @query
    account: (accountArgs: AccountArgs) => CanisterResult<Opt<Account>>;

    @query
    accounts: () => CanisterResult<Account[]>;

    @query
    trap: () => CanisterResult<string>;

    @update
    receive_notification: (message: string) => CanisterResult<void>;
}
