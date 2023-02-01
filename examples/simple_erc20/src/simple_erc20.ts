import { nat64, $query, $update } from 'azle';

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

$update;
export function initialize_supply(
    name: string,
    original_address: string,
    ticker: string,
    total_supply: nat64
): boolean {
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

$update;
export function transfer(
    from_address: string,
    to_address: string,
    amount: nat64
): boolean {
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

$query;
export function balance(address: string): nat64 {
    return state.accounts[address]?.balance ?? 0n;
}

$query;
export function ticker(): string {
    return state.ticker;
}

$query;
export function name(): string {
    return state.name;
}

$query;
export function total_supply(): nat64 {
    return state.total_supply;
}
