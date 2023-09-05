import { bool, nat64, query, Service, text, update } from 'azle';

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
    totalSupply: nat64;
};

let state: State = {
    accounts: {},
    name: '',
    ticker: '',
    totalSupply: 0n
};

export default class extends Service {
    @update([text, text, text, nat64], bool)
    initializeSupply(
        name: text,
        originalAddress: text,
        ticker: text,
        totalSupply: nat64
    ): bool {
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

    @update([text, text, nat64], bool)
    transfer(fromAddress: text, toAddress: text, amount: nat64): bool {
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

    @query([text], nat64)
    balance(address: text): nat64 {
        return state.accounts[address]?.balance ?? 0n;
    }

    @query([], text)
    ticker(): text {
        return state.ticker;
    }

    @query([], text)
    name(): text {
        return state.name;
    }

    @query([], nat64)
    totalSupply(): nat64 {
        return state.totalSupply;
    }
}
