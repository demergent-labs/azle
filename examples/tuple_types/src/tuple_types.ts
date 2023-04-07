import {
    $query,
    CallResult,
    int,
    nat64,
    nat8,
    Principal,
    Record,
    Service,
    serviceUpdate,
    Tuple,
    Variant,
    Vec
} from 'azle';

// TODO maybe we should write tests for canister and stable storage?
// TODO for now we at least know the canister compiles
type CanisterTuple1 = Tuple<[string, nat64]>;
type CanisterTuple2 = Tuple<[string, CanisterTuple1]>;

class TestCanister extends Service {
    @serviceUpdate
    test: (param: CanisterTuple1) => CallResult<CanisterTuple2>;
}

type User = Record<{
    id: string;
    primitiveTwoTuple: PrimitiveTwoTuple;
}>;

type Reaction = Variant<{
    Good: null;
    Bad: ComplexThreeTuple;
}>;

type PrimitiveOneTuple = Tuple<[string]>;
type PrimitiveTwoTuple = Tuple<[string, nat64]>;
type PrimitiveThreeTuple = Tuple<[string, nat64, Principal]>;

type ComplexOneTuple = Tuple<[PrimitiveTwoTuple]>;
type ComplexTwoTuple = Tuple<[PrimitiveTwoTuple, User]>;
type ComplexThreeTuple = Tuple<[PrimitiveTwoTuple, User, Reaction]>;

type Header = Tuple<[string, string]>;

type HttpResponse = Record<{
    headers: Vec<Header>;
}>;

type StreamingCallbackType = Variant<{
    WithHeaders: Vec<Header>;
    WithoutHeaders: null;
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
export function primitiveOneTupleInlineReturnType(): Tuple<[string]> {
    return ['Greenland'];
}

$query;
export function primitiveOneTupleInlineParam(
    param: Tuple<[string]>
): Tuple<[string]> {
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
export function primitiveTwoTupleInlineReturnType(): Tuple<[string, string]> {
    return ['Fun', 'Times'];
}

$query;
export function primitiveTwoTupleInlineParam(
    param: Tuple<[string, string]>
): Tuple<[string, string]> {
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
export function primitiveThreeTupleInlineReturnType(): Tuple<
    [string, nat64, Principal]
> {
    return ['Fun', 101n, Principal.fromText('aaaaa-aa')];
}

$query;
export function primitiveThreeTupleInlineParam(
    param: Tuple<[string, nat64, Principal]>
): Tuple<[string, nat64, Principal]> {
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
export function complexOneTupleInlineReturnType(): Tuple<[PrimitiveTwoTuple]> {
    return [['Candy', 56n]];
}

$query;
export function complexOneTupleInlineParam(
    param: Tuple<[PrimitiveTwoTuple]>
): Tuple<[PrimitiveTwoTuple]> {
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
export function complexTwoTupleInlineReturnType(): Tuple<
    [PrimitiveTwoTuple, User]
> {
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
    param: Tuple<[PrimitiveTwoTuple, User]>
): Tuple<[PrimitiveTwoTuple, User]> {
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
export function complexThreeTupleInlineReturnType(): Tuple<
    [PrimitiveTwoTuple, User, Reaction]
> {
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
    param: Tuple<[PrimitiveTwoTuple, User, Reaction]>
): Tuple<[PrimitiveTwoTuple, User, Reaction]> {
    return param;
}

$query;
export function tupleArrayParamsAndReturnType(
    headers: Vec<Header>
): Vec<Header> {
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
        WithHeaders: [
            ['Content-Type', 'application/json'],
            ['Accept-Ranges', 'bytes']
        ]
    };
}

$query;
export function twoTupleWithInlineRecords(
    param: Tuple<[Record<{ hello: nat64 }>, Record<{ goodbye: nat64 }>]>
): Tuple<[Record<{ hello: nat64 }>, Record<{ goodbye: nat64 }>]> {
    return param;
}

$query;
export function nestedTupleQuery(
    param: Tuple<[Tuple<[string, Tuple<[nat8, nat8]>]>, int]>
): Tuple<[Tuple<[string, Tuple<[nat8, nat8]>]>, int]> {
    return param;
}
