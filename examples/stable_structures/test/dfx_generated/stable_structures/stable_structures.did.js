export const idlFactory = ({ IDL }) => {
    const Reaction = IDL.Variant({ Sad: IDL.Null, Happy: IDL.Null });
    const BlogPost = IDL.Record({ title: IDL.Text });
    const User = IDL.Record({
        username: IDL.Text,
        blog_posts: IDL.Vec(BlogPost)
    });
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
    const StableMap10InsertResult = IDL.Variant({
        ok: IDL.Opt(IDL.Opt(IDL.Bool)),
        err: InsertError
    });
    const StableMap11InsertResult = IDL.Variant({
        ok: IDL.Opt(User),
        err: InsertError
    });
    const StableMap12InsertResult = IDL.Variant({
        ok: IDL.Opt(Reaction),
        err: InsertError
    });
    const StableMap13InsertResult = IDL.Variant({
        ok: IDL.Opt(IDL.Principal),
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
        contains_key_stable_map_0: IDL.Func([IDL.Nat8], [IDL.Bool], ['query']),
        contains_key_stable_map_1: IDL.Func([IDL.Nat16], [IDL.Bool], ['query']),
        contains_key_stable_map_10: IDL.Func(
            [IDL.Float32],
            [IDL.Bool],
            ['query']
        ),
        contains_key_stable_map_11: IDL.Func([IDL.Nat], [IDL.Bool], ['query']),
        contains_key_stable_map_12: IDL.Func(
            [IDL.Vec(IDL.Nat8)],
            [IDL.Bool],
            ['query']
        ),
        contains_key_stable_map_13: IDL.Func([IDL.Text], [IDL.Bool], ['query']),
        contains_key_stable_map_2: IDL.Func([IDL.Nat32], [IDL.Bool], ['query']),
        contains_key_stable_map_3: IDL.Func([Reaction], [IDL.Bool], ['query']),
        contains_key_stable_map_4: IDL.Func([User], [IDL.Bool], ['query']),
        contains_key_stable_map_5: IDL.Func(
            [IDL.Opt(IDL.Text)],
            [IDL.Bool],
            ['query']
        ),
        contains_key_stable_map_6: IDL.Func(
            [IDL.Vec(IDL.Nat64)],
            [IDL.Bool],
            ['query']
        ),
        contains_key_stable_map_7: IDL.Func([IDL.Null], [IDL.Bool], ['query']),
        contains_key_stable_map_8: IDL.Func([IDL.Bool], [IDL.Bool], ['query']),
        contains_key_stable_map_9: IDL.Func(
            [IDL.Float64],
            [IDL.Bool],
            ['query']
        ),
        get_stable_map_0: IDL.Func([IDL.Nat8], [IDL.Opt(IDL.Text)], ['query']),
        get_stable_map_1: IDL.Func(
            [IDL.Nat16],
            [IDL.Opt(IDL.Vec(IDL.Nat8))],
            ['query']
        ),
        get_stable_map_10: IDL.Func(
            [IDL.Float32],
            [IDL.Opt(IDL.Opt(IDL.Bool))],
            ['query']
        ),
        get_stable_map_11: IDL.Func([IDL.Nat], [IDL.Opt(User)], ['query']),
        get_stable_map_12: IDL.Func(
            [IDL.Vec(IDL.Nat8)],
            [IDL.Opt(Reaction)],
            ['query']
        ),
        get_stable_map_13: IDL.Func(
            [IDL.Text],
            [IDL.Opt(IDL.Principal)],
            ['query']
        ),
        get_stable_map_2: IDL.Func([IDL.Nat32], [IDL.Opt(IDL.Nat)], ['query']),
        get_stable_map_3: IDL.Func([Reaction], [IDL.Opt(IDL.Int)], ['query']),
        get_stable_map_4: IDL.Func([User], [IDL.Opt(IDL.Float32)], ['query']),
        get_stable_map_5: IDL.Func(
            [IDL.Opt(IDL.Text)],
            [IDL.Opt(IDL.Float64)],
            ['query']
        ),
        get_stable_map_6: IDL.Func(
            [IDL.Vec(IDL.Nat64)],
            [IDL.Opt(IDL.Bool)],
            ['query']
        ),
        get_stable_map_7: IDL.Func([IDL.Null], [IDL.Opt(IDL.Null)], ['query']),
        get_stable_map_8: IDL.Func([IDL.Bool], [IDL.Opt(IDL.Null)], ['query']),
        get_stable_map_9: IDL.Func(
            [IDL.Float64],
            [IDL.Opt(IDL.Vec(IDL.Text))],
            ['query']
        ),
        is_empty_stable_map_0: IDL.Func([], [IDL.Bool], ['query']),
        is_empty_stable_map_1: IDL.Func([], [IDL.Bool], ['query']),
        is_empty_stable_map_10: IDL.Func([], [IDL.Bool], ['query']),
        is_empty_stable_map_11: IDL.Func([], [IDL.Bool], ['query']),
        is_empty_stable_map_12: IDL.Func([], [IDL.Bool], ['query']),
        is_empty_stable_map_13: IDL.Func([], [IDL.Bool], ['query']),
        is_empty_stable_map_2: IDL.Func([], [IDL.Bool], ['query']),
        is_empty_stable_map_3: IDL.Func([], [IDL.Bool], ['query']),
        is_empty_stable_map_4: IDL.Func([], [IDL.Bool], ['query']),
        is_empty_stable_map_5: IDL.Func([], [IDL.Bool], ['query']),
        is_empty_stable_map_6: IDL.Func([], [IDL.Bool], ['query']),
        is_empty_stable_map_7: IDL.Func([], [IDL.Bool], ['query']),
        is_empty_stable_map_8: IDL.Func([], [IDL.Bool], ['query']),
        is_empty_stable_map_9: IDL.Func([], [IDL.Bool], ['query']),
        len_stable_map_0: IDL.Func([], [IDL.Nat64], ['query']),
        len_stable_map_1: IDL.Func([], [IDL.Nat64], ['query']),
        len_stable_map_10: IDL.Func([], [IDL.Nat64], ['query']),
        len_stable_map_11: IDL.Func([], [IDL.Nat64], ['query']),
        len_stable_map_12: IDL.Func([], [IDL.Nat64], ['query']),
        len_stable_map_13: IDL.Func([], [IDL.Nat64], ['query']),
        len_stable_map_2: IDL.Func([], [IDL.Nat64], ['query']),
        len_stable_map_3: IDL.Func([], [IDL.Nat64], ['query']),
        len_stable_map_4: IDL.Func([], [IDL.Nat64], ['query']),
        len_stable_map_5: IDL.Func([], [IDL.Nat64], ['query']),
        len_stable_map_6: IDL.Func([], [IDL.Nat64], ['query']),
        len_stable_map_7: IDL.Func([], [IDL.Nat64], ['query']),
        len_stable_map_8: IDL.Func([], [IDL.Nat64], ['query']),
        len_stable_map_9: IDL.Func([], [IDL.Nat64], ['query']),
        remove_stable_map_0: IDL.Func([IDL.Nat8], [IDL.Opt(IDL.Text)], []),
        remove_stable_map_1: IDL.Func(
            [IDL.Nat16],
            [IDL.Opt(IDL.Vec(IDL.Nat8))],
            []
        ),
        remove_stable_map_10: IDL.Func(
            [IDL.Float32],
            [IDL.Opt(IDL.Opt(IDL.Bool))],
            []
        ),
        remove_stable_map_11: IDL.Func([IDL.Nat], [IDL.Opt(User)], []),
        remove_stable_map_12: IDL.Func(
            [IDL.Vec(IDL.Nat8)],
            [IDL.Opt(Reaction)],
            []
        ),
        remove_stable_map_13: IDL.Func(
            [IDL.Text],
            [IDL.Opt(IDL.Principal)],
            []
        ),
        remove_stable_map_2: IDL.Func([IDL.Nat32], [IDL.Opt(IDL.Nat)], []),
        remove_stable_map_3: IDL.Func([Reaction], [IDL.Opt(IDL.Int)], []),
        remove_stable_map_4: IDL.Func([User], [IDL.Opt(IDL.Float32)], []),
        remove_stable_map_5: IDL.Func(
            [IDL.Opt(IDL.Text)],
            [IDL.Opt(IDL.Float64)],
            []
        ),
        remove_stable_map_6: IDL.Func(
            [IDL.Vec(IDL.Nat64)],
            [IDL.Opt(IDL.Bool)],
            []
        ),
        remove_stable_map_7: IDL.Func([IDL.Null], [IDL.Opt(IDL.Null)], []),
        remove_stable_map_8: IDL.Func([IDL.Bool], [IDL.Opt(IDL.Null)], []),
        remove_stable_map_9: IDL.Func(
            [IDL.Float64],
            [IDL.Opt(IDL.Vec(IDL.Text))],
            []
        ),
        set_stable_map_0: IDL.Func(
            [IDL.Nat8, IDL.Text],
            [StableMap0InsertResult],
            []
        ),
        set_stable_map_1: IDL.Func(
            [IDL.Nat16, IDL.Vec(IDL.Nat8)],
            [StableMap1InsertResult],
            []
        ),
        set_stable_map_10: IDL.Func(
            [IDL.Float32, IDL.Opt(IDL.Bool)],
            [StableMap10InsertResult],
            []
        ),
        set_stable_map_11: IDL.Func(
            [IDL.Nat, User],
            [StableMap11InsertResult],
            []
        ),
        set_stable_map_12: IDL.Func(
            [IDL.Vec(IDL.Nat8), Reaction],
            [StableMap12InsertResult],
            []
        ),
        set_stable_map_13: IDL.Func(
            [IDL.Text, IDL.Principal],
            [StableMap13InsertResult],
            []
        ),
        set_stable_map_2: IDL.Func(
            [IDL.Nat32, IDL.Nat],
            [StableMap2InsertResult],
            []
        ),
        set_stable_map_3: IDL.Func(
            [Reaction, IDL.Int],
            [StableMap3InsertResult],
            []
        ),
        set_stable_map_4: IDL.Func(
            [User, IDL.Float32],
            [StableMap4InsertResult],
            []
        ),
        set_stable_map_5: IDL.Func(
            [IDL.Opt(IDL.Text), IDL.Float64],
            [StableMap5InsertResult],
            []
        ),
        set_stable_map_6: IDL.Func(
            [IDL.Vec(IDL.Nat64), IDL.Bool],
            [StableMap6InsertResult],
            []
        ),
        set_stable_map_7: IDL.Func(
            [IDL.Null, IDL.Null],
            [StableMap7InsertResult],
            []
        ),
        set_stable_map_8: IDL.Func(
            [IDL.Bool, IDL.Null],
            [StableMap7InsertResult],
            []
        ),
        set_stable_map_9: IDL.Func(
            [IDL.Float64, IDL.Vec(IDL.Text)],
            [StableMap9InsertResult],
            []
        )
    });
};
export const init = ({ IDL }) => {
    return [];
};
