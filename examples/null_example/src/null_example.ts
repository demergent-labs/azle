import { ic, int, $query, Record, $update } from 'azle';

type PartiallyNullRecord = Record<{
    first_item: int;
    second_item: null;
    third_item: int;
}>;

type TwoNullRecord = Record<{
    first_item: null;
    second_item: null;
}>;

type ThreeNullRecord = Record<{
    first_item: null;
    second_item: null;
    third_item: null;
}>;

$query;
export function null_function(param: null): null {
    return param;
}

$query;
export function void_is_not_null(): void {
    ic.print(
        'Even though they are both None in Python, for Candid null and void are different.'
    );
}

$query;
export function get_partially_null_record(): PartiallyNullRecord {
    return {
        first_item: 1n,
        second_item: null,
        third_item: 3n
    };
}

$update;
export function set_partially_null_record(
    param: PartiallyNullRecord
): PartiallyNullRecord {
    return param;
}

$query;
export function get_small_null_record(): TwoNullRecord {
    return {
        first_item: null,
        second_item: null
    };
}

$update;
export function set_small_null_record(param: TwoNullRecord): TwoNullRecord {
    return param;
}

$query;
export function get_large_null_record(): ThreeNullRecord {
    return {
        first_item: null,
        second_item: null,
        third_item: null
    };
}

$update;
export function set_large_null_record(param: ThreeNullRecord): ThreeNullRecord {
    return param;
}
