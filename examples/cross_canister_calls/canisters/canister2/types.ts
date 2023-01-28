import {
    Canister,
    CanisterResult,
    ExternalCanister,
    method,
    nat64,
    Opt
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

export type Canister2Old = Canister<{
    transfer(from: string, to: string, amount: nat64): CanisterResult<nat64>;
    balance(id: string): CanisterResult<nat64>;
    account(accountArgs: AccountArgs): CanisterResult<Opt<Account>>;
    accounts(): CanisterResult<Account[]>;
    trap(): CanisterResult<string>;
    receive_notification(message: string): CanisterResult<void>;
}>;

export class Canister2 extends ExternalCanister {
    @method
    transfer: (
        from: string,
        to: string,
        amount: nat64
    ) => CanisterResult<nat64>;

    @method
    balance: (id: string) => CanisterResult<nat64>;

    @method
    account: (accountArgs: AccountArgs) => CanisterResult<Opt<Account>>;

    @method
    accounts: () => CanisterResult<Account[]>;

    @method
    trap: () => CanisterResult<string>;

    @method
    receive_notification: (message: string) => CanisterResult<void>;
}
