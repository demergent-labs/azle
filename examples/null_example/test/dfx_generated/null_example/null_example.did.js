export const idlFactory = ({ IDL }) => {
    const ThreeNullRecord = IDL.Record({
        first_item: IDL.Null,
        third_item: IDL.Null,
        second_item: IDL.Null
    });
    const PartiallyNullRecord = IDL.Record({
        first_item: IDL.Int,
        third_item: IDL.Int,
        second_item: IDL.Null
    });
    const TwoNullRecord = IDL.Record({
        first_item: IDL.Null,
        second_item: IDL.Null
    });
    return IDL.Service({
        get_large_null_record: IDL.Func([], [ThreeNullRecord], ['query']),
        get_partially_null_record: IDL.Func(
            [],
            [PartiallyNullRecord],
            ['query']
        ),
        get_small_null_record: IDL.Func([], [TwoNullRecord], ['query']),
        null_function: IDL.Func([IDL.Null], [IDL.Null], ['query']),
        set_large_null_record: IDL.Func(
            [ThreeNullRecord],
            [ThreeNullRecord],
            []
        ),
        set_partially_null_record: IDL.Func(
            [PartiallyNullRecord],
            [PartiallyNullRecord],
            []
        ),
        set_small_null_record: IDL.Func([TwoNullRecord], [TwoNullRecord], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
