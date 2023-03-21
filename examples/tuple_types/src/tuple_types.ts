import {
    $query,
    CanisterResult,
    ExternalCanister,
    int,
    nat64,
    nat8,
    Principal,
    Record,
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

type User = Record<{
    id: string;
    primitiveTwoTuple: PrimitiveTwoTuple;
}>;

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

type HttpResponse = Record<{
    headers: Header[];
}>;

type StreamingCallbackType = Variant<{
    withHeaders: Header[];
    withoutHeaders: null;
}>;

$query;
export function primitiveOneTupleReturnType(): PrimitiveOneTuple {
    return ['Hello'];
}

$query;
export function primitiveOneTupleParam(
    param: PrimitiveOneTuple
): PrimitiveOneTuple {
    return param;
}

$query;
export function primitiveOneTupleInlineReturnType(): [string] {
    return ['Greenland'];
}

$query;
export function primitiveOneTupleInlineParam(param: [string]): [string] {
    return param;
}

$query;
export function primitiveTwoTupleReturnType(): PrimitiveTwoTuple {
    return ['Content-Type', 64n];
}

$query;
export function primitiveTwoTupleParam(
    param: PrimitiveTwoTuple
): PrimitiveTwoTuple {
    return param;
}

$query;
export function primitiveTwoTupleInlineReturnType(): [string, string] {
    return ['Fun', 'Times'];
}

$query;
export function primitiveTwoTupleInlineParam(
    param: [string, string]
): [string, string] {
    return param;
}

$query;
export function primitiveThreeTupleReturnType(): PrimitiveThreeTuple {
    return ['Good', 454n, Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')];
}

$query;
export function primitiveThreeTupleParam(
    param: PrimitiveThreeTuple
): PrimitiveThreeTuple {
    return param;
}

$query;
export function primitiveThreeTupleInlineReturnType(): [
    string,
    nat64,
    Principal
] {
    return ['Fun', 101n, Principal.fromText('aaaaa-aa')];
}

$query;
export function primitiveThreeTupleInlineParam(
    param: [string, nat64, Principal]
): [string, nat64, Principal] {
    return param;
}

$query;
export function complexOneTupleReturnType(): ComplexOneTuple {
    return [['Hello', 0n]];
}

$query;
export function complexOneTupleParam(param: ComplexOneTuple): ComplexOneTuple {
    return param;
}

$query;
export function complexOneTupleInlineReturnType(): [PrimitiveTwoTuple] {
    return [['Candy', 56n]];
}

$query;
export function complexOneTupleInlineParam(
    param: [PrimitiveTwoTuple]
): [PrimitiveTwoTuple] {
    return param;
}

$query;
export function complexTwoTupleReturnType(): ComplexTwoTuple {
    return [
        ['Content-Type', 64n],
        {
            id: '0',
            primitiveTwoTuple: ['Content-Type', 64n]
        }
    ];
}

$query;
export function complexTwoTupleParam(param: ComplexTwoTuple): ComplexTwoTuple {
    return param;
}

$query;
export function complexTwoTupleInlineReturnType(): [PrimitiveTwoTuple, User] {
    return [
        ['Content-Type', 644n],
        {
            id: '444',
            primitiveTwoTuple: ['Content-Type', 6_422n]
        }
    ];
}

$query;
export function complexTwoTupleInlineParam(
    param: [PrimitiveTwoTuple, User]
): [PrimitiveTwoTuple, User] {
    return param;
}

$query;
export function complexThreeTupleReturnType(): ComplexThreeTuple {
    return [
        ['Content-Type', 64n],
        {
            id: '0',
            primitiveTwoTuple: ['Content-Type', 64n]
        },
        {
            Bad: [
                ['Content-Type', 64n],
                {
                    id: '1',
                    primitiveTwoTuple: ['Content-Type', 64n]
                },
                {
                    Good: null
                }
            ]
        }
    ];
}

$query;
export function complexThreeTupleParam(
    param: ComplexThreeTuple
): ComplexThreeTuple {
    return param;
}

$query;
export function complexThreeTupleInlineReturnType(): [
    PrimitiveTwoTuple,
    User,
    Reaction
] {
    return [
        ['Content-Type', 64n],
        {
            id: '0',
            primitiveTwoTuple: ['Content-Type', 64n]
        },
        {
            Bad: [
                ['Content-Type', 64n],
                {
                    id: '1',
                    primitiveTwoTuple: ['Content-Type', 64n]
                },
                {
                    Good: null
                }
            ]
        }
    ];
}

$query;
export function complexThreeTupleInlineParam(
    param: [PrimitiveTwoTuple, User, Reaction]
): [PrimitiveTwoTuple, User, Reaction] {
    return param;
}

$query;
export function tupleArrayParamsAndReturnType(headers: Header[]): Header[] {
    return headers;
}

$query;
export function tupleArrayRecordField(): HttpResponse {
    return {
        headers: [
            ['Content-Type', 'application/json'],
            ['Accept-Ranges', 'bytes']
        ]
    };
}

$query;
export function tupleArrayVariantField(): StreamingCallbackType {
    return {
        withHeaders: [
            ['Content-Type', 'application/json'],
            ['Accept-Ranges', 'bytes']
        ]
    };
}

$query;
export function twoTupleWithInlineRecords(
    param: [Record<{ hello: nat64 }>, Record<{ goodbye: nat64 }>]
): [Record<{ hello: nat64 }>, Record<{ goodbye: nat64 }>] {
    return param;
}

$query;
export function nestedTupleQuery(
    param: [[string, [nat8, nat8]], int]
): [[string, [nat8, nat8]], int] {
    return param;
}
