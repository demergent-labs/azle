import type { Principal } from '@dfinity/principal';
export interface PartiallyNullRecord {
    first_item: bigint;
    third_item: bigint;
    second_item: null;
}
export interface ThreeNullRecord {
    first_item: null;
    third_item: null;
    second_item: null;
}
export interface TwoNullRecord {
    first_item: null;
    second_item: null;
}
export interface _SERVICE {
    get_large_null_record: () => Promise<ThreeNullRecord>;
    get_partially_null_record: () => Promise<PartiallyNullRecord>;
    get_small_null_record: () => Promise<TwoNullRecord>;
    null_function: (arg_0: null) => Promise<null>;
    set_large_null_record: (arg_0: ThreeNullRecord) => Promise<ThreeNullRecord>;
    set_partially_null_record: (
        arg_0: PartiallyNullRecord
    ) => Promise<PartiallyNullRecord>;
    set_small_null_record: (arg_0: TwoNullRecord) => Promise<TwoNullRecord>;
}
