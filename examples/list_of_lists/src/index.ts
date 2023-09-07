import {
    blob,
    bool,
    candid,
    empty,
    float32,
    float64,
    func,
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
    principal,
    Principal,
    query,
    Record,
    reserved,
    Service,
    text,
    Variant,
    Vec
} from 'azle';

class Person extends Record {
    @candid(text)
    name: text;

    @candid(nat8)
    age: nat8;
}

class State extends Variant {
    @candid(Null)
    solid: Null;

    @candid(Null)
    liquid: Null;

    @candid(Null)
    gas: Null;
}

@func([text], text, 'query')
class BasicFunc {}

export default class extends Service {
    @query([Vec(text)], Vec(text))
    listOfStringOne(param: Vec<text>): Vec<text> {
        return param;
    }

    @query([Vec(Vec(text))], Vec(Vec(text)))
    listOfStringTwo(params: Vec<Vec<text>>): Vec<Vec<text>> {
        return params;
    }

    @query([Vec(Vec(Vec(Vec(text))))], Vec(Vec(Vec(Vec(text)))))
    listOfStringFour(
        params: Vec<Vec<Vec<Vec<text>>>>
    ): Vec<Vec<Vec<Vec<text>>>> {
        return params;
    }

    @query([], Vec(Vec(Vec(Vec(Vec(Vec(Vec(int8))))))))
    listOfListOfInt8(): Vec<Vec<Vec<Vec<Vec<Vec<Vec<int8>>>>>>> {
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
    }

    @query([Vec(Vec(Vec(Null)))], Vec(Vec(Vec(Null))))
    listOfNull(param: Vec<Vec<Vec<null>>>): Vec<Vec<Vec<null>>> {
        return param;
    }

    @query([Vec(Vec(Vec(bool)))], Vec(Vec(Vec(bool))))
    listOfBool(param: Vec<Vec<Vec<bool>>>): Vec<Vec<Vec<bool>>> {
        return param;
    }

    @query([Vec(Vec(Vec(text)))], Vec(Vec(Vec(text))))
    listOfString(param: Vec<Vec<Vec<text>>>): Vec<Vec<Vec<text>>> {
        return param;
    }

    @query([Vec(Vec(Vec(Opt(text))))], Vec(Vec(Vec(Opt(text)))))
    listOfOptionString(
        param: Vec<Vec<Vec<Opt<text>>>>
    ): Vec<Vec<Vec<Opt<text>>>> {
        return param;
    }

    @query([], Vec(Vec(Vec(empty))))
    listOfEmpty(): Vec<Vec<Vec<empty>>> {
        throw new Error('Anything you want');
    }

    @query([], Vec(Vec(Vec(reserved))))
    listOfReserved(): Vec<Vec<Vec<reserved>>> {
        return [
            [['A'], ['n']],
            [
                ['y', 't', 'h'],
                ['i', 'n', 'g']
            ]
        ];
    }

    @query([Vec(Vec(Vec(BasicFunc)))], Vec(Vec(Vec(BasicFunc))))
    listOfFunc(param: Vec<Vec<Vec<BasicFunc>>>): Vec<Vec<Vec<BasicFunc>>> {
        return param;
    }

    @query([Vec(Vec(Vec(principal)))], Vec(Vec(Vec(principal))))
    listOfPrincipal(param: Vec<Vec<Vec<Principal>>>): Vec<Vec<Vec<Principal>>> {
        return param;
    }

    @query([Vec(Vec(Vec(float64)))], Vec(Vec(Vec(float64))))
    listOfF64(param: Vec<Vec<Vec<float64>>>): Vec<Vec<Vec<float64>>> {
        return param;
    }

    @query([Vec(Vec(Vec(float32)))], Vec(Vec(Vec(float32))))
    listOfF32(param: Vec<Vec<Vec<float32>>>): Vec<Vec<Vec<float32>>> {
        return param;
    }

    @query([Vec(Vec(Vec(int)))], Vec(Vec(Vec(int))))
    listOfInt(param: Vec<Vec<Vec<int>>>): Vec<Vec<Vec<int>>> {
        return param;
    }

    @query([Vec(Vec(Vec(int64)))], Vec(Vec(Vec(int64))))
    listOfInt64(param: Vec<Vec<Vec<int64>>>): Vec<Vec<Vec<int64>>> {
        return param;
    }

    @query([Vec(Vec(Vec(int32)))], Vec(Vec(Vec(int32))))
    listOfInt32(param: Vec<Vec<Vec<int32>>>): Vec<Vec<Vec<int32>>> {
        return param;
    }

    @query([Vec(Vec(Vec(int16)))], Vec(Vec(Vec(int16))))
    listOfInt16(param: Vec<Vec<Vec<int16>>>): Vec<Vec<Vec<int16>>> {
        return param;
    }

    @query([Vec(Vec(Vec(int8)))], Vec(Vec(Vec(int8))))
    listOfInt8(param: Vec<Vec<Vec<int8>>>): Vec<Vec<Vec<int8>>> {
        return param;
    }

    @query([Vec(Vec(Vec(nat)))], Vec(Vec(Vec(nat))))
    listOfNat(param: Vec<Vec<Vec<nat>>>): Vec<Vec<Vec<nat>>> {
        return param;
    }

    @query([Vec(Vec(Vec(nat64)))], Vec(Vec(Vec(nat64))))
    listOfNat64(param: Vec<Vec<Vec<nat64>>>): Vec<Vec<Vec<nat64>>> {
        return param;
    }

    @query([Vec(Vec(Vec(nat32)))], Vec(Vec(Vec(nat32))))
    listOfNat32(param: Vec<Vec<Vec<nat32>>>): Vec<Vec<Vec<nat32>>> {
        return param;
    }

    @query([Vec(Vec(Vec(nat16)))], Vec(Vec(Vec(nat16))))
    listOfNat16(param: Vec<Vec<Vec<nat16>>>): Vec<Vec<Vec<nat16>>> {
        return param;
    }

    @query([Vec(Vec(Vec(nat8)))], Vec(Vec(Vec(nat8))))
    listOfNat8(param: Vec<Vec<Vec<nat8>>>): Vec<Vec<Vec<nat8>>> {
        return param;
    }

    @query([Vec(Vec(Vec(Person)))], Vec(Vec(Vec(Person))))
    listOfRecord(param: Vec<Vec<Vec<Person>>>): Vec<Vec<Vec<Person>>> {
        return param;
    }

    @query([Vec(Vec(Vec(State)))], Vec(Vec(Vec(State))))
    listOfVariant(param: Vec<Vec<Vec<State>>>): Vec<Vec<Vec<State>>> {
        return param;
    }

    @query([Vec(blob)], Vec(blob))
    listOfBlob(param: Vec<blob>): Vec<blob> {
        return param;
    }

    @query([Vec(Vec(blob))], Vec(Vec(blob)))
    listOfListOfBlob(param: Vec<Vec<blob>>): Vec<Vec<blob>> {
        return param;
    }
}
