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

let state: State = {
    accounts: {},
    name: '',
    ticker: '',
    totalSupply: 0n
};

export default class {
    @update([IDL.Text, IDL.Text, IDL.Text, IDL.Nat64], IDL.Bool)
    initializeSupply(
        name: string,
        originalAddress: string,
        ticker: string,
        totalSupply: bigint
    ): boolean {
        state = {
            ...state,
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
        if (state.accounts[toAddress] === undefined) {
            state.accounts[toAddress] = {
                address: toAddress,
                balance: 0n
            };
        }

        state.accounts[fromAddress].balance -= amount;
        state.accounts[toAddress].balance += amount;

        return true;
    }

    @query([IDL.Text], IDL.Nat64)
    balance(address: string): bigint {
        return state.accounts[address]?.balance ?? 0n;
    }

    @query([], IDL.Text)
    ticker(): string {
        return state.ticker;
    }

    @query([], IDL.Text)
    name(): string {
        return state.name;
    }

    @query([], IDL.Nat64)
    totalSupply(): bigint {
        return state.totalSupply;
    }
}
