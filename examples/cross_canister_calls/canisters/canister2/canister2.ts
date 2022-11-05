import { Query, Update, nat64, Opt, ic } from 'azle';
import { State, Account, AccountArgs } from './types';

let state: State = {
    accounts: {
        '0': {
            id: '0',
            balance: 100n
        }
    },
    notification: ''
};

export function transfer(
    from: string,
    to: string,
    amount: nat64
): Update<nat64> {
    const from_account: Account | undefined = state.accounts[from];

    if (from_account === undefined) {
        state.accounts[from] = {
            id: from,
            balance: 0n
        };
    }

    const from_balance = state.accounts[from].balance;

    if (from_balance < amount) {
        return 0n;
    }

    const to_balance: nat64 | undefined = state.accounts[to]?.balance;

    if (to_balance === undefined) {
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

export function receive_notification(message: string): Update<void> {
    state.notification = message;
}

export function get_notification(): Query<string> {
    return state.notification;
}
