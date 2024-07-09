import { IDL, Principal, query } from 'azle';

// TODO maybe we should write tests for canister and stable storage?
// TODO for now we at least know the canister compiles
// type CanisterTuple1 = IDL.Tuple<[IDL.Text, IDL.Nat64]>;
// type CanisterTuple2 = IDL.Tuple<[IDL.Text, CanisterTuple1]>;

// class TestCanister extends Service {
//     @serviceUpdate
//     test: (param: CanisterTuple1) => CallResult<CanisterTuple2>;
// }

const PrimitiveOneTuple = IDL.Tuple(IDL.Text);
type PrimitiveOneTuple = [string];
const PrimitiveTwoTuple = IDL.Tuple(IDL.Text, IDL.Nat64);
type PrimitiveTwoTuple = [string, bigint];
const PrimitiveThreeTuple = IDL.Tuple(IDL.Text, IDL.Nat64, IDL.Principal);
type PrimitiveThreeTuple = [string, bigint, Principal];

const User = IDL.Record({
    id: IDL.Text,
    primitiveTwoTuple: PrimitiveTwoTuple
});
type User = {
    id: string;
    primitiveTwoTuple: PrimitiveTwoTuple;
};

const Header = IDL.Tuple(IDL.Text, IDL.Text);
type Header = [string, string];

const StreamingCallbackType = IDL.Variant({
    WithHeaders: IDL.Vec(Header),
    WithoutHeaders: IDL.Null
});

const Reaction = IDL.Rec();
const ComplexThreeTuple = IDL.Rec();

Reaction.fill(
    IDL.Variant({
        Good: IDL.Null,
        Bad: ComplexThreeTuple
    })
);
type Reaction =
    | {
          Good: null;
      }
    | { Bad: ComplexThreeTuple };

const ComplexOneTuple = IDL.Tuple(PrimitiveTwoTuple);
type ComplexOneTuple = [PrimitiveTwoTuple];
const ComplexTwoTuple = IDL.Tuple(PrimitiveTwoTuple, User);
type ComplexTwoTuple = [PrimitiveTwoTuple, User];
ComplexThreeTuple.fill(IDL.Tuple(PrimitiveTwoTuple, User, Reaction));
type ComplexThreeTuple = [PrimitiveTwoTuple, User, Reaction];

const HttpResponse = IDL.Record({
    headers: IDL.Vec(Header)
});

export default class {
    @query([], PrimitiveOneTuple)
    primitiveOneTupleReturnType() {
        return ['Hello'];
    }

    @query([PrimitiveOneTuple], PrimitiveOneTuple)
    primitiveOneTupleParam(param: PrimitiveOneTuple) {
        return param;
    }

    @query([], IDL.Tuple(IDL.Text))
    primitiveOneTupleInlineReturnType() {
        return ['Greenland'];
    }

    @query([IDL.Tuple(IDL.Text)], IDL.Tuple(IDL.Text))
    primitiveOneTupleInlineParam(param: [string]) {
        return param;
    }

    @query([], PrimitiveTwoTuple)
    primitiveTwoTupleReturnType() {
        return ['Content-Type', 64n];
    }

    @query([PrimitiveTwoTuple], PrimitiveTwoTuple)
    primitiveTwoTupleParam(param: PrimitiveTwoTuple) {
        return param;
    }

    @query([], IDL.Tuple(IDL.Text, IDL.Text))
    primitiveTwoTupleInlineReturnType() {
        return ['Fun', 'Times'];
    }

    @query([IDL.Tuple(IDL.Text, IDL.Text)], IDL.Tuple(IDL.Text, IDL.Text))
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
    primitiveThreeTupleParam(param: PrimitiveThreeTuple) {
        return param;
    }

    @query([], IDL.Tuple(IDL.Text, IDL.Nat64, IDL.Principal))
    primitiveThreeTupleInlineReturnType() {
        return ['Fun', 101n, Principal.fromText('aaaaa-aa')];
    }

    @query(
        [IDL.Tuple(IDL.Text, IDL.Nat64, IDL.Principal)],
        IDL.Tuple(IDL.Text, IDL.Nat64, IDL.Principal)
    )
    primitiveThreeTupleInlineParam(param: [string, bigint, Principal]) {
        return param;
    }

    @query([], ComplexOneTuple)
    complexOneTupleReturnType() {
        return [['Hello', 0n]];
    }

    @query([ComplexOneTuple], ComplexOneTuple)
    complexOneTupleParam(param: ComplexOneTuple) {
        return param;
    }

    @query([], IDL.Tuple(PrimitiveTwoTuple))
    complexOneTupleInlineReturnType() {
        return [['Candy', 56n]];
    }

    @query([IDL.Tuple(PrimitiveTwoTuple)], IDL.Tuple(PrimitiveTwoTuple))
    complexOneTupleInlineParam(param: PrimitiveTwoTuple) {
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
    complexTwoTupleParam(param: ComplexTwoTuple) {
        return param;
    }

    @query([], IDL.Tuple(PrimitiveTwoTuple, User))
    complexTwoTupleInlineReturnType() {
        return [
            ['Content-Type', 644n],
            {
                id: '444',
                primitiveTwoTuple: ['Content-Type', 6_422n]
            }
        ];
    }

    @query(
        [IDL.Tuple(PrimitiveTwoTuple, User)],
        IDL.Tuple(PrimitiveTwoTuple, User)
    )
    complexTwoTupleInlineParam(param: [PrimitiveTwoTuple]) {
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
    complexThreeTupleParam(param: ComplexThreeTuple) {
        return param;
    }

    @query([], IDL.Tuple(PrimitiveTwoTuple, User, Reaction))
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
        [IDL.Tuple(PrimitiveTwoTuple, User, Reaction)],
        IDL.Tuple(PrimitiveTwoTuple, User, Reaction)
    )
    complexThreeTupleInlineParam(param: [PrimitiveTwoTuple, User, Reaction]) {
        return param;
    }

    @query([IDL.Vec(Header)], IDL.Vec(Header))
    tupleArrayParamsAndReturnType(headers: Header[]) {
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
        [
            IDL.Tuple(
                IDL.Tuple(IDL.Text, IDL.Tuple(IDL.Nat8, IDL.Nat8)),
                IDL.Int
            )
        ],
        IDL.Tuple(IDL.Tuple(IDL.Text, IDL.Tuple(IDL.Nat8, IDL.Nat8)), IDL.Int)
    )
    nestedTupleQuery(param: [[string, [number, number]], bigint]) {
        return param;
    }
}
