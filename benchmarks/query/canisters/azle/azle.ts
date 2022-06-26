// TODO let's find out exactly how many instructions each operation takes
// TODO test initializing each data type, including records, variants of various sizes
// TODO then test more operations after that, like mutating, iterating, etc
// TODO walk through similar benchmarks with the other primitive types
// TODO Rust and Motoko might be compiling away a lot of code that Azle isn't

import { ic, nat64, Query } from 'azle';

export function query_empty(): Query<nat64> {
    return ic.performance_counter(0);
}

export function query_string_initialize(): Query<nat64> {
    const string: string = 'hello there sir';

    console.log(string);

    return ic.performance_counter(0);
}

export function query_nat64_add_one(): Query<nat64> {
    let num: nat64 = 0n;

    num += 1n;

    console.log(num);

    return ic.performance_counter(0);
}

export function query_nat64_add_many(): Query<nat64> {
    let num: nat64 = 0n;

    for (let i=0; i < 10_000; i++) {
        num += 1n;
    }

    console.log(num);

    return ic.performance_counter(0);
}