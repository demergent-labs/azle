// where azle and confusion and local don't conflict of override
// This should be all of the other tests we have

// TODO explore not doing our processes if the ts compiler would fail
// TODO explore things that have multiple declarations

import * as azle from 'azle';
import * as lc from './tests-cases/local_conflicts';
import * as lo from './tests-cases/local_override';

azle.$query;
export function add(a: lc.blob, b: lc.bool, c: lo.text): bigint {
    return BigInt(a) + b + BigInt(c);
}
