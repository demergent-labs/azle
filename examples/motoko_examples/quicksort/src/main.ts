import {
    Query,
    int
} from 'azle';
import { Int } from './motoko_base'
import * as Quicksort from './quicksort'

export function sort(xs: int[]): Query<int[]> {
    return Quicksort.sortBy(xs, Int.compare);
}
