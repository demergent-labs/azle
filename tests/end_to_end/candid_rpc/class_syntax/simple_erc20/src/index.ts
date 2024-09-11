import { IDL, query, update } from 'azle';

type Account = {
    address: string;
    balance: bigint;
};

type State = {
    accounts: {
        [key: string]: Account;
    };
    name: string;
    ticker: string;
    totalSupply: bigint;
};

export default class {
    state: State = {
        accounts: {},
        name: '',
        ticker: '',
        totalSupply: 0n
    };

    @update([IDL.Text, IDL.Text, IDL.Text, IDL.Nat64], IDL.Bool)
    initializeSupply(
        name: string,
        originalAddress: string,
        ticker: string,
        totalSupply: bigint
    ): boolean {
        this.state = {
            ...this.state,
            accounts: {
                [originalAddress]: {
                    address: originalAddress,
                    balance: totalSupply
                }
            },
            name,
            ticker,
            totalSupply
        };

        return true;
    }

    @update([IDL.Text, IDL.Text, IDL.Nat64], IDL.Bool)
    transfer(fromAddress: string, toAddress: string, amount: bigint): boolean {
        if (this.state.accounts[toAddress] === undefined) {
            this.state.accounts[toAddress] = {
                address: toAddress,
                balance: 0n
            };
        }

        this.state.accounts[fromAddress].balance -= amount;
        this.state.accounts[toAddress].balance += amount;

        return true;
    }

    @query([IDL.Text], IDL.Nat64)
    balance(address: string): bigint {
        return this.state.accounts[address]?.balance ?? 0n;
    }

    @query([], IDL.Text)
    ticker(): string {
        return this.state.ticker;
    }

    @query([], IDL.Text)
    name(): string {
        return this.state.name;
    }

    @query([], IDL.Nat64)
    totalSupply(): bigint {
        return this.state.totalSupply;
    }
}
