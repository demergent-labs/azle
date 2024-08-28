import { IDL, query, trap, update } from 'azle';

import { Account, AccountArgs, State } from './types';

export default class {
    state: State = {
        accounts: {
            '0': {
                id: '0',
                balance: 100n
            }
        },
        notification: ''
    };

    @update([IDL.Text, IDL.Text, IDL.Nat64], IDL.Nat64)
    transfer(from: string, to: string, amount: bigint): bigint {
        const fromAccount: Account | undefined = this.state.accounts[from];
        if (fromAccount === undefined) {
            this.state.accounts[from] = {
                id: from,
                balance: 0n
            };
        }
        const fromBalance = this.state.accounts[from].balance;
        if (fromBalance < amount) {
            return 0n;
        }
        const toBalance: bigint | undefined = this.state.accounts[to]?.balance;
        if (toBalance === undefined) {
            this.state.accounts[to] = {
                id: to,
                balance: 0n
            };
        }
        this.state.accounts[from].balance -= amount;
        this.state.accounts[to].balance += amount;
        return amount;
    }

    @query([IDL.Text], IDL.Nat64)
    balance(id: string): bigint {
        return this.state.accounts[id]?.balance ?? 0n;
    }

    @query([AccountArgs], IDL.Opt(Account))
    account(accountArgs: AccountArgs): [Account] | [] {
        const account = this.state.accounts[accountArgs.id];
        return account ? [account] : [];
    }

    @query([], IDL.Vec(Account))
    accounts(): Account[] {
        return Object.values(this.state.accounts);
    }

    @query([], IDL.Empty)
    trap(): never {
        trap('hahahaha');
    }

    @update([IDL.Text])
    receiveNotification(message: string): void {
        this.state.notification = message;
    }

    @query([], IDL.Text)
    getNotification(): string {
        return this.state.notification;
    }
}
