import {
    blob,
    bool,
    Canister,
    empty,
    float32,
    float64,
    Func,
    int,
    int16,
    int32,
    int64,
    int8,
    nat,
    nat16,
    nat32,
    nat64,
    nat8,
    Null,
    Opt,
    Principal,
    query,
    Record,
    reserved,
    text,
    Variant,
    Vec
} from 'azle';

const Person = Record({
    name: text,
    age: nat8
});

const State = Variant({
    solid: Null,
    liquid: Null,
    gas: Null
});

const BasicFunc = Func([text], text, 'query');

export default Canister({
    listOfStringOne: query([Vec(text)], Vec(text), (param) => {
        return param;
    }),
    listOfStringTwo: query([Vec(Vec(text))], Vec(Vec(text)), (params) => {
        return params;
    }),
    listOfStringFour: query(
        [Vec(Vec(Vec(Vec(text))))],
        Vec(Vec(Vec(Vec(text)))),
        (params) => {
            return params;
        }
    ),
    listOfListOfInt8: query([], Vec(Vec(Vec(Vec(Vec(Vec(Vec(int8))))))), () => {
        return [
            [
                [
                    [
                        [
                            [[1], [2]],
                            [
                                [1, 2, 3],
                                [4, 5, 6]
                            ]
                        ]
                    ],
                    [[[[1]]], [[[2]]]],
                    [[[[3]]]]
                ]
            ],
            [
                [[[[[1]]]], [[[[2]]]]],
                [[[[[3]]]], [[[[4]]]]]
            ]
        ];
    }),
    listOfNull: query([Vec(Vec(Vec(Null)))], Vec(Vec(Vec(Null))), (param) => {
        return param;
    }),
    listOfBool: query([Vec(Vec(Vec(bool)))], Vec(Vec(Vec(bool))), (param) => {
        return param;
    }),
    listOfString: query([Vec(Vec(Vec(text)))], Vec(Vec(Vec(text))), (param) => {
        return param;
    }),
    listOfOptionString: query(
        [Vec(Vec(Vec(Opt(text))))],
        Vec(Vec(Vec(Opt(text)))),
        (param) => {
            return param;
        }
    ),
    listOfEmpty: query([], Vec(Vec(Vec(empty))), () => {
        throw new Error('Anything you want');
    }),
    listOfReserved: query([], Vec(Vec(Vec(reserved))), () => {
        return [
            [['A'], ['n']],
            [
                ['y', 't', 'h'],
                ['i', 'n', 'g']
            ]
        ];
    }),
    listOfFunc: query(
        [Vec(Vec(Vec(BasicFunc)))],
        Vec(Vec(Vec(BasicFunc))),
        (param) => {
            return param;
        }
    ),
    listOfPrincipal: query(
        [Vec(Vec(Vec(Principal)))],
        Vec(Vec(Vec(Principal))),
        (param) => {
            return param;
        }
    ),
    listOfF64: query(
        [Vec(Vec(Vec(float64)))],
        Vec(Vec(Vec(float64))),
        (param) => {
            return param;
        }
    ),
    listOfF32: query(
        [Vec(Vec(Vec(float32)))],
        Vec(Vec(Vec(float32))),
        (param) => {
            return param;
        }
    ),
    listOfInt: query([Vec(Vec(Vec(int)))], Vec(Vec(Vec(int))), (param) => {
        return param;
    }),
    listOfInt64: query(
        [Vec(Vec(Vec(int64)))],
        Vec(Vec(Vec(int64))),
        (param) => {
            return param;
        }
    ),
    listOfInt32: query(
        [Vec(Vec(Vec(int32)))],
        Vec(Vec(Vec(int32))),
        (param) => {
            return param;
        }
    ),
    listOfInt16: query(
        [Vec(Vec(Vec(int16)))],
        Vec(Vec(Vec(int16))),
        (param) => {
            return param;
        }
    ),
    listOfInt8: query([Vec(Vec(Vec(int8)))], Vec(Vec(Vec(int8))), (param) => {
        return param;
    }),
    listOfNat: query([Vec(Vec(Vec(nat)))], Vec(Vec(Vec(nat))), (param) => {
        return param;
    }),
    listOfNat64: query(
        [Vec(Vec(Vec(nat64)))],
        Vec(Vec(Vec(nat64))),
        (param) => {
            return param;
        }
    ),
    listOfNat32: query(
        [Vec(Vec(Vec(nat32)))],
        Vec(Vec(Vec(nat32))),
        (param) => {
            return param;
        }
    ),
    listOfNat16: query(
        [Vec(Vec(Vec(nat16)))],
        Vec(Vec(Vec(nat16))),
        (param) => {
            return param;
        }
    ),
    listOfNat8: query([Vec(Vec(Vec(nat8)))], Vec(Vec(Vec(nat8))), (param) => {
        return param;
    }),
    listOfRecord: query(
        [Vec(Vec(Vec(Person)))],
        Vec(Vec(Vec(Person))),
        (param) => {
            return param;
        }
    ),
    listOfVariant: query(
        [Vec(Vec(Vec(State)))],
        Vec(Vec(Vec(State))),
        (param) => {
            return param;
        }
    ),
    listOfBlob: query([Vec(blob)], Vec(blob), (param) => {
        return param;
    }),
    listOfListOfBlob: query([Vec(Vec(blob))], Vec(Vec(blob)), (param) => {
        return param;
    })
});
