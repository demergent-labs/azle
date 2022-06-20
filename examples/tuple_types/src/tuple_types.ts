// TODO add tests for inline types inside of tuple (not sure if Candid even supports that)

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

// type PrimitiveOneTuple = [string]; // TODO https://github.com/demergent-labs/azle/issues/254
type PrimitiveTwoTuple = [string, nat64];
type PrimitiveThreeTuple = [string, nat64, Principal];

// type ComplexOneTuple = [PrimitiveTwoTuple]; // TODO https://github.com/demergent-labs/azle/issues/254
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

// TODO https://github.com/demergent-labs/azle/issues/254
// export function primitive_one_tuple_return_type(): Query<PrimitiveOneTuple> {
//     return ['Hello'];
// }

// export function primitive_one_tuple_param(param: PrimitiveOneTuple): Query<PrimitiveOneTuple> {
//     return param;
// }

// TODO wait for https://github.com/demergent-labs/azle/issues/253
// TODO primitive_one_tuple_inline_param
// TODO primitive_one_tuple_inline_return_type

export function primitive_two_tuple_return_type(): Query<PrimitiveTwoTuple> {
    return ['Content-Type', 64n];
}

export function primitive_two_tuple_param(
    header: PrimitiveTwoTuple
): Query<PrimitiveTwoTuple> {
    return header;
}

// TODO wait for https://github.com/demergent-labs/azle/issues/253
// export function primitive_two_tuple_inline_return_type(): Query<[string, string]> {
//     return ['Fun', 'Times'];
// }

// TODO wait for https://github.com/demergent-labs/azle/issues/253
// export function primitive_two_tuple_inline_param(header: [string, string]): Query<Header> {
//     return header;
// }

export function primitive_three_tuple_return_type(): Query<PrimitiveThreeTuple> {
    return ['Good', 454n, Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')];
}

export function primitive_three_tuple_param(
    header: PrimitiveThreeTuple
): Query<PrimitiveThreeTuple> {
    return header;
}

// TODO wait for https://github.com/demergent-labs/azle/issues/253
// TODO primitive_three_tuple_inline_param
// TODO primitive_three_tuple_inline_return_type

// TODO https://github.com/demergent-labs/azle/issues/254
// export function complex_one_tuple_return_type(): Query<ComplexOneTuple> {
//     return [
//         ['Hello']
//     ];
// }

// export function complex_one_tuple_param(param: ComplexOneTuple): Query<ComplexOneTuple> {
//     return param;
// }

// TODO wait for https://github.com/demergent-labs/azle/issues/253
// TODO complex_one_tuple_inline_param
// TODO complex_one_tuple_inline_return_type

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

// TODO wait for https://github.com/demergent-labs/azle/issues/253
// TODO complex_two_tuple_inline_param
// TODO complex_two_tuple_inline_return_type

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

// TODO wait for https://github.com/demergent-labs/azle/issues/253
// TODO complex_three_tuple_inline_param
// TODO complex_three_tuple_inline_return_type

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
