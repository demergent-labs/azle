import { nat64, Query, Update } from 'azle';

type Account = {
    address: string;
    balance: nat64;
};

type State = {
    accounts: {
        [key: string]: Account;
    };
    name: string;
    ticker: string;
    total_supply: nat64;
};

let state: State = {
    accounts: {},
    name: '',
    ticker: '',
    total_supply: 0n
};

export function initialize_supply(
    name: string,
    original_address: string,
    ticker: string,
    total_supply: nat64
): Update<boolean> {
    state = {
        ...state,
        accounts: {
            [original_address]: {
                address: original_address,
                balance: total_supply
            }
        },
        name,
        ticker,
        total_supply
    };

    return true;
}

export function transfer(
    from_address: string,
    to_address: string,
    amount: nat64
): Update<boolean> {
    if (state.accounts[to_address] === undefined) {
        state.accounts[to_address] = {
            address: to_address,
            balance: 0n
        };
    }

    state.accounts[from_address].balance -= amount;
    state.accounts[to_address].balance += amount;

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

export function total_supply(): Query<nat64> {
    return state.total_supply;
}
