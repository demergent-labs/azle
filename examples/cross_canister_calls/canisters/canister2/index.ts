import {
    Canister,
    ic,
    nat64,
    None,
    Opt,
    query,
    Some,
    text,
    update,
    Vec,
    Void
} from 'azle';
import { State, Account, AccountArgs } from './types';

let state: State = {
    accounts: {
        '0': {
            id: '0',
            balance: 100n
        }
    },
    notification: ''
};

export default Canister({
    transfer: update([text, text, nat64], nat64, (from, to, amount) => {
        const fromAccount: typeof Account | undefined = state.accounts[from];
        if (fromAccount === undefined) {
            state.accounts[from] = {
                id: from,
                balance: 0n
            };
        }
        const fromBalance = state.accounts[from].balance;
        if (fromBalance < amount) {
            return 0n;
        }
        const toBalance: nat64 | undefined = state.accounts[to]?.balance;
        if (toBalance === undefined) {
            state.accounts[to] = {
                id: to,
                balance: 0n
            };
        }
        state.accounts[from].balance -= amount;
        state.accounts[to].balance += amount;
        return amount;
    }),
    balance: query([text], nat64, (id) => {
        return state.accounts[id]?.balance ?? 0n;
    }),
    account: query([AccountArgs], Opt(Account), (accountArgs) => {
        const account = state.accounts[accountArgs.id];
        return account ? Some(account) : None;
    }),
    accounts: query([], Vec(Account), () => {
        return Object.values(state.accounts);
    }),
    trap: query([], text, () => {
        ic.trap('hahahaha');
        return 'You will never get here';
    }),
    receiveNotification: update([text], Void, (message) => {
        state.notification = message;
    }),
    getNotification: query([], text, () => {
        return state.notification;
    })
});
