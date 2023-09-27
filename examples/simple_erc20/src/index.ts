import { bool, Canister, nat64, query, text, update } from 'azle';

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

export default Canister({
    initializeSupply: update(
        [text, text, text, nat64],
        bool,
        (name, originalAddress, ticker, totalSupply) => {
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
    ),
    transfer: update(
        [text, text, nat64],
        bool,
        (fromAddress, toAddress, amount) => {
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
    ),
    balance: query([text], nat64, (address) => {
        return state.accounts[address]?.balance ?? 0n;
    }),
    ticker: query([], text, () => {
        return state.ticker;
    }),
    name: query([], text, () => {
        return state.name;
    }),
    totalSupply: query([], nat64, () => {
        return state.totalSupply;
    })
});
