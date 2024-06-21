import {
    blob,
    bool,
    empty,
    float32,
    float64,
    Func,
    int,
    int8,
    int16,
    int32,
    int64,
    nat,
    nat8,
    nat16,
    nat32,
    nat64,
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

export default class {
    @query([Vec(text)], Vec(text))
    listOfStringOne(param) {
        return param;
    }
    @query([Vec(Vec(text))], Vec(Vec(text)))
    listOfStringTwo(params) {
        return params;
    }
    @query([Vec(Vec(Vec(Vec(text))))], Vec(Vec(Vec(Vec(text)))))
    listOfStringFour(params) {
        return params;
    }
    @query([], Vec(Vec(Vec(Vec(Vec(Vec(Vec(int8))))))))
    listOfListOfInt8() {
        return [
            [
                [
                    [
                        [
                            [Int8Array.from([1]), Int8Array.from([2])],
                            [
                                Int8Array.from([1, 2, 3]),
                                Int8Array.from([4, 5, 6])
                            ]
                        ]
                    ],
                    [[[Int8Array.from([1])]], [[Int8Array.from([2])]]],
                    [[[Int8Array.from([3])]]]
                ]
            ],
            [
                [[[[Int8Array.from([1])]]], [[[Int8Array.from([2])]]]],
                [[[[Int8Array.from([3])]]], [[[Int8Array.from([4])]]]]
            ]
        ];
    }
    @query([Vec(Vec(Vec(Null)))], Vec(Vec(Vec(Null))))
    listOfNull(param) {
        return param;
    }
    @query([Vec(Vec(Vec(bool)))], Vec(Vec(Vec(bool))))
    listOfBool(param) {
        return param;
    }
    @query([Vec(Vec(Vec(text)))], Vec(Vec(Vec(text))))
    listOfString(param) {
        return param;
    }
    @query([Vec(Vec(Vec(Opt(text))))], Vec(Vec(Vec(Opt(text)))))
    listOfOptionString(param) {
        return param;
    }
    @query([], Vec(Vec(Vec(empty))))
    listOfEmpty() {
        throw new Error('Anything you want');
    }
    @query([], Vec(Vec(Vec(reserved))))
    listOfReserved() {
        return [
            [['A'], ['n']],
            [
                ['y', 't', 'h'],
                ['i', 'n', 'g']
            ]
        ];
    }
    @query([Vec(Vec(Vec(BasicFunc)))], Vec(Vec(Vec(BasicFunc))))
    listOfFunc(param) {
        return param;
    }
    @query([Vec(Vec(Vec(Principal)))], Vec(Vec(Vec(Principal))))
    listOfPrincipal(param) {
        return param;
    }
    @query([Vec(Vec(Vec(float64)))], Vec(Vec(Vec(float64))))
    listOfF64(param) {
        return param;
    }
    @query([Vec(Vec(Vec(float32)))], Vec(Vec(Vec(float32))))
    listOfF32(param) {
        return param;
    }
    @query([Vec(Vec(Vec(int)))], Vec(Vec(Vec(int))))
    listOfInt(param) {
        return param;
    }
    @query([Vec(Vec(Vec(int64)))], Vec(Vec(Vec(int64))))
    listOfInt64(param) {
        return param;
    }
    @query([Vec(Vec(Vec(int32)))], Vec(Vec(Vec(int32))))
    listOfInt32(param) {
        return param;
    }
    @query([Vec(Vec(Vec(int16)))], Vec(Vec(Vec(int16))))
    listOfInt16(param) {
        return param;
    }
    @query([Vec(Vec(Vec(int8)))], Vec(Vec(Vec(int8))))
    listOfInt8(param) {
        return param;
    }
    @query([Vec(Vec(Vec(nat)))], Vec(Vec(Vec(nat))))
    listOfNat(param) {
        return param;
    }
    @query([Vec(Vec(Vec(nat64)))], Vec(Vec(Vec(nat64))))
    listOfNat64(param) {
        return param;
    }
    @query([Vec(Vec(Vec(nat32)))], Vec(Vec(Vec(nat32))))
    listOfNat32(param) {
        return param;
    }
    @query([Vec(Vec(Vec(nat16)))], Vec(Vec(Vec(nat16))))
    listOfNat16(param) {
        return param;
    }
    @query([Vec(Vec(Vec(nat8)))], Vec(Vec(Vec(nat8))))
    listOfNat8(param) {
        return param;
    }
    @query([Vec(Vec(Vec(Person)))], Vec(Vec(Vec(Person))))
    listOfRecord(param) {
        return param;
    }
    @query([Vec(Vec(Vec(State)))], Vec(Vec(Vec(State))))
    listOfVariant(param) {
        return param;
    }
    @query([Vec(blob)], Vec(blob))
    listOfBlob(param) {
        return param;
    }
    @query([Vec(Vec(blob))], Vec(Vec(blob)))
    listOfListOfBlob(param) {
        return param;
    }
}
