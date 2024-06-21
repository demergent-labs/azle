import { int, query, Vec } from 'azle';

import { Int } from './comparison';
import * as Quicksort from './quicksort';

export default class {
    @query([Vec(int)], Vec(int))
    sort(xs) {
        return Quicksort.sortBy(xs, Int.compare);
    }
}
