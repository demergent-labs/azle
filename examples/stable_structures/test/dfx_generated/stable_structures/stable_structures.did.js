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
    const StableMap10InsertResult = IDL.Variant({
        ok: IDL.Opt(IDL.Opt(IDL.Bool)),
        err: InsertError
    });
    const BlogPost = IDL.Record({ title: IDL.Text });
    const User = IDL.Record({
        username: IDL.Text,
        blog_posts: IDL.Vec(BlogPost)
    });
    const StableMap11InsertResult = IDL.Variant({
        ok: IDL.Opt(User),
        err: InsertError
    });
    const Reaction = IDL.Variant({ Sad: IDL.Null, Happy: IDL.Null });
    const StableMap12InsertResult = IDL.Variant({
        ok: IDL.Opt(Reaction),
        err: InsertError
    });
    const StableMap13InsertResult = IDL.Variant({
        ok: IDL.Opt(IDL.Principal),
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
    const StableMap3InsertResult = IDL.Variant({
        ok: IDL.Opt(IDL.Int),
        err: InsertError
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
    const StableMap7InsertResult = IDL.Variant({
        ok: IDL.Opt(IDL.Null),
        err: InsertError
    });
    const StableMap9InsertResult = IDL.Variant({
        ok: IDL.Opt(IDL.Vec(IDL.Text)),
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
        stable_map_10_contains_key: IDL.Func(
            [IDL.Float32],
            [IDL.Bool],
            ['query']
        ),
        stable_map_10_get: IDL.Func(
            [IDL.Float32],
            [IDL.Opt(IDL.Opt(IDL.Bool))],
            ['query']
        ),
        stable_map_10_insert: IDL.Func(
            [IDL.Float32, IDL.Opt(IDL.Bool)],
            [StableMap10InsertResult],
            []
        ),
        stable_map_10_is_empty: IDL.Func([], [IDL.Bool], ['query']),
        stable_map_10_items: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Float32, IDL.Opt(IDL.Bool)))],
            ['query']
        ),
        stable_map_10_keys: IDL.Func([], [IDL.Vec(IDL.Float32)], ['query']),
        stable_map_10_len: IDL.Func([], [IDL.Nat64], ['query']),
        stable_map_10_remove: IDL.Func(
            [IDL.Float32],
            [IDL.Opt(IDL.Opt(IDL.Bool))],
            []
        ),
        stable_map_10_values: IDL.Func(
            [],
            [IDL.Vec(IDL.Opt(IDL.Bool))],
            ['query']
        ),
        stable_map_11_contains_key: IDL.Func([IDL.Nat], [IDL.Bool], ['query']),
        stable_map_11_get: IDL.Func([IDL.Nat], [IDL.Opt(User)], ['query']),
        stable_map_11_insert: IDL.Func(
            [IDL.Nat, User],
            [StableMap11InsertResult],
            []
        ),
        stable_map_11_is_empty: IDL.Func([], [IDL.Bool], ['query']),
        stable_map_11_items: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Nat, User))],
            ['query']
        ),
        stable_map_11_keys: IDL.Func([], [IDL.Vec(IDL.Nat)], ['query']),
        stable_map_11_len: IDL.Func([], [IDL.Nat64], ['query']),
        stable_map_11_remove: IDL.Func([IDL.Nat], [IDL.Opt(User)], []),
        stable_map_11_values: IDL.Func([], [IDL.Vec(User)], ['query']),
        stable_map_12_contains_key: IDL.Func(
            [IDL.Vec(IDL.Nat8)],
            [IDL.Bool],
            ['query']
        ),
        stable_map_12_get: IDL.Func(
            [IDL.Vec(IDL.Nat8)],
            [IDL.Opt(Reaction)],
            ['query']
        ),
        stable_map_12_insert: IDL.Func(
            [IDL.Vec(IDL.Nat8), Reaction],
            [StableMap12InsertResult],
            []
        ),
        stable_map_12_is_empty: IDL.Func([], [IDL.Bool], ['query']),
        stable_map_12_items: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Vec(IDL.Nat8), Reaction))],
            ['query']
        ),
        stable_map_12_keys: IDL.Func(
            [],
            [IDL.Vec(IDL.Vec(IDL.Nat8))],
            ['query']
        ),
        stable_map_12_len: IDL.Func([], [IDL.Nat64], ['query']),
        stable_map_12_remove: IDL.Func(
            [IDL.Vec(IDL.Nat8)],
            [IDL.Opt(Reaction)],
            []
        ),
        stable_map_12_values: IDL.Func([], [IDL.Vec(Reaction)], ['query']),
        stable_map_13_contains_key: IDL.Func([IDL.Text], [IDL.Bool], ['query']),
        stable_map_13_get: IDL.Func(
            [IDL.Text],
            [IDL.Opt(IDL.Principal)],
            ['query']
        ),
        stable_map_13_insert: IDL.Func(
            [IDL.Text, IDL.Principal],
            [StableMap13InsertResult],
            []
        ),
        stable_map_13_is_empty: IDL.Func([], [IDL.Bool], ['query']),
        stable_map_13_items: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Principal))],
            ['query']
        ),
        stable_map_13_keys: IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
        stable_map_13_len: IDL.Func([], [IDL.Nat64], ['query']),
        stable_map_13_remove: IDL.Func(
            [IDL.Text],
            [IDL.Opt(IDL.Principal)],
            []
        ),
        stable_map_13_values: IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
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
