import {
    Query,
    nat64,
    Principal,
    Variant,
    Canister,
    CanisterResult,
    Stable
} from 'azle';

// TODO maybe we should write tests for canister and stable storage?
// TODO for now we at least know the canister compiles
type CanisterTuple1 = [string, nat64];
type CanisterTuple2 = [string, CanisterTuple1];

type TestCanister = Canister<{
    test(param: CanisterTuple1): CanisterResult<CanisterTuple2>;
}>;

type StableTuple1 = [string, nat64];
type StableTuple2 = [string, CanisterTuple1];

type StableStorage = Stable<{
    stable_tuple_1: StableTuple1;
    stable_tuple_2: StableTuple2;
}>;

type User = {
    id: string;
    primitive_two_tuple: PrimitiveTwoTuple;
};

type Reaction = Variant<{
    Good: null;
    Bad: ComplexThreeTuple;
}>;

type PrimitiveOneTuple = [string];
type PrimitiveTwoTuple = [string, nat64];
type PrimitiveThreeTuple = [string, nat64, Principal];

type ComplexOneTuple = [PrimitiveTwoTuple];
type ComplexTwoTuple = [PrimitiveTwoTuple, User];
type ComplexThreeTuple = [PrimitiveTwoTuple, User, Reaction];

type Header = [string, string];

type HttpResponse = {
    headers: Header[];
};

type StreamingCallbackType = Variant<{
    with_headers: Header[];
    without_headers: null;
}>;

export function primitive_one_tuple_return_type(): Query<PrimitiveOneTuple> {
    return ['Hello'];
}

export function primitive_one_tuple_param(
    param: PrimitiveOneTuple
): Query<PrimitiveOneTuple> {
    return param;
}

export function primitive_one_tuple_inline_return_type(): Query<[string]> {
    return ['Greenland'];
}

export function primitive_one_tuple_inline_param(
    param: [string]
): Query<[string]> {
    return param;
}

export function primitive_two_tuple_return_type(): Query<PrimitiveTwoTuple> {
    return ['Content-Type', 64n];
}

export function primitive_two_tuple_param(
    header: PrimitiveTwoTuple
): Query<PrimitiveTwoTuple> {
    return header;
}

export function primitive_two_tuple_inline_return_type(): Query<
    [string, string]
> {
    return ['Fun', 'Times'];
}

export function primitive_two_tuple_inline_param(
    param: [string, string]
): Query<[string, string]> {
    return param;
}

export function primitive_three_tuple_return_type(): Query<PrimitiveThreeTuple> {
    return ['Good', 454n, Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')];
}

export function primitive_three_tuple_param(
    header: PrimitiveThreeTuple
): Query<PrimitiveThreeTuple> {
    return header;
}

export function primitive_three_tuple_inline_return_type(): Query<
    [string, nat64, Principal]
> {
    return ['Fun', 101n, Principal.fromText('aaaaa-aa')];
}

export function primitive_three_tuple_inline_param(
    param: [string, nat64, Principal]
): Query<[string, nat64, Principal]> {
    return param;
}

export function complex_one_tuple_return_type(): Query<ComplexOneTuple> {
    return [['Hello', 0n]];
}

export function complex_one_tuple_param(
    param: ComplexOneTuple
): Query<ComplexOneTuple> {
    return param;
}

export function complex_one_tuple_inline_return_type(): Query<
    [PrimitiveTwoTuple]
> {
    return [['Candy', 56n]];
}

export function complex_one_tuple_inline_param(
    param: [PrimitiveTwoTuple]
): Query<[PrimitiveTwoTuple]> {
    return param;
}

export function complex_two_tuple_return_type(): Query<ComplexTwoTuple> {
    return [
        ['Content-Type', 64n],
        {
            id: '0',
            primitive_two_tuple: ['Content-Type', 64n]
        }
    ];
}

export function complex_two_tuple_param(
    header: ComplexTwoTuple
): Query<ComplexTwoTuple> {
    return header;
}

export function complex_two_tuple_inline_return_type(): Query<
    [PrimitiveTwoTuple, User]
> {
    return [
        ['Content-Type', 644n],
        {
            id: '444',
            primitive_two_tuple: ['Content-Type', 6_422n]
        }
    ];
}

export function complex_two_tuple_inline_param(
    param: [PrimitiveTwoTuple, User]
): Query<[PrimitiveTwoTuple, User]> {
    return param;
}

export function complex_three_tuple_return_type(): Query<ComplexThreeTuple> {
    return [
        ['Content-Type', 64n],
        {
            id: '0',
            primitive_two_tuple: ['Content-Type', 64n]
        },
        {
            Bad: [
                ['Content-Type', 64n],
                {
                    id: '1',
                    primitive_two_tuple: ['Content-Type', 64n]
                },
                {
                    Good: null
                }
            ]
        }
    ];
}

export function complex_three_tuple_param(
    header: ComplexThreeTuple
): Query<ComplexThreeTuple> {
    return header;
}

export function complex_three_tuple_inline_return_type(): Query<
    [PrimitiveTwoTuple, User, Reaction]
> {
    return [
        ['Content-Type', 64n],
        {
            id: '0',
            primitive_two_tuple: ['Content-Type', 64n]
        },
        {
            Bad: [
                ['Content-Type', 64n],
                {
                    id: '1',
                    primitive_two_tuple: ['Content-Type', 64n]
                },
                {
                    Good: null
                }
            ]
        }
    ];
}

export function complex_three_tuple_inline_param(
    param: [PrimitiveTwoTuple, User, Reaction]
): Query<[PrimitiveTwoTuple, User, Reaction]> {
    return param;
}

export function tuple_array_params_and_return_type(
    headers: Header[]
): Query<Header[]> {
    return headers;
}

export function tuple_array_record_field(): Query<HttpResponse> {
    return {
        headers: [
            ['Content-Type', 'application/json'],
            ['Accept-Ranges', 'bytes']
        ]
    };
}

export function tuple_array_variant_field(): Query<StreamingCallbackType> {
    return {
        with_headers: [
            ['Content-Type', 'application/json'],
            ['Accept-Ranges', 'bytes']
        ]
    };
}

export function two_tuple_with_inline_records(
    param: [{ hello: nat64 }, { goodbye: nat64 }]
): Query<[{ hello: nat64 }, { goodbye: nat64 }]> {
    return param;
}
