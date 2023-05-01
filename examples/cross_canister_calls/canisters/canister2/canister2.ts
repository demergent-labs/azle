import { ic, nat64, Opt, $query, $update, Vec } from 'azle';
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
    const fromAccount: Account | undefined = state.accounts[from];

    if (fromAccount === undefined) {
        state.accounts[from] = {
            id: from,
            balance: 0n
        };
    }

    const fromBalance = state.accounts[from].balance;

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

$query;
export function balance(id: string): nat64 {
    return state.accounts[id]?.balance ?? 0n;
}

$query;
export function account(accountArgs: AccountArgs): Opt<Account> {
    const account = state.accounts[accountArgs.id];
    return account ? Opt.Some(account) : Opt.None;
}

$query;
export function accounts(): Vec<Account> {
    return Object.values(state.accounts);
}

$query;
export function trap(): string {
    ic.trap('hahahaha');
    return 'You will never get here';
}

$update;
export function receiveNotification(message: string): void {
    state.notification = message;
}

$query;
export function getNotification(): string {
    return state.notification;
}
