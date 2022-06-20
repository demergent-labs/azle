import { Query, Update, nat64 } from 'azle';

type Account = {
    address: string;
    balance: nat64;
};

type State = {
    accounts: {
        [key: string]: Account;
    };
    totalSupply: nat64;
    ticker: string;
    name: string;
};

let state: State = {
    accounts: {},
    totalSupply: 0n,
    ticker: '',
    name: ''
};

export function initializeSupply(
    ticker: string,
    name: string,
    totalSupply: nat64,
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
    amount: nat64
): Update<boolean> {
    if (state.accounts[to] === undefined) {
        state.accounts[to] = {
            address: to,
            balance: 0n
        };
    }

    state.accounts[from].balance -= amount;
    state.accounts[to].balance += amount;

    return true;
}

export function balance(address: string): Query<nat64> {
    return state.accounts[address]?.balance ?? 0n;
}

export function ticker(): Query<string> {
    return state.ticker;
}

export function name(): Query<string> {
    return state.name;
}

export function totalSupply(): Query<nat64> {
    return state.totalSupply;
}
