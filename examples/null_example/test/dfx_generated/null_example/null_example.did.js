export const idlFactory = ({ IDL }) => {
    const three_null_object = IDL.Record({
        first_item: IDL.Null,
        third_item: IDL.Null,
        second_item: IDL.Null
    });
    const partially_null_object = IDL.Record({
        first_item: IDL.Int,
        third_item: IDL.Int,
        second_item: IDL.Null
    });
    const two_null_object = IDL.Record({
        first_item: IDL.Null,
        second_item: IDL.Null
    });
    return IDL.Service({
        get_large_null_record: IDL.Func([], [three_null_object], ['query']),
        get_partial_null_record: IDL.Func(
            [],
            [partially_null_object],
            ['query']
        ),
        get_small_null_record: IDL.Func([], [two_null_object], ['query']),
        null_function: IDL.Func([IDL.Null], [IDL.Null], ['query']),
        set_large_null_record: IDL.Func(
            [three_null_object],
            [three_null_object],
            []
        ),
        set_partial_null_record: IDL.Func(
            [partially_null_object],
            [partially_null_object],
            []
        ),
        set_small_null_record: IDL.Func(
            [two_null_object],
            [two_null_object],
            []
        )
    });
};
export const init = ({ IDL }) => {
    return [];
};
