import {
    UpdateAsync,
    ic,
    nat64,
    Canister,
    Opt
} from 'azle';
import {
    Account,
    AccountArgs
} from '../canister2/types';

type Canister2 = Canister<{
    transfer(
        from: string,
        to: string,
        amount: nat64
    ): UpdateAsync<nat64>;
    balance(id: string): UpdateAsync<nat64>;
    account(accountArgs: AccountArgs): UpdateAsync<Opt<Account>>;
    accounts(): UpdateAsync<Account[]>
}>;

let canister2 = ic.canisters.Canister2<Canister2>('ryjl3-tyaaa-aaaaa-aaaba-cai');

export function* transfer(
    from: string,
    to: string,
    amount: nat64
): UpdateAsync<nat64> {
    return yield canister2.transfer(
        from,
        to,
        amount
    );
}

export function* balance(id: string): UpdateAsync<nat64> {
    return yield canister2.balance(id);
}

export function* account(args: AccountArgs): UpdateAsync<Opt<Account>> {
    return yield canister2.account(args);
}

export function* accounts(): UpdateAsync<Account[]> {
    return yield canister2.accounts();
}