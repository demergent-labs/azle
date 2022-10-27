export const idlFactory = ({ IDL }) => {
    const Box = IDL.Rec();
    const User = IDL.Record({
        id: IDL.Text,
        primitive_two_tuple: IDL.Tuple(IDL.Text, IDL.Nat64)
    });
    Box.fill(
        IDL.Variant({
            Bad: IDL.Tuple(
                IDL.Tuple(IDL.Text, IDL.Nat64),
                IDL.Record({
                    id: IDL.Text,
                    primitive_two_tuple: IDL.Tuple(IDL.Text, IDL.Nat64)
                }),
                Box
            ),
            Good: IDL.Null
        })
    );
    const Reaction = IDL.Variant({
        Bad: IDL.Tuple(IDL.Tuple(IDL.Text, IDL.Nat64), User, Box),
        Good: IDL.Null
    });
    const HttpResponse = IDL.Record({
        headers: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))
    });
    const StreamingCallbackType = IDL.Variant({
        without_headers: IDL.Null,
        with_headers: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))
    });
    const AzleInline2622686677058427252 = IDL.Record({ hello: IDL.Nat64 });
    const AzleInline13573015674368967065 = IDL.Record({ goodbye: IDL.Nat64 });
    return IDL.Service({
        complex_one_tuple_inline_param: IDL.Func(
            [IDL.Tuple(IDL.Text, IDL.Nat64)],
            [IDL.Tuple(IDL.Text, IDL.Nat64)],
            ['query']
        ),
        complex_one_tuple_inline_return_type: IDL.Func(
            [],
            [IDL.Tuple(IDL.Text, IDL.Nat64)],
            ['query']
        ),
        complex_one_tuple_param: IDL.Func(
            [IDL.Tuple(IDL.Text, IDL.Nat64)],
            [IDL.Tuple(IDL.Text, IDL.Nat64)],
            ['query']
        ),
        complex_one_tuple_return_type: IDL.Func(
            [],
            [IDL.Tuple(IDL.Text, IDL.Nat64)],
            ['query']
        ),
        complex_three_tuple_inline_param: IDL.Func(
            [IDL.Tuple(IDL.Tuple(IDL.Text, IDL.Nat64), User, Reaction)],
            [IDL.Tuple(IDL.Tuple(IDL.Text, IDL.Nat64), User, Reaction)],
            ['query']
        ),
        complex_three_tuple_inline_return_type: IDL.Func(
            [],
            [IDL.Tuple(IDL.Tuple(IDL.Text, IDL.Nat64), User, Reaction)],
            ['query']
        ),
        complex_three_tuple_param: IDL.Func(
            [IDL.Tuple(IDL.Tuple(IDL.Text, IDL.Nat64), User, Box)],
            [IDL.Tuple(IDL.Tuple(IDL.Text, IDL.Nat64), User, Box)],
            ['query']
        ),
        complex_three_tuple_return_type: IDL.Func(
            [],
            [IDL.Tuple(IDL.Tuple(IDL.Text, IDL.Nat64), User, Box)],
            ['query']
        ),
        complex_two_tuple_inline_param: IDL.Func(
            [IDL.Tuple(IDL.Tuple(IDL.Text, IDL.Nat64), User)],
            [IDL.Tuple(IDL.Tuple(IDL.Text, IDL.Nat64), User)],
            ['query']
        ),
        complex_two_tuple_inline_return_type: IDL.Func(
            [],
            [IDL.Tuple(IDL.Tuple(IDL.Text, IDL.Nat64), User)],
            ['query']
        ),
        complex_two_tuple_param: IDL.Func(
            [IDL.Tuple(IDL.Tuple(IDL.Text, IDL.Nat64), User)],
            [IDL.Tuple(IDL.Tuple(IDL.Text, IDL.Nat64), User)],
            ['query']
        ),
        complex_two_tuple_return_type: IDL.Func(
            [],
            [IDL.Tuple(IDL.Tuple(IDL.Text, IDL.Nat64), User)],
            ['query']
        ),
        primitive_one_tuple_inline_param: IDL.Func(
            [IDL.Text],
            [IDL.Text],
            ['query']
        ),
        primitive_one_tuple_inline_return_type: IDL.Func(
            [],
            [IDL.Text],
            ['query']
        ),
        primitive_one_tuple_param: IDL.Func([IDL.Text], [IDL.Text], ['query']),
        primitive_one_tuple_return_type: IDL.Func([], [IDL.Text], ['query']),
        primitive_three_tuple_inline_param: IDL.Func(
            [IDL.Tuple(IDL.Text, IDL.Nat64, IDL.Principal)],
            [IDL.Tuple(IDL.Text, IDL.Nat64, IDL.Principal)],
            ['query']
        ),
        primitive_three_tuple_inline_return_type: IDL.Func(
            [],
            [IDL.Tuple(IDL.Text, IDL.Nat64, IDL.Principal)],
            ['query']
        ),
        primitive_three_tuple_param: IDL.Func(
            [IDL.Tuple(IDL.Text, IDL.Nat64, IDL.Principal)],
            [IDL.Tuple(IDL.Text, IDL.Nat64, IDL.Principal)],
            ['query']
        ),
        primitive_three_tuple_return_type: IDL.Func(
            [],
            [IDL.Tuple(IDL.Text, IDL.Nat64, IDL.Principal)],
            ['query']
        ),
        primitive_two_tuple_inline_param: IDL.Func(
            [IDL.Tuple(IDL.Text, IDL.Text)],
            [IDL.Tuple(IDL.Text, IDL.Text)],
            ['query']
        ),
        primitive_two_tuple_inline_return_type: IDL.Func(
            [],
            [IDL.Tuple(IDL.Text, IDL.Text)],
            ['query']
        ),
        primitive_two_tuple_param: IDL.Func(
            [IDL.Tuple(IDL.Text, IDL.Nat64)],
            [IDL.Tuple(IDL.Text, IDL.Nat64)],
            ['query']
        ),
        primitive_two_tuple_return_type: IDL.Func(
            [],
            [IDL.Tuple(IDL.Text, IDL.Nat64)],
            ['query']
        ),
        tuple_array_params_and_return_type: IDL.Func(
            [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))],
            [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))],
            ['query']
        ),
        tuple_array_record_field: IDL.Func([], [HttpResponse], ['query']),
        tuple_array_variant_field: IDL.Func(
            [],
            [StreamingCallbackType],
            ['query']
        ),
        two_tuple_with_inline_records: IDL.Func(
            [
                IDL.Tuple(
                    AzleInline2622686677058427252,
                    AzleInline13573015674368967065
                )
            ],
            [
                IDL.Tuple(
                    AzleInline2622686677058427252,
                    AzleInline13573015674368967065
                )
            ],
            ['query']
        )
    });
};
export const init = ({ IDL }) => {
    return [];
};
