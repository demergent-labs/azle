import { ic, nat64, Opt, $query, $update } from 'azle';
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

$update;
export function transfer(from: string, to: string, amount: nat64): nat64 {
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

$query;
export function balance(id: string): nat64 {
    return state.accounts[id]?.balance ?? 0n;
}

$query;
export function account(accountArgs: AccountArgs): Opt<Account> {
    return state.accounts[accountArgs.id] ?? null;
}

$query;
export function accounts(): Account[] {
    return Object.values(state.accounts);
}

$query;
export function trap(): string {
    ic.trap('hahahaha');
    return 'You will never get here';
}

$update;
export function receive_notification(message: string): void {
    state.notification = message;
}

$query;
export function get_notification(): string {
    return state.notification;
}
