import {
    // CallResult,
    int,
    nat8,
    nat64,
    Null,
    Principal,
    query,
    Record,
    Recursive,
    // Service,
    // serviceUpdate,
    text,
    Tuple,
    Variant,
    Vec
} from 'azle/experimental';

// TODO maybe we should write tests for canister and stable storage?
// TODO for now we at least know the canister compiles
// type CanisterTuple1 = Tuple<[text, nat64]>;
// type CanisterTuple2 = Tuple<[text, CanisterTuple1]>;

// class TestCanister extends Service {
//     @serviceUpdate
//     test: (param: CanisterTuple1) => CallResult<CanisterTuple2>;
// }

const PrimitiveOneTuple = Tuple(text);
const PrimitiveTwoTuple = Tuple(text, nat64);
const PrimitiveThreeTuple = Tuple(text, nat64, Principal);

const User = Record({
    id: text,
    primitiveTwoTuple: PrimitiveTwoTuple
});

const Header = Tuple(text, text);

const StreamingCallbackType = Variant({
    WithHeaders: Vec(Header),
    WithoutHeaders: Null
});

const Reaction = Recursive(() =>
    Variant({
        Good: Null,
        Bad: ComplexThreeTuple
    })
);

const ComplexOneTuple = Tuple(PrimitiveTwoTuple);
const ComplexTwoTuple = Tuple(PrimitiveTwoTuple, User);
const ComplexThreeTuple = Tuple(PrimitiveTwoTuple, User, Reaction);

const HttpResponse = Record({
    headers: Vec(Header)
});

export default class {
    @query([], PrimitiveOneTuple)
    primitiveOneTupleReturnType() {
        return ['Hello'];
    }
    @query([PrimitiveOneTuple], PrimitiveOneTuple)
    primitiveOneTupleParam(param) {
        return param;
    }

    @query([], Tuple(text))
    primitiveOneTupleInlineReturnType() {
        return ['Greenland'];
    }

    @query([Tuple(text)], Tuple(text))
    primitiveOneTupleInlineParam(param) {
        return param;
    }

    @query([], PrimitiveTwoTuple)
    primitiveTwoTupleReturnType() {
        return ['Content-Type', 64n];
    }
    @query([PrimitiveTwoTuple], PrimitiveTwoTuple)
    primitiveTwoTupleParam(param) {
        return param;
    }

    @query([], Tuple(text, text))
    primitiveTwoTupleInlineReturnType() {
        return ['Fun', 'Times'];
    }
    @query([Tuple(text, text)], Tuple(text, text))
    primitiveTwoTupleInlineParam(param: Tuple<[text, text]>) {
        return param;
    }

    @query([], PrimitiveThreeTuple)
    primitiveThreeTupleReturnType() {
        return [
            'Good',
            454n,
            Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
        ];
    }
    @query([PrimitiveThreeTuple], PrimitiveThreeTuple)
    primitiveThreeTupleParam(param) {
        return param;
    }

    @query([], Tuple(text, nat64, Principal))
    primitiveThreeTupleInlineReturnType() {
        return ['Fun', 101n, Principal.fromText('aaaaa-aa')];
    }

    @query([Tuple(text, nat64, Principal)], Tuple(text, nat64, Principal))
    primitiveThreeTupleInlineParam(param) {
        return param;
    }

    @query([], ComplexOneTuple)
    complexOneTupleReturnType() {
        return [['Hello', 0n]];
    }

    @query([ComplexOneTuple], ComplexOneTuple)
    complexOneTupleParam(param) {
        return param;
    }

    @query([], Tuple(PrimitiveTwoTuple))
    complexOneTupleInlineReturnType() {
        return [['Candy', 56n]];
    }
    @query([Tuple(PrimitiveTwoTuple)], Tuple(PrimitiveTwoTuple))
    complexOneTupleInlineParam(param) {
        return param;
    }

    @query([], ComplexTwoTuple)
    complexTwoTupleReturnType() {
        return [
            ['Content-Type', 64n],
            {
                id: '0',
                primitiveTwoTuple: ['Content-Type', 64n]
            }
        ];
    }

    @query([ComplexTwoTuple], ComplexTwoTuple)
    complexTwoTupleParam(param) {
        return param;
    }
    @query([], Tuple(PrimitiveTwoTuple, User))
    complexTwoTupleInlineReturnType() {
        return [
            ['Content-Type', 644n],
            {
                id: '444',
                primitiveTwoTuple: ['Content-Type', 6_422n]
            }
        ];
    }

    @query([Tuple(PrimitiveTwoTuple, User)], Tuple(PrimitiveTwoTuple, User))
    complexTwoTupleInlineParam(param) {
        return param;
    }

    @query([], ComplexThreeTuple)
    complexThreeTupleReturnType() {
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
    @query([ComplexThreeTuple], ComplexThreeTuple)
    complexThreeTupleParam(param) {
        return param;
    }

    @query([], Tuple(PrimitiveTwoTuple, User, Reaction))
    complexThreeTupleInlineReturnType() {
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

    @query(
        [Tuple(PrimitiveTwoTuple, User, Reaction)],
        Tuple(PrimitiveTwoTuple, User, Reaction)
    )
    complexThreeTupleInlineParam(param) {
        return param;
    }

    @query([Vec(Header)], Vec(Header))
    tupleArrayParamsAndReturnType(headers) {
        return headers;
    }

    @query([], HttpResponse)
    tupleArrayRecordField() {
        return {
            headers: [
                ['Content-Type', 'application/json'],
                ['Accept-Ranges', 'bytes']
            ]
        };
    }

    @query([], StreamingCallbackType)
    tupleArrayVariantField() {
        return {
            WithHeaders: [
                ['Content-Type', 'application/json'],
                ['Accept-Ranges', 'bytes']
            ]
        };
    }
    @query(
        [Tuple(Tuple(text, Tuple(nat8, nat8)), int)],
        Tuple(Tuple(text, Tuple(nat8, nat8)), int)
    )
    nestedTupleQuery(param) {
        return param;
    }
}
