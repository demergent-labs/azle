import { nat, Opt, Principal } from 'azle';
import { Book } from './book';
import { Order, OrderId, Token } from './types';

// internal types
export type TradingPair = [Token, Token];

export type Orders = {
    [key: OrderId]: Order;
};

// @TODO returning a dummy id for now till we figure out how we get the actual id
export const ledger = function (): Principal {
    return 'nlhft-2iaaa-aaaae-qaaua-cai';
};

export interface Exchange {
    tradingPair: TradingPair;
    book: Book;
    orders: Orders;
    getOrder(orderId: OrderId): Opt<Order>;
    getOrders(): Order[];
    cancelOrder(id: OrderId): Opt<Order>;
    detectMatch(order: Order): void;
}

export const Exchange = function (
    tradingPair: TradingPair,
    book: Book
): Exchange {
    const _tradingPair = tradingPair;
    const _book = book;

    // The map of all orders (not differentiated by pairs).
    const orders: Orders = {};

    function getOrders(): Order[] {
        console.log(
            `List orders on exchange " ${_tradingPair[0]} / ${_tradingPair[1]}`
        );
        let vals = Object.values(orders);
        return vals;
    }

    function getOrder(id: OrderId): Opt<Order> {
        return orders[id] || null;
    }

    // Cancel order WITHOUT verifying ownership.
    function cancelOrder(id: OrderId): Opt<Order> {
        let order = orders[id];
        delete orders[id];
        return order || null;
    }

    function addOrders(orders: Order[]) {
        orders.forEach((order) => {
            addOrder(order);
        });
    }

    function addOrder(o: Order) {
        orders[o.id] = o;
        detectMatch(o);
    }

    function detectMatch(order: Order) {
        const a = order;

        // Find matching orders.
        let matches: Order[] = [];
        Object.values(orders).forEach((b) => {
            if (
                a.id !== b.id &&
                a.from == b.to &&
                a.to == b.from &&
                a.fromAmount * b.fromAmount >= a.toAmount * b.toAmount
            ) {
                matches.push(b);
            }
        });

        matches.forEach((b) => {
            let a_to_amount = 0n;
            let b_to_amount = 0n;

            if (b.fromAmount >= a.toAmount) {
                a_to_amount = a.toAmount;
            }

            if (a.fromAmount >= b.toAmount) {
                b_to_amount = b.toAmount;
            }

            // Check if some orders can be completed partially.
            if (a_to_amount === 0n && b_to_amount > 0n) {
                a_to_amount = b.fromAmount;
                // Verify that we can complete the partial order with natural number tokens remaining.
                if ((a_to_amount * a.fromAmount) % a.toAmount !== 0n) {
                    return;
                }
            }
            if (b_to_amount === 0n && a_to_amount > 0n) {
                b_to_amount = a.fromAmount;
                // Verify that we can complete the partial order with natural number tokens remaining.
                if ((b_to_amount * b.fromAmount) % b.toAmount !== 0n) {
                    return;
                }
            }

            if (a_to_amount > 0n && b_to_amount > 0n) {
                // processTrade(a, b, a_to_amount, b_to_amount);
            }
        });
    }

    function processTrade(
        orderA: Order,
        orderB: Order,
        aToAmount: nat,
        bToAmount: nat
    ) {
        console.log(
            `Process trade between order " ${orderA.id} # " and order " ${orderB.id}`
        );

        const ra = orders[orderA.id];
        const rb = orders[orderB.id];

        delete orders[orderA.id];
        delete orders[orderB.id];

        // Calculate "cost" to each
        const aFromAmount = (aToAmount * orderA.fromAmount) / orderA.toAmount;
        const bFromAmount = (bToAmount * orderB.fromAmount) / orderB.toAmount;

        // Update order with remaining tokens
        const a: Order = {
            id: orderA.id,
            owner: orderA.owner,
            from: orderA.from,
            fromAmount: orderA.fromAmount - aFromAmount,
            to: orderA.to,
            toAmount: orderA.toAmount - aToAmount
        };

        const b: Order = {
            id: orderB.id,
            owner: orderB.owner,
            from: orderB.from,
            fromAmount: orderB.fromAmount - bFromAmount,
            to: orderB.to,
            toAmount: orderB.toAmount - bToAmount
        };

        // Update DEX balances (book)
        const removedA = book.removeTokens(a.owner, a.from, aFromAmount);
        book.addTokens(a.owner, a.to, aToAmount);
        const removedB = book.removeTokens(b.owner, b.from, bFromAmount);
        book.addTokens(b.owner, b.to, bToAmount);

        // The DEX keeps any tokens not required to satisfy the parties.
        const dex_amount_a = aFromAmount - bToAmount;
        if (dex_amount_a > 0) {
            book.addTokens(ledger(), a.from, dex_amount_a);
        }
        const dex_amount_b = bFromAmount - aToAmount;
        if (dex_amount_b > 0) {
            book.addTokens(ledger(), b.from, dex_amount_b);
        }

        // Maintain the orders only if not empty
        if (a.fromAmount !== 0n) {
            orders[a.id] = a;
        }
        if (b.fromAmount !== 0n) {
            orders[b.id] = b;
        }
    }

    return Object.freeze({
        tradingPair: _tradingPair,
        book: _book,
        orders,
        getOrders,
        getOrder,
        cancelOrder,
        detectMatch
    });
};
