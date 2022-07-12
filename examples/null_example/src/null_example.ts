import { int, Query, Update, Variant } from 'azle';

type PartiallyNullRecord = {
    first_item: int;
    second_item: null;
    third_item: int;
};

type TwoNullRecord = {
    first_item: null;
    second_item: null;
};

type ThreeNullRecord = {
    first_item: null;
    second_item: null;
    third_item: null;
};

export function null_function(param: null): Query<null> {
    return param;
}

export function get_partially_null_record(): Query<PartiallyNullRecord> {
    return {
        first_item: 1n,
        second_item: null,
        third_item: 3n
    };
}

export function set_partially_null_record(
    param: PartiallyNullRecord
): Update<PartiallyNullRecord> {
    return param;
}

export function get_small_null_record(): Query<TwoNullRecord> {
    return {
        first_item: null,
        second_item: null
    };
}

export function set_small_null_record(
    param: TwoNullRecord
): Update<TwoNullRecord> {
    return param;
}

export function get_large_null_record(): Query<ThreeNullRecord> {
    return {
        first_item: null,
        second_item: null,
        third_item: null
    };
}

export function set_large_null_record(
    param: ThreeNullRecord
): Update<ThreeNullRecord> {
    return param;
}
