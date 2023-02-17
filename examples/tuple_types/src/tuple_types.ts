import {
    CanisterResult,
    ExternalCanister,
    nat64,
    Principal,
    $query,
    update,
    Variant
} from 'azle';

// TODO maybe we should write tests for canister and stable storage?
// TODO for now we at least know the canister compiles
type CanisterTuple1 = [string, nat64];
type CanisterTuple2 = [string, CanisterTuple1];

class TestCanister extends ExternalCanister {
    @update
    test: (param: CanisterTuple1) => CanisterResult<CanisterTuple2>;
}

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

$query;
export function primitive_one_tuple_return_type(): PrimitiveOneTuple {
    return ['Hello'];
}

$query;
export function primitive_one_tuple_param(
    param: PrimitiveOneTuple
): PrimitiveOneTuple {
    return param;
}

$query;
export function primitive_one_tuple_inline_return_type(): [string] {
    return ['Greenland'];
}

$query;
export function primitive_one_tuple_inline_param(param: [string]): [string] {
    return param;
}

$query;
export function primitive_two_tuple_return_type(): PrimitiveTwoTuple {
    return ['Content-Type', 64n];
}

$query;
export function primitive_two_tuple_param(
    param: PrimitiveTwoTuple
): PrimitiveTwoTuple {
    return param;
}

$query;
export function primitive_two_tuple_inline_return_type(): [string, string] {
    return ['Fun', 'Times'];
}

$query;
export function primitive_two_tuple_inline_param(
    param: [string, string]
): [string, string] {
    return param;
}

$query;
export function primitive_three_tuple_return_type(): PrimitiveThreeTuple {
    return ['Good', 454n, Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')];
}

$query;
export function primitive_three_tuple_param(
    param: PrimitiveThreeTuple
): PrimitiveThreeTuple {
    return param;
}

$query;
export function primitive_three_tuple_inline_return_type(): [
    string,
    nat64,
    Principal
] {
    return ['Fun', 101n, Principal.fromText('aaaaa-aa')];
}

$query;
export function primitive_three_tuple_inline_param(
    param: [string, nat64, Principal]
): [string, nat64, Principal] {
    return param;
}

$query;
export function complex_one_tuple_return_type(): ComplexOneTuple {
    return [['Hello', 0n]];
}

$query;
export function complex_one_tuple_param(
    param: ComplexOneTuple
): ComplexOneTuple {
    return param;
}

$query;
export function complex_one_tuple_inline_return_type(): [PrimitiveTwoTuple] {
    return [['Candy', 56n]];
}

$query;
export function complex_one_tuple_inline_param(
    param: [PrimitiveTwoTuple]
): [PrimitiveTwoTuple] {
    return param;
}

$query;
export function complex_two_tuple_return_type(): ComplexTwoTuple {
    return [
        ['Content-Type', 64n],
        {
            id: '0',
            primitive_two_tuple: ['Content-Type', 64n]
        }
    ];
}

$query;
export function complex_two_tuple_param(
    param: ComplexTwoTuple
): ComplexTwoTuple {
    return param;
}

$query;
export function complex_two_tuple_inline_return_type(): [
    PrimitiveTwoTuple,
    User
] {
    return [
        ['Content-Type', 644n],
        {
            id: '444',
            primitive_two_tuple: ['Content-Type', 6_422n]
        }
    ];
}

$query;
export function complex_two_tuple_inline_param(
    param: [PrimitiveTwoTuple, User]
): [PrimitiveTwoTuple, User] {
    return param;
}

$query;
export function complex_three_tuple_return_type(): ComplexThreeTuple {
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

$query;
export function complex_three_tuple_param(
    param: ComplexThreeTuple
): ComplexThreeTuple {
    return param;
}

$query;
export function complex_three_tuple_inline_return_type(): [
    PrimitiveTwoTuple,
    User,
    Reaction
] {
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

$query;
export function complex_three_tuple_inline_param(
    param: [PrimitiveTwoTuple, User, Reaction]
): [PrimitiveTwoTuple, User, Reaction] {
    return param;
}

$query;
export function tuple_array_params_and_return_type(
    headers: Header[]
): Header[] {
    return headers;
}

$query;
export function tuple_array_record_field(): HttpResponse {
    return {
        headers: [
            ['Content-Type', 'application/json'],
            ['Accept-Ranges', 'bytes']
        ]
    };
}

$query;
export function tuple_array_variant_field(): StreamingCallbackType {
    return {
        with_headers: [
            ['Content-Type', 'application/json'],
            ['Accept-Ranges', 'bytes']
        ]
    };
}

$query;
export function two_tuple_with_inline_records(
    param: [{ hello: nat64 }, { goodbye: nat64 }]
): [{ hello: nat64 }, { goodbye: nat64 }] {
    return param;
}
