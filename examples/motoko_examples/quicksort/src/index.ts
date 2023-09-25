import { int, Vec, query, Service } from 'azle';
import { Int } from './comparison';
import * as Quicksort from './quicksort';

export default Service({
    sort: query([Vec(int)], Vec(int), (xs) => {
        return Quicksort.sortBy(xs, Int.compare);
    })
});
