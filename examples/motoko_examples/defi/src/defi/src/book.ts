import { ic, nat, Opt, Principal } from 'azle';
import { Token } from './types';

export type Book = {
  [key: Principal]: UserBalances;
};

export type UserBalances = {
  [key: Token]: nat;
};

let book: Book = {};

export function get(user: Principal): UserBalances {
  return book[user];
}

export function put(user: Principal, userBalances: UserBalances) {
  book[user] = userBalances;
}

export function entries(): [Principal, UserBalances][] {
  return Object.keys(book).map((key) => [key, book[key]]);
}

export function size(): number {
  return Object.keys(book).length;
}

// For development only.
export function print_balances() {
  entries().forEach(([user, balances]) => {
    ic.print('PRINCIPAL: ', user);
    Object.keys(balances).forEach((token) => {
      ic.print(`Balance: Token: ", ${token}, " amount: ${balances[token]}`);
    });
  });
}

export function clear() {
  book = {};
}

// function that adds tokens to book. Book keeps track of users deposits.
export function addTokens(user: Principal, token: Token, amount: nat) {
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
export function removeTokens(
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
    ic.print(`User: ${user} has no balance of token ${token}`);
    return null;
  }
  ic.print(`User ${user} doesn't exist in book, cannot remove tokens.`);
  return null;
}

// Return true if a user has at least amount tokens in the book, false otherwise.
export function hasEnoughBalance(
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
