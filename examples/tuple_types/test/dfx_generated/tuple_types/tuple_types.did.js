export const idlFactory = ({ IDL }) => {
    const ComplexThreeTuple = IDL.Rec();
    const PrimitiveTwoTuple = IDL.Tuple(IDL.Text, IDL.Nat64);
    const User = IDL.Record({
        id: IDL.Text,
        primitive_two_tuple: PrimitiveTwoTuple
    });
    const Reaction = IDL.Variant({
        Bad: ComplexThreeTuple,
        Good: IDL.Null
    });
    ComplexThreeTuple.fill(IDL.Tuple(PrimitiveTwoTuple, User, Reaction));
    const ComplexTwoTuple = IDL.Tuple(PrimitiveTwoTuple, User);
    const PrimitiveThreeTuple = IDL.Tuple(IDL.Text, IDL.Nat64, IDL.Principal);
    const Header = IDL.Tuple(IDL.Text, IDL.Text);
    const HttpResponse = IDL.Record({ headers: IDL.Vec(Header) });
    const StreamingCallbackType = IDL.Variant({
        without_headers: IDL.Null,
        with_headers: IDL.Vec(Header)
    });
    return IDL.Service({
        complex_three_tuple_param: IDL.Func(
            [ComplexThreeTuple],
            [ComplexThreeTuple],
            ['query']
        ),
        complex_three_tuple_return_type: IDL.Func(
            [],
            [ComplexThreeTuple],
            ['query']
        ),
        complex_two_tuple_param: IDL.Func(
            [ComplexTwoTuple],
            [ComplexTwoTuple],
            ['query']
        ),
        complex_two_tuple_return_type: IDL.Func(
            [],
            [ComplexTwoTuple],
            ['query']
        ),
        primitive_three_tuple_param: IDL.Func(
            [PrimitiveThreeTuple],
            [PrimitiveThreeTuple],
            ['query']
        ),
        primitive_three_tuple_return_type: IDL.Func(
            [],
            [PrimitiveThreeTuple],
            ['query']
        ),
        primitive_two_tuple_param: IDL.Func(
            [PrimitiveTwoTuple],
            [PrimitiveTwoTuple],
            ['query']
        ),
        primitive_two_tuple_return_type: IDL.Func(
            [],
            [PrimitiveTwoTuple],
            ['query']
        ),
        tuple_array_params_and_return_type: IDL.Func(
            [IDL.Vec(Header)],
            [IDL.Vec(Header)],
            ['query']
        ),
        tuple_array_record_field: IDL.Func([], [HttpResponse], ['query']),
        tuple_array_variant_field: IDL.Func(
            [],
            [StreamingCallbackType],
            ['query']
        )
    });
};
export const init = ({ IDL }) => {
    return [];
};
