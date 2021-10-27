import {
    Query,
    Update,
    i32
} from 'azle';
declare var ic: {
    ERC20: ERC20
}; // TODO this is just temporary

type Account = {
    readonly address: string;
    balance: number;
};

type ERC20 = Readonly<{
    accounts: {
        [key: string]: Account;
    };
    totalSupply: number;
    ticker: string;
    name: string;
}>;

export function initializeSupply(
    ticker: string,
    name: string,
    totalSupply: i32,
    originalAddress: string
): Update<boolean> {
    ic.ERC20 = {
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
    amount: i32
): Update<boolean> {
    if (ic.ERC20.accounts[to] === undefined) {
        ic.ERC20.accounts[to] = {
            address: to,
            balance: 0
        };
    }

    ic.ERC20.accounts[from].balance -= amount;
    ic.ERC20.accounts[to].balance += amount;

    return true;
}

export function balance(address: string): Query<i32> {
    return ic.ERC20.accounts[address].balance;
}

export function ticker(): Query<string> {
    return ic.ERC20.ticker;
}

export function name(): Query<string> {
    return ic.ERC20.name;
}

export function totalSupply(): Query<i32> {
    return ic.ERC20.totalSupply;
}