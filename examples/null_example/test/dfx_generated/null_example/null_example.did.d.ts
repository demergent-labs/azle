import type { Principal } from '@dfinity/principal';
export interface partially_null_object {
    first_item: bigint;
    third_item: bigint;
    second_item: null;
}
export interface three_null_object {
    first_item: null;
    third_item: null;
    second_item: null;
}
export interface two_null_object {
    first_item: null;
    second_item: null;
}
export interface _SERVICE {
    get_large_null_record: () => Promise<three_null_object>;
    get_partial_null_record: () => Promise<partially_null_object>;
    get_small_null_record: () => Promise<two_null_object>;
    null_function: (arg_0: null) => Promise<null>;
    set_large_null_record: (
        arg_0: three_null_object
    ) => Promise<three_null_object>;
    set_partial_null_record: (
        arg_0: partially_null_object
    ) => Promise<partially_null_object>;
    set_small_null_record: (arg_0: two_null_object) => Promise<two_null_object>;
}
