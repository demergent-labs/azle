import { Canister, int, query, Vec } from 'azle';

import { Int } from './comparison';
import * as Quicksort from './quicksort';

export default Canister({
    sort: query([Vec(int)], Vec(int), (xs) => {
        return Quicksort.sortBy(xs, Int.compare);
    })
});
