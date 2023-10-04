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
    Recursive,
    Canister
} from 'azle';

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

export default Canister({
    primitiveOneTupleReturnType: query([], PrimitiveOneTuple, () => {
        return ['Hello'];
    }),

    primitiveOneTupleParam: query(
        [PrimitiveOneTuple],
        PrimitiveOneTuple,
        (param) => {
            return param;
        }
    ),

    primitiveOneTupleInlineReturnType: query([], Tuple(text), () => {
        return ['Greenland'];
    }),

    primitiveOneTupleInlineParam: query([Tuple(text)], Tuple(text), (param) => {
        return param;
    }),

    primitiveTwoTupleReturnType: query([], PrimitiveTwoTuple, () => {
        return ['Content-Type', 64n];
    }),

    primitiveTwoTupleParam: query(
        [PrimitiveTwoTuple],
        PrimitiveTwoTuple,
        (param) => {
            return param;
        }
    ),

    primitiveTwoTupleInlineReturnType: query([], Tuple(text, text), () => {
        return ['Fun', 'Times'];
    }),

    primitiveTwoTupleInlineParam: query(
        [Tuple(text, text)],
        Tuple(text, text),
        (param: Tuple<[text, text]>) => {
            return param;
        }
    ),

    primitiveThreeTupleReturnType: query([], PrimitiveThreeTuple, () => {
        return [
            'Good',
            454n,
            Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
        ];
    }),

    primitiveThreeTupleParam: query(
        [PrimitiveThreeTuple],
        PrimitiveThreeTuple,
        (param) => {
            return param;
        }
    ),

    primitiveThreeTupleInlineReturnType: query(
        [],
        Tuple(text, nat64, Principal),
        () => {
            return ['Fun', 101n, Principal.fromText('aaaaa-aa')];
        }
    ),

    primitiveThreeTupleInlineParam: query(
        [Tuple(text, nat64, Principal)],
        Tuple(text, nat64, Principal),
        (param) => {
            return param;
        }
    ),

    complexOneTupleReturnType: query([], ComplexOneTuple, () => {
        return [['Hello', 0n]];
    }),

    complexOneTupleParam: query([ComplexOneTuple], ComplexOneTuple, (param) => {
        return param;
    }),

    complexOneTupleInlineReturnType: query([], Tuple(PrimitiveTwoTuple), () => {
        return [['Candy', 56n]];
    }),

    complexOneTupleInlineParam: query(
        [Tuple(PrimitiveTwoTuple)],
        Tuple(PrimitiveTwoTuple),
        (param) => {
            return param;
        }
    ),

    complexTwoTupleReturnType: query([], ComplexTwoTuple, () => {
        return [
            ['Content-Type', 64n],
            {
                id: '0',
                primitiveTwoTuple: ['Content-Type', 64n]
            }
        ];
    }),

    complexTwoTupleParam: query([ComplexTwoTuple], ComplexTwoTuple, (param) => {
        return param;
    }),

    complexTwoTupleInlineReturnType: query(
        [],
        Tuple(PrimitiveTwoTuple, User),
        () => {
            return [
                ['Content-Type', 644n],
                {
                    id: '444',
                    primitiveTwoTuple: ['Content-Type', 6_422n]
                }
            ];
        }
    ),

    complexTwoTupleInlineParam: query(
        [Tuple(PrimitiveTwoTuple, User)],
        Tuple(PrimitiveTwoTuple, User),
        (param) => {
            return param;
        }
    ),

    complexThreeTupleReturnType: query([], ComplexThreeTuple, () => {
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
    }),

    complexThreeTupleParam: query(
        [ComplexThreeTuple],
        ComplexThreeTuple,
        (param) => {
            return param;
        }
    ),

    complexThreeTupleInlineReturnType: query(
        [],
        Tuple(PrimitiveTwoTuple, User, Reaction),
        () => {
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
    ),

    complexThreeTupleInlineParam: query(
        [Tuple(PrimitiveTwoTuple, User, Reaction)],
        Tuple(PrimitiveTwoTuple, User, Reaction),
        (param) => {
            return param;
        }
    ),

    tupleArrayParamsAndReturnType: query(
        [Vec(Header)],
        Vec(Header),
        (headers) => {
            return headers;
        }
    ),

    tupleArrayRecordField: query([], HttpResponse, () => {
        return {
            headers: [
                ['Content-Type', 'application/json'],
                ['Accept-Ranges', 'bytes']
            ]
        };
    }),

    tupleArrayVariantField: query([], StreamingCallbackType, () => {
        return {
            WithHeaders: [
                ['Content-Type', 'application/json'],
                ['Accept-Ranges', 'bytes']
            ]
        };
    }),

    nestedTupleQuery: query(
        [Tuple(Tuple(text, Tuple(nat8, nat8)), int)],
        Tuple(Tuple(text, Tuple(nat8, nat8)), int),
        (param) => {
            return param;
        }
    )
});
