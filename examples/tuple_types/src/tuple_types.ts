import {
    query,
    // CallResult,
    int,
    nat64,
    nat8,
    Null,
    Principal,
    Record,
    // Service,
    // serviceUpdate,
    text,
    Tuple,
    Variant,
    Vec,
    Void,
    candid,
    principal
} from 'azle';

import { IDL } from '@dfinity/candid';

// TODO maybe we should write tests for canister and stable storage?
// TODO for now we at least know the canister compiles
// type CanisterTuple1 = Tuple<[text, nat64]>;
// type CanisterTuple2 = Tuple<[text, CanisterTuple1]>;

// class TestCanister extends Service {
//     @serviceUpdate
//     test: (param: CanisterTuple1) => CallResult<CanisterTuple2>;
// }

type PrimitiveOneTuple = Tuple<[text]>;
const PrimitiveOneTuple = Tuple(text);
type PrimitiveTwoTuple = Tuple<[text, nat64]>;
const PrimitiveTwoTuple = Tuple(text, nat64);
type PrimitiveThreeTuple = Tuple<[text, nat64, Principal]>;
const PrimitiveThreeTuple = Tuple(text, nat64, principal);

class User extends Record {
    @candid(text)
    id: text;

    @candid(PrimitiveTwoTuple)
    primitiveTwoTuple: PrimitiveTwoTuple;
}

type Header = Tuple<[text, text]>;
const Header = Tuple(text, text);

class StreamingCallbackType extends Variant {
    @candid(Vec(Header))
    WithHeaders?: Vec<Header>;

    @candid(Null)
    WithoutHeaders?: Null;
}

class Reaction extends Variant {
    @candid(Null)
    Good?: Null;

    @candid(Tuple(PrimitiveTwoTuple, User, Reaction))
    Bad?: ComplexThreeTuple;
}

type ComplexOneTuple = Tuple<[PrimitiveTwoTuple]>;
const ComplexOneTuple = Tuple(PrimitiveTwoTuple);
type ComplexTwoTuple = Tuple<[PrimitiveTwoTuple, User]>;
const ComplexTwoTuple = Tuple(PrimitiveTwoTuple, User);
type ComplexThreeTuple = [PrimitiveTwoTuple, User, Reaction];
const ComplexThreeTuple = Tuple(PrimitiveTwoTuple, User, Reaction);

class HttpResponse extends Record {
    @candid(Vec(Header))
    headers: Vec<Header>;
}

export default class {
    @query([], PrimitiveOneTuple)
    primitiveOneTupleReturnType(): PrimitiveOneTuple {
        return ['Hello'];
    }

    @query([PrimitiveOneTuple], PrimitiveOneTuple)
    primitiveOneTupleParam(param: PrimitiveOneTuple): PrimitiveOneTuple {
        return param;
    }

    @query([], Tuple(text))
    primitiveOneTupleInlineReturnType(): Tuple<[text]> {
        return ['Greenland'];
    }

    @query([Tuple(text)], Tuple(text))
    primitiveOneTupleInlineParam(param: Tuple<[text]>): Tuple<[text]> {
        return param;
    }

    @query([], PrimitiveTwoTuple)
    primitiveTwoTupleReturnType(): PrimitiveTwoTuple {
        return ['Content-Type', 64n];
    }

    @query([PrimitiveTwoTuple], PrimitiveTwoTuple)
    primitiveTwoTupleParam(param: PrimitiveTwoTuple): PrimitiveTwoTuple {
        return param;
    }

    @query([], Tuple(text, text))
    primitiveTwoTupleInlineReturnType(): Tuple<[text, text]> {
        return ['Fun', 'Times'];
    }

    @query([Tuple(text, text)], Tuple(text, text))
    primitiveTwoTupleInlineParam(
        param: Tuple<[text, text]>
    ): Tuple<[text, text]> {
        return param;
    }

    @query([], PrimitiveThreeTuple)
    primitiveThreeTupleReturnType(): PrimitiveThreeTuple {
        return [
            'Good',
            454n,
            Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
        ];
    }

    @query([PrimitiveThreeTuple], PrimitiveThreeTuple)
    primitiveThreeTupleParam(param: PrimitiveThreeTuple): PrimitiveThreeTuple {
        return param;
    }

    @query([], Tuple(text, nat64, principal))
    primitiveThreeTupleInlineReturnType(): Tuple<[text, nat64, Principal]> {
        return ['Fun', 101n, Principal.fromText('aaaaa-aa')];
    }

    @query([Tuple(text, nat64, principal)], Tuple(text, nat64, principal))
    primitiveThreeTupleInlineParam(
        param: Tuple<[text, nat64, Principal]>
    ): Tuple<[text, nat64, Principal]> {
        return param;
    }

    @query([], ComplexOneTuple)
    complexOneTupleReturnType(): ComplexOneTuple {
        return [['Hello', 0n]];
    }

    @query([ComplexOneTuple], ComplexOneTuple)
    complexOneTupleParam(param: ComplexOneTuple): ComplexOneTuple {
        return param;
    }

    @query([], Tuple(PrimitiveTwoTuple))
    complexOneTupleInlineReturnType(): Tuple<[PrimitiveTwoTuple]> {
        return [['Candy', 56n]];
    }

    @query([Tuple(PrimitiveTwoTuple)], Tuple(PrimitiveTwoTuple))
    complexOneTupleInlineParam(
        param: Tuple<[PrimitiveTwoTuple]>
    ): Tuple<[PrimitiveTwoTuple]> {
        return param;
    }

    @query([], ComplexTwoTuple)
    complexTwoTupleReturnType(): ComplexTwoTuple {
        return [
            ['Content-Type', 64n],
            User.create({
                id: '0',
                primitiveTwoTuple: ['Content-Type', 64n]
            })
        ];
    }

    @query([ComplexTwoTuple], ComplexTwoTuple)
    complexTwoTupleParam(param: ComplexTwoTuple): ComplexTwoTuple {
        return param;
    }

    @query([], Tuple(PrimitiveTwoTuple, User))
    complexTwoTupleInlineReturnType(): Tuple<[PrimitiveTwoTuple, User]> {
        return [
            ['Content-Type', 644n],
            User.create({
                id: '444',
                primitiveTwoTuple: ['Content-Type', 6_422n]
            })
        ];
    }

    @query([Tuple(PrimitiveTwoTuple, User)], Tuple(PrimitiveTwoTuple, User))
    complexTwoTupleInlineParam(
        param: Tuple<[PrimitiveTwoTuple, User]>
    ): Tuple<[PrimitiveTwoTuple, User]> {
        return param;
    }

    @query([], ComplexThreeTuple)
    complexThreeTupleReturnType(): ComplexThreeTuple {
        return [
            ['Content-Type', 64n],
            User.create({
                id: '0',
                primitiveTwoTuple: ['Content-Type', 64n]
            }),
            Reaction.create({
                Bad: [
                    ['Content-Type', 64n],
                    User.create({
                        id: '1',
                        primitiveTwoTuple: ['Content-Type', 64n]
                    }),
                    Reaction.create({
                        Good: null
                    })
                ]
            })
        ];
    }

    @query([ComplexThreeTuple], ComplexThreeTuple)
    complexThreeTupleParam(param: ComplexThreeTuple): ComplexThreeTuple {
        return param;
    }

    @query([], Tuple(PrimitiveTwoTuple, User, Reaction))
    complexThreeTupleInlineReturnType(): Tuple<
        [PrimitiveTwoTuple, User, Reaction]
    > {
        return [
            ['Content-Type', 64n],
            User.create({
                id: '0',
                primitiveTwoTuple: ['Content-Type', 64n]
            }),
            Reaction.create({
                Bad: [
                    ['Content-Type', 64n],
                    User.create({
                        id: '1',
                        primitiveTwoTuple: ['Content-Type', 64n]
                    }),
                    Reaction.create({
                        Good: null
                    })
                ]
            })
        ];
    }

    @query(
        [Tuple(PrimitiveTwoTuple, User, Reaction)],
        Tuple(PrimitiveTwoTuple, User, Reaction)
    )
    complexThreeTupleInlineParam(
        param: Tuple<[PrimitiveTwoTuple, User, Reaction]>
    ): Tuple<[PrimitiveTwoTuple, User, Reaction]> {
        return param;
    }

    @query([Vec(Header)], Vec(Header))
    tupleArrayParamsAndReturnType(headers: Vec<Header>): Vec<Header> {
        return headers;
    }

    @query([], HttpResponse)
    tupleArrayRecordField(): HttpResponse {
        return {
            headers: [
                ['Content-Type', 'application/json'],
                ['Accept-Ranges', 'bytes']
            ]
        };
    }

    @query([], StreamingCallbackType)
    tupleArrayVariantField(): StreamingCallbackType {
        return {
            WithHeaders: [
                ['Content-Type', 'application/json'],
                ['Accept-Ranges', 'bytes']
            ]
        };
    }

    @query(
        [
            Tuple(
                IDL.Record({ hello: IDL.Nat64 }),
                IDL.Record({ goodbye: IDL.Nat64 })
            )
        ],
        Tuple(
            IDL.Record({ hello: IDL.Nat64 }),
            IDL.Record({ goodbye: IDL.Nat64 })
        )
    )
    twoTupleWithInlineRecords(
        param: Tuple<[{ [hello: string]: nat64 }, { [goodbye: string]: nat64 }]>
    ): Tuple<[{ [hello: string]: nat64 }, { [goodbye: string]: nat64 }]> {
        return param;
    }

    @query(
        [Tuple(Tuple(text, Tuple(nat8, nat8)), int)],
        Tuple(Tuple(text, Tuple(nat8, nat8)), int)
    )
    nestedTupleQuery(
        param: Tuple<[Tuple<[text, Tuple<[nat8, nat8]>]>, int]>
    ): Tuple<[Tuple<[text, Tuple<[nat8, nat8]>]>, int]> {
        return param;
    }
}
