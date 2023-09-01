import { ic, nat64, Opt, query, text, update, Vec, Void } from 'azle';
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

export default class {
    @update([text, text, nat64], nat64)
    transfer(from: string, to: string, amount: nat64): nat64 {
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

    @query([text], nat64)
    balance(id: text): nat64 {
        return state.accounts[id]?.balance ?? 0n;
    }

    // TODO use Some and None
    @query([AccountArgs], Opt(Account as any))
    account(accountArgs: AccountArgs): Opt<Account> {
        const account = state.accounts[accountArgs.id];
        return account ? [account] : [];
    }

    @query([], Vec(Account as any))
    accounts(): Vec<Account> {
        return Object.values(state.accounts);
    }

    @query([], text)
    trap(): text {
        ic.trap('hahahaha');
        return 'You will never get here';
    }

    @update([text], Void)
    receiveNotification(message: text): void {
        state.notification = message;
    }

    @query([], text)
    getNotification(): text {
        return state.notification;
    }
}
