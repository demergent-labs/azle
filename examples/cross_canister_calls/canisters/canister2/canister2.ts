import {
    Query,
    Update,
    nat64,
    Opt,
    ic
} from 'azle';
import {
    State,
    Account,
    AccountArgs
} from './types';

let state: State = {
    accounts: {
        '0': {
            id: '0',
            balance: 100n
        }
    }
};

export function transfer(
    from: string,
    to: string,
    amount: nat64
): Update<nat64> {
    const fromBalance: nat64 = state.accounts[from]?.balance ?? 0n;

    if (fromBalance < amount) {
        return 0n;
    }

    const toBalance: nat64 | undefined = state.accounts[to]?.balance;

    if (toBalance === undefined) {
        state.accounts[to] = {
            id: to,
            balance: 0n
        };
    }

    state.accounts[from].balance -= amount;
    state.accounts[to].balance += amount;

    return amount;
}

export function balance(id: string): Query<nat64> {
    return state.accounts[id]?.balance ?? 0n;
}

export function account(accountArgs: AccountArgs): Query<Opt<Account>> {
    return state.accounts[accountArgs.id] ?? null;
}

export function accounts(): Query<Account[]> {
    return Object.values(state.accounts);
}

export function trap(): Query<string> {
    ic.trap('hahahaha');
    return 'You will never get here';
}