// TODO let's find out exactly how many instructions each operation takes
// TODO test initializing each data type, including records, variants of various sizes
// TODO then test more operations after that, like mutating, iterating, etc
// TODO walk through similar benchmarks with the other primitive types
// TODO Rust and Motoko might be compiling away a lot of code that Azle isn't
import { ic, nat64, Query } from 'azle';

export function query_empty(): Query<nat64> {
    return ic.performance_counter(0);
}

export {
    query_bool_init_stack,
    query_bool_init_heap
} from './bool';