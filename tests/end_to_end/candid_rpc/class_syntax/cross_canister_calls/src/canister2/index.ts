import { IDL, query, trap, update } from 'azle';

import { Account, AccountArgs, State } from './types';

let state: State = {
    accounts: {
        '0': {
            id: '0',
            balance: 100n
        }
    },
    notification: ''
};

export default class {
    @update([IDL.Text, IDL.Text, IDL.Nat64], IDL.Nat64)
    transfer(from: string, to: string, amount: bigint): bigint {
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
        const toBalance: bigint | undefined = state.accounts[to]?.balance;
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

    @query([IDL.Text], IDL.Nat64)
    balance(id: string): bigint {
        return state.accounts[id]?.balance ?? 0n;
    }

    @query([AccountArgs], IDL.Opt(Account))
    account(accountArgs: AccountArgs): [Account] | [] {
        const account = state.accounts[accountArgs.id];
        return account ? [account] : [];
    }

    @query([], IDL.Vec(Account))
    accounts(): Account[] {
        return Object.values(state.accounts);
    }

    @query([], IDL.Empty)
    trap(): never {
        trap('hahahaha');
    }

    @update([IDL.Text])
    receiveNotification(message: string): void {
        state.notification = message;
    }

    @query([], IDL.Text)
    getNotification(): string {
        return state.notification;
    }
}
