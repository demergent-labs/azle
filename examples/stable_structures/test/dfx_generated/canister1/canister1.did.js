export const idlFactory = ({ IDL }) => {
    const KeyTooLarge = IDL.Record({ max: IDL.Nat32, given: IDL.Nat32 });
    const InsertError = IDL.Variant({
        ValueTooLarge: KeyTooLarge,
        KeyTooLarge: KeyTooLarge
    });
    const StableMap0InsertResult = IDL.Variant({
        ok: IDL.Opt(IDL.Text),
        err: InsertError
    });
    const StableMap1InsertResult = IDL.Variant({
        ok: IDL.Opt(IDL.Vec(IDL.Nat8)),
        err: InsertError
    });
    const StableMap2InsertResult = IDL.Variant({
        ok: IDL.Opt(IDL.Nat),
        err: InsertError
    });
    const Reaction = IDL.Variant({ Sad: IDL.Null, Happy: IDL.Null });
    const StableMap3InsertResult = IDL.Variant({
        ok: IDL.Opt(IDL.Int),
        err: InsertError
    });
    const BlogPost = IDL.Record({ title: IDL.Text });
    const User = IDL.Record({
        username: IDL.Text,
        blog_posts: IDL.Vec(BlogPost)
    });
    const StableMap4InsertResult = IDL.Variant({
        ok: IDL.Opt(IDL.Float32),
        err: InsertError
    });
    const StableMap5InsertResult = IDL.Variant({
        ok: IDL.Opt(IDL.Float64),
        err: InsertError
    });
    const StableMap6InsertResult = IDL.Variant({
        ok: IDL.Opt(IDL.Bool),
        err: InsertError
    });
    return IDL.Service({
        stable_map_0_contains_key: IDL.Func([IDL.Nat8], [IDL.Bool], ['query']),
        stable_map_0_get: IDL.Func([IDL.Nat8], [IDL.Opt(IDL.Text)], ['query']),
        stable_map_0_insert: IDL.Func(
            [IDL.Nat8, IDL.Text],
            [StableMap0InsertResult],
            []
        ),
        stable_map_0_is_empty: IDL.Func([], [IDL.Bool], ['query']),
        stable_map_0_items: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Nat8, IDL.Text))],
            ['query']
        ),
        stable_map_0_keys: IDL.Func([], [IDL.Vec(IDL.Nat8)], ['query']),
        stable_map_0_len: IDL.Func([], [IDL.Nat64], ['query']),
        stable_map_0_remove: IDL.Func([IDL.Nat8], [IDL.Opt(IDL.Text)], []),
        stable_map_0_values: IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
        stable_map_1_contains_key: IDL.Func([IDL.Nat16], [IDL.Bool], ['query']),
        stable_map_1_get: IDL.Func(
            [IDL.Nat16],
            [IDL.Opt(IDL.Vec(IDL.Nat8))],
            ['query']
        ),
        stable_map_1_insert: IDL.Func(
            [IDL.Nat16, IDL.Vec(IDL.Nat8)],
            [StableMap1InsertResult],
            []
        ),
        stable_map_1_is_empty: IDL.Func([], [IDL.Bool], ['query']),
        stable_map_1_items: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Nat16, IDL.Vec(IDL.Nat8)))],
            ['query']
        ),
        stable_map_1_keys: IDL.Func([], [IDL.Vec(IDL.Nat16)], ['query']),
        stable_map_1_len: IDL.Func([], [IDL.Nat64], ['query']),
        stable_map_1_remove: IDL.Func(
            [IDL.Nat16],
            [IDL.Opt(IDL.Vec(IDL.Nat8))],
            []
        ),
        stable_map_1_values: IDL.Func(
            [],
            [IDL.Vec(IDL.Vec(IDL.Nat8))],
            ['query']
        ),
        stable_map_2_contains_key: IDL.Func([IDL.Nat32], [IDL.Bool], ['query']),
        stable_map_2_get: IDL.Func([IDL.Nat32], [IDL.Opt(IDL.Nat)], ['query']),
        stable_map_2_insert: IDL.Func(
            [IDL.Nat32, IDL.Nat],
            [StableMap2InsertResult],
            []
        ),
        stable_map_2_is_empty: IDL.Func([], [IDL.Bool], ['query']),
        stable_map_2_items: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Nat32, IDL.Nat))],
            ['query']
        ),
        stable_map_2_keys: IDL.Func([], [IDL.Vec(IDL.Nat32)], ['query']),
        stable_map_2_len: IDL.Func([], [IDL.Nat64], ['query']),
        stable_map_2_remove: IDL.Func([IDL.Nat32], [IDL.Opt(IDL.Nat)], []),
        stable_map_2_values: IDL.Func([], [IDL.Vec(IDL.Nat)], ['query']),
        stable_map_3_contains_key: IDL.Func([Reaction], [IDL.Bool], ['query']),
        stable_map_3_get: IDL.Func([Reaction], [IDL.Opt(IDL.Int)], ['query']),
        stable_map_3_insert: IDL.Func(
            [Reaction, IDL.Int],
            [StableMap3InsertResult],
            []
        ),
        stable_map_3_is_empty: IDL.Func([], [IDL.Bool], ['query']),
        stable_map_3_items: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(Reaction, IDL.Int))],
            ['query']
        ),
        stable_map_3_keys: IDL.Func([], [IDL.Vec(Reaction)], ['query']),
        stable_map_3_len: IDL.Func([], [IDL.Nat64], ['query']),
        stable_map_3_remove: IDL.Func([Reaction], [IDL.Opt(IDL.Int)], []),
        stable_map_3_values: IDL.Func([], [IDL.Vec(IDL.Int)], ['query']),
        stable_map_4_contains_key: IDL.Func([User], [IDL.Bool], ['query']),
        stable_map_4_get: IDL.Func([User], [IDL.Opt(IDL.Float32)], ['query']),
        stable_map_4_insert: IDL.Func(
            [User, IDL.Float32],
            [StableMap4InsertResult],
            []
        ),
        stable_map_4_is_empty: IDL.Func([], [IDL.Bool], ['query']),
        stable_map_4_items: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(User, IDL.Float32))],
            ['query']
        ),
        stable_map_4_keys: IDL.Func([], [IDL.Vec(User)], ['query']),
        stable_map_4_len: IDL.Func([], [IDL.Nat64], ['query']),
        stable_map_4_remove: IDL.Func([User], [IDL.Opt(IDL.Float32)], []),
        stable_map_4_values: IDL.Func([], [IDL.Vec(IDL.Float32)], ['query']),
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
        stable_map_6_values: IDL.Func([], [IDL.Vec(IDL.Bool)], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
