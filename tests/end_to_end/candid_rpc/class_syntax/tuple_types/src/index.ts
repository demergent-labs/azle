import { IDL, query } from 'azle';

// TODO maybe we should write tests for canister and stable storage?
// TODO for now we at least know the canister compiles
// type CanisterTuple1 = Tuple<[IDL.Text, IDL.Nat64]>;
// type CanisterTuple2 = Tuple<[IDL.Text, CanisterTuple1]>;

// class TestCanister extends Service {
//     @serviceUpdate
//     test: (param: CanisterTuple1) => CallResult<CanisterTuple2>;
// }

const PrimitiveOneTuple = Tuple(IDL.Text);
const PrimitiveTwoTuple = Tuple(IDL.Text, IDL.Nat64);
const PrimitiveThreeTuple = Tuple(IDL.Text, IDL.Nat64, Principal);

const User = Record({
    id: IDL.Text,
    primitiveTwoTuple: PrimitiveTwoTuple
});

const Header = Tuple(IDL.Text, IDL.Text);

const StreamingCallbackType = Variant({
    WithHeaders: IDL.Vec(Header),
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
    headers: IDL.Vec(Header)
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

    @query([], Tuple(IDL.Text))
    primitiveOneTupleInlineReturnType() {
        return ['Greenland'];
    }

    @query([Tuple(IDL.Text)], Tuple(IDL.Text))
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

    @query([], Tuple(IDL.Text, IDL.Text))
    primitiveTwoTupleInlineReturnType() {
        return ['Fun', 'Times'];
    }
    @query([Tuple(IDL.Text, IDL.Text)], Tuple(IDL.Text, IDL.Text))
    primitiveTwoTupleInlineParam(param: [string, string]) {
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

    @query([], Tuple(IDL.Text, IDL.Nat64, Principal))
    primitiveThreeTupleInlineReturnType() {
        return ['Fun', 101n, Principal.fromText('aaaaa-aa')];
    }

    @query(
        [Tuple(IDL.Text, IDL.Nat64, Principal)],
        Tuple(IDL.Text, IDL.Nat64, Principal)
    )
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

    @query([IDL.Vec(Header)], IDL.Vec(Header))
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
        [Tuple(Tuple(IDL.Text, Tuple(IDL.Nat8, IDL.Nat8)), int)],
        Tuple(Tuple(IDL.Text, Tuple(IDL.Nat8, IDL.Nat8)), int)
    )
    nestedTupleQuery(param) {
        return param;
    }
}
