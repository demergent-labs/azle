export const idlFactory = ({ IDL }) => {
    const KeyTooLarge = IDL.Record({ max: IDL.Nat32, given: IDL.Nat32 });
    const InsertError = IDL.Variant({
        ValueTooLarge: KeyTooLarge,
        KeyTooLarge: KeyTooLarge
    });
    const StableMap5InsertResult = IDL.Variant({
        ok: IDL.Opt(IDL.Float64),
        err: InsertError
    });
    const StableMap6InsertResult = IDL.Variant({
        ok: IDL.Opt(IDL.Bool),
        err: InsertError
    });
    const StableMap7InsertResult = IDL.Variant({
        ok: IDL.Opt(IDL.Null),
        err: InsertError
    });
    const StableMap9InsertResult = IDL.Variant({
        ok: IDL.Opt(IDL.Vec(IDL.Text)),
        err: InsertError
    });
    return IDL.Service({
        stable_map_5_contains_key: IDL.Func(
            [IDL.Opt(IDL.Text)],
            [IDL.Bool],
            ['query']
        ),
        stable_map_5_get: IDL.Func(
            [IDL.Opt(IDL.Text)],
            [IDL.Opt(IDL.Float64)],
            ['query']
        ),
        stable_map_5_insert: IDL.Func(
            [IDL.Opt(IDL.Text), IDL.Float64],
            [StableMap5InsertResult],
            []
        ),
        stable_map_5_is_empty: IDL.Func([], [IDL.Bool], ['query']),
        stable_map_5_items: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Opt(IDL.Text), IDL.Float64))],
            ['query']
        ),
        stable_map_5_keys: IDL.Func(
            [],
            [IDL.Vec(IDL.Opt(IDL.Text))],
            ['query']
        ),
        stable_map_5_len: IDL.Func([], [IDL.Nat64], ['query']),
        stable_map_5_remove: IDL.Func(
            [IDL.Opt(IDL.Text)],
            [IDL.Opt(IDL.Float64)],
            []
        ),
        stable_map_5_values: IDL.Func([], [IDL.Vec(IDL.Float64)], ['query']),
        stable_map_6_contains_key: IDL.Func(
            [IDL.Vec(IDL.Nat64)],
            [IDL.Bool],
            ['query']
        ),
        stable_map_6_get: IDL.Func(
            [IDL.Vec(IDL.Nat64)],
            [IDL.Opt(IDL.Bool)],
            ['query']
        ),
        stable_map_6_insert: IDL.Func(
            [IDL.Vec(IDL.Nat64), IDL.Bool],
            [StableMap6InsertResult],
            []
        ),
        stable_map_6_is_empty: IDL.Func([], [IDL.Bool], ['query']),
        stable_map_6_items: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Vec(IDL.Nat64), IDL.Bool))],
            ['query']
        ),
        stable_map_6_keys: IDL.Func(
            [],
            [IDL.Vec(IDL.Vec(IDL.Nat64))],
            ['query']
        ),
        stable_map_6_len: IDL.Func([], [IDL.Nat64], ['query']),
        stable_map_6_remove: IDL.Func(
            [IDL.Vec(IDL.Nat64)],
            [IDL.Opt(IDL.Bool)],
            []
        ),
        stable_map_6_values: IDL.Func([], [IDL.Vec(IDL.Bool)], ['query']),
        stable_map_7_contains_key: IDL.Func([IDL.Null], [IDL.Bool], ['query']),
        stable_map_7_get: IDL.Func([IDL.Null], [IDL.Opt(IDL.Null)], ['query']),
        stable_map_7_insert: IDL.Func(
            [IDL.Null, IDL.Null],
            [StableMap7InsertResult],
            []
        ),
        stable_map_7_is_empty: IDL.Func([], [IDL.Bool], ['query']),
        stable_map_7_items: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Null, IDL.Null))],
            ['query']
        ),
        stable_map_7_keys: IDL.Func([], [IDL.Vec(IDL.Null)], ['query']),
        stable_map_7_len: IDL.Func([], [IDL.Nat64], ['query']),
        stable_map_7_remove: IDL.Func([IDL.Null], [IDL.Opt(IDL.Null)], []),
        stable_map_7_values: IDL.Func([], [IDL.Vec(IDL.Null)], ['query']),
        stable_map_8_contains_key: IDL.Func([IDL.Bool], [IDL.Bool], ['query']),
        stable_map_8_get: IDL.Func([IDL.Bool], [IDL.Opt(IDL.Null)], ['query']),
        stable_map_8_insert: IDL.Func(
            [IDL.Bool, IDL.Null],
            [StableMap7InsertResult],
            []
        ),
        stable_map_8_is_empty: IDL.Func([], [IDL.Bool], ['query']),
        stable_map_8_items: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Bool, IDL.Null))],
            ['query']
        ),
        stable_map_8_keys: IDL.Func([], [IDL.Vec(IDL.Bool)], ['query']),
        stable_map_8_len: IDL.Func([], [IDL.Nat64], ['query']),
        stable_map_8_remove: IDL.Func([IDL.Bool], [IDL.Opt(IDL.Null)], []),
        stable_map_8_values: IDL.Func([], [IDL.Vec(IDL.Null)], ['query']),
        stable_map_9_contains_key: IDL.Func(
            [IDL.Float64],
            [IDL.Bool],
            ['query']
        ),
        stable_map_9_get: IDL.Func(
            [IDL.Float64],
            [IDL.Opt(IDL.Vec(IDL.Text))],
            ['query']
        ),
        stable_map_9_insert: IDL.Func(
            [IDL.Float64, IDL.Vec(IDL.Text)],
            [StableMap9InsertResult],
            []
        ),
        stable_map_9_is_empty: IDL.Func([], [IDL.Bool], ['query']),
        stable_map_9_items: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Float64, IDL.Vec(IDL.Text)))],
            ['query']
        ),
        stable_map_9_keys: IDL.Func([], [IDL.Vec(IDL.Float64)], ['query']),
        stable_map_9_len: IDL.Func([], [IDL.Nat64], ['query']),
        stable_map_9_remove: IDL.Func(
            [IDL.Float64],
            [IDL.Opt(IDL.Vec(IDL.Text))],
            []
        ),
        stable_map_9_values: IDL.Func(
            [],
            [IDL.Vec(IDL.Vec(IDL.Text))],
            ['query']
        )
    });
};
export const init = ({ IDL }) => {
    return [];
};
