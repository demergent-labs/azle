export const idlFactory = ({ IDL }) => {
    const Person = IDL.Record({ age: IDL.Nat8, name: IDL.Text });
    const State = IDL.Variant({
        gas: IDL.Null,
        solid: IDL.Null,
        liquid: IDL.Null
    });
    return IDL.Service({
        list_of_blob: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Nat8))],
            [IDL.Vec(IDL.Vec(IDL.Nat8))],
            ['query']
        ),
        list_of_bool: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Bool)))],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Bool)))],
            ['query']
        ),
        list_of_empty: IDL.Func(
            [],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Empty)))],
            ['query']
        ),
        list_of_f32: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Float32)))],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Float32)))],
            ['query']
        ),
        list_of_f64: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Float64)))],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Float64)))],
            ['query']
        ),
        list_of_func: IDL.Func(
            [
                IDL.Vec(
                    IDL.Vec(
                        IDL.Vec(IDL.Func([IDL.Text], [IDL.Text], ['query']))
                    )
                )
            ],
            [
                IDL.Vec(
                    IDL.Vec(
                        IDL.Vec(IDL.Func([IDL.Text], [IDL.Text], ['query']))
                    )
                )
            ],
            ['query']
        ),
        list_of_int: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int)))],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int)))],
            ['query']
        ),
        list_of_int16: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int16)))],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int16)))],
            ['query']
        ),
        list_of_int32: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int32)))],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int32)))],
            ['query']
        ),
        list_of_int64: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int64)))],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int64)))],
            ['query']
        ),
        list_of_int8: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int8)))],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int8)))],
            ['query']
        ),
        list_of_list_of_blob: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat8)))],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat8)))],
            ['query']
        ),
        list_of_list_of_int8: IDL.Func(
            [],
            [
                IDL.Vec(
                    IDL.Vec(
                        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int8)))))
                    )
                )
            ],
            ['query']
        ),
        list_of_nat: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat)))],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat)))],
            ['query']
        ),
        list_of_nat16: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat16)))],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat16)))],
            ['query']
        ),
        list_of_nat32: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat32)))],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat32)))],
            ['query']
        ),
        list_of_nat64: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat64)))],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat64)))],
            ['query']
        ),
        list_of_nat8: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat8)))],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat8)))],
            ['query']
        ),
        list_of_null: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Null)))],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Null)))],
            ['query']
        ),
        list_of_option_string: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Opt(IDL.Text))))],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Opt(IDL.Text))))],
            ['query']
        ),
        list_of_principal: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Principal)))],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Principal)))],
            ['query']
        ),
        list_of_record: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(Person)))],
            [IDL.Vec(IDL.Vec(IDL.Vec(Person)))],
            ['query']
        ),
        list_of_reserved: IDL.Func(
            [],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Reserved)))],
            ['query']
        ),
        list_of_string: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Text)))],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Text)))],
            ['query']
        ),
        list_of_string_four: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Vec(IDL.Text))))],
            [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Vec(IDL.Text))))],
            ['query']
        ),
        list_of_string_one: IDL.Func(
            [IDL.Vec(IDL.Text)],
            [IDL.Vec(IDL.Text)],
            ['query']
        ),
        list_of_string_two: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Text))],
            [IDL.Vec(IDL.Vec(IDL.Text))],
            ['query']
        ),
        list_of_variant: IDL.Func(
            [IDL.Vec(IDL.Vec(IDL.Vec(State)))],
            [IDL.Vec(IDL.Vec(IDL.Vec(State)))],
            ['query']
        )
    });
};
export const init = ({ IDL }) => {
    return [];
};
