import { Query, ic } from 'azle';
import { Exchange, TradingPair } from './exchange';

export function whoami(): Query<string> {
  return ic.caller();
}

export function getOrders(): Query<TradingPair> {
  let e = Exchange(
    ['nlhft-2iaaa-aaaae-qaaua-cai', 'nlhft-2iaaa-aaaae-qaaua-cai'],
    {}
  );
  return e.getTradingPairs();
}
