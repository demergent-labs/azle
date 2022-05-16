import { ic, Opt } from 'azle';
import { Book } from './book';
import { Order, OrderId, Token } from './types';

// internal types
export type TradingPair = [Token, Token];

export type Orders = {
  [key: OrderId]: Order;
};

//  public class Exchange(trading_pair: TradingPair, book: Book.Book) {

export interface Exchange {
  tradingPair: TradingPair;
  book: Book;
  orders: Orders;
  getOrder(orderId: OrderId): Opt<Order>;
  getTradingPairs(): TradingPair;
}

export const Exchange = function (tradingPair: TradingPair, book: Book) {
  const _tradingPair = tradingPair;
  const _book = book;
  const _orders: Orders = {};

  return Object.freeze({
    tradingPair: _tradingPair,
    book: _book,
    orders: _orders,
    getOrder: function (orderId: OrderId): Opt<Order> {
      return _orders[orderId];
    },
    getTradingPairs: function () {
      ic.print(_tradingPair);
      return _tradingPair;
    },
  });
};

let orders: Orders = {};

// The map of all orders (not differentiated by pairs).

export function getOrder(id: OrderId): Opt<Order> {
  return orders[id] || null;
}

// export function getOrders() : Order[] {
//     ic.print("List orders on exchange " # Principal.toText(trading_pair.0) # "/" # Principal.toText(trading_pair.1));
//     let buff : B.Buffer<T.Order> = B.Buffer(10);
//     for (o in orders.vals()) {
//         buff.add(o);
//     };
//     buff.toArray();
// };
