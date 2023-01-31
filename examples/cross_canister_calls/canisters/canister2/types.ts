import { Canister, CanisterResult, nat64, Opt } from 'azle';

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

export type Canister2Old = Canister<{
    transfer(from: string, to: string, amount: nat64): CanisterResult<nat64>;
    balance(id: string): CanisterResult<nat64>;
    account(accountArgs: AccountArgs): CanisterResult<Opt<Account>>;
    accounts(): CanisterResult<Account[]>;
    trap(): CanisterResult<string>;
    receive_notification(message: string): CanisterResult<void>;
}>;

// class API

import { ExternalCanister, query, update } from 'azle';

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
