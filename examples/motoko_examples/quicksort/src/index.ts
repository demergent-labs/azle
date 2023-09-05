import { int, Vec, query, Service } from 'azle';
import { Int } from './comparison';
import * as Quicksort from './quicksort';

export default class extends Service {
    @query([Vec(int)], Vec(int))
    sort(xs: Vec<int>): Vec<int> {
        return Quicksort.sortBy(xs, Int.compare);
    }
}
