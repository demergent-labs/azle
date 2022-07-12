import { nat, Opt, Principal } from 'azle';
import { Token } from './types';

export interface Book {
    // [key: Principal]: UserBalances;
    get(user: Principal): UserBalances;
    put(user: Principal, userBalances: UserBalances): void;
    entries(): [Principal, UserBalances][];
    size(): number;
    printBalances(): void;
    clear(): void;
    addTokens(user: Principal, token: Token, amount: nat): void;
    removeTokens(user: Principal, token: Token, amount: nat): Opt<nat>;
    hasEnoughBalance(user: Principal, token: Principal, amount: nat): boolean;
}

export type UserBalances = {
    [key: Token]: nat;
};

export function Book(): Book {
    let book: { [key: Principal]: UserBalances } = {};

    function get(user: Principal): UserBalances {
        return book[user];
    }

    function put(user: Principal, userBalances: UserBalances) {
        book[user] = userBalances;
    }
    function entries(): [Principal, UserBalances][] {
        return Object.keys(book).map((key) => [key, book[key]]);
    }
    function size(): number {
        return Object.keys(book).length;
    }

    // For development only.
    function printBalances() {
        entries().forEach(([user, balances]) => {
            console.log('PRINCIPAL: ', user);
            Object.keys(balances).forEach((token) => {
                console.log(
                    `Balance: Token: ", ${token}, " amount: ${balances[token]}`
                );
            });
        });
    }

    function clear() {
        book = {};
    }

    // function that adds tokens to book. Book keeps track of users deposits.
    function addTokens(user: Principal, token: Token, amount: nat) {
        let userBalances = get(user);
        if (userBalances) {
            if (userBalances[token]) {
                userBalances[token] = userBalances[token] + amount;
            } else {
                userBalances[token] = amount;
            }
        } else {
            const x1: UserBalances = {};
            x1[token] = amount;
            put(user, x1);
        }
    }

    // return the new balance.
    function removeTokens(
        user: Principal,
        token: Token,
        amount: nat
    ): Opt<nat> {
        let userBalances = get(user);
        if (userBalances) {
            if (userBalances[token]) {
                if (userBalances[token] >= amount) {
                    if (userBalances[token] === amount) {
                        delete userBalances[token];
                        return 0n;
                    }
                    userBalances[token] = userBalances[token] - amount;
                    return userBalances[token];
                }
            }
            console.log(`User: ${user} has no balance of token ${token}`);
            return null;
        }
        console.log(
            `User ${user} doesn't exist in book, cannot remove tokens.`
        );
        return null;
    }

    // Return true if a user has at least amount tokens in the book, false otherwise.
    function hasEnoughBalance(
        user: Principal,
        token: Principal,
        amount: nat
    ): boolean {
        let userBalances = get(user);
        if (userBalances) {
            if (userBalances[token]) {
                if (userBalances[token] >= amount) {
                    return true;
                }
            }
        }
        return false;
    }

    return Object.freeze({
        get,
        put,
        entries,
        size,
        printBalances,
        clear,
        addTokens,
        removeTokens,
        hasEnoughBalance
    });
}
