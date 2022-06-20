import { Query, ic } from 'azle';
import { Book } from './book';
import { Exchange, TradingPair } from './exchange';
import { Order } from './types';

export function whoami(): Query<string> {
    return ic.caller();
}

export function getOrders(): Query<Order[]> {
    let e = Exchange(
        ['nlhft-2iaaa-aaaae-qaaua-cai', 'nlhft-2iaaa-aaaae-qaaua-cai'],
        Book()
    );
    return e.getOrders();
}
