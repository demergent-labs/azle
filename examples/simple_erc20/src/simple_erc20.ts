// TODO nat or nat64 is probably the best type to use instead of int32

import {
    Query,
    Update,
    int32
} from 'azle';

type Account = {
    address: string;
    balance: number;
};

type State = {
    accounts: {
        [key: string]: Account;
    };
    totalSupply: number;
    ticker: string;
    name: string;
};

let state: State = {
    accounts: {},
    totalSupply: 0,
    ticker: '',
    name: ''
};

export function initializeSupply(
    ticker: string,
    name: string,
    totalSupply: int32,
    originalAddress: string
): Update<boolean> {
    state = {
        ...state,
        accounts: {
            [originalAddress]: {
                address: originalAddress,
                balance: totalSupply
            }
        },
        ticker,
        name,
        totalSupply
    };

    return true;
}

export function transfer(
    from: string,
    to: string,
    amount: int32
): Update<boolean> {
    if (state.accounts[to] === undefined) {
        state.accounts[to] = {
            address: to,
            balance: 0
        };
    }

    state.accounts[from].balance -= amount;
    state.accounts[to].balance += amount;

    return true;
}

export function balance(address: string): Query<int32> {
    return state.accounts[address]?.balance ?? 0;
}

export function ticker(): Query<string> {
    return state.ticker;
}

export function name(): Query<string> {
    return state.name;
}

export function totalSupply(): Query<int32> {
    return state.totalSupply;
}