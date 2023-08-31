import { int, Vec, query } from 'azle';
import { Int } from './comparison';
import * as Quicksort from './quicksort';

export default class {
    @query([Vec(int)], Vec(int))
    sort(xs: Vec<int>): Vec<int> {
        return Quicksort.sortBy(xs, Int.compare);
    }
}
