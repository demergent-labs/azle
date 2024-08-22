import { IDL, query } from 'azle';

import { Int } from './comparison';
import * as Quicksort from './quicksort';

export default class {
    @query([IDL.Vec(IDL.Int)], IDL.Vec(IDL.Int))
    sort(xs: bigint[]): bigint[] {
        return Quicksort.sortBy(xs, Int.compare);
    }
}
