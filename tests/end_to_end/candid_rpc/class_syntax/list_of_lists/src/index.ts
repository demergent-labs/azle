import { IDL, query } from 'azle';

const Person = Record({
    name: IDL.Text,
    age: nat8
});

const State = Variant({
    solid: Null,
    liquid: Null,
    gas: Null
});

const BasicFunc = Func([IDL.Text], IDL.Text, 'query');

export default class {
    @query([IDL.Vec(IDL.Text)], IDL.Vec(IDL.Text))
    listOfStringOne(param) {
        return param;
    }
    @query([IDL.Vec(IDL.Vec(IDL.Text))], IDL.Vec(IDL.Vec(IDL.Text)))
    listOfStringTwo(params) {
        return params;
    }
    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Vec(IDL.Text))))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Vec(IDL.Text))))
    )
    listOfStringFour(params) {
        return params;
    }
    @query(
        [],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Vec(IDL.Vec(IDL.Vec(IDL.Vec(int8)))))))
    )
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
    @query([IDL.Vec(IDL.Vec(IDL.Vec(Null)))], IDL.Vec(IDL.Vec(IDL.Vec(Null))))
    listOfNull(param) {
        return param;
    }
    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Bool)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Bool)))
    )
    listOfBool(param) {
        return param;
    }
    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Text)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Text)))
    )
    listOfString(param) {
        return param;
    }
    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(Opt(IDL.Text))))],
        IDL.Vec(IDL.Vec(IDL.Vec(Opt(IDL.Text))))
    )
    listOfOptionString(param) {
        return param;
    }
    @query([], IDL.Vec(IDL.Vec(IDL.Vec(empty))))
    listOfEmpty() {
        throw new Error('Anything you want');
    }
    @query([], IDL.Vec(IDL.Vec(IDL.Vec(reserved))))
    listOfReserved() {
        return [
            [['A'], ['n']],
            [
                ['y', 't', 'h'],
                ['i', 'n', 'g']
            ]
        ];
    }
    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(BasicFunc)))],
        IDL.Vec(IDL.Vec(IDL.Vec(BasicFunc)))
    )
    listOfFunc(param) {
        return param;
    }
    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(Principal)))],
        IDL.Vec(IDL.Vec(IDL.Vec(Principal)))
    )
    listOfPrincipal(param) {
        return param;
    }
    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(float64)))],
        IDL.Vec(IDL.Vec(IDL.Vec(float64)))
    )
    listOfF64(param) {
        return param;
    }
    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(float32)))],
        IDL.Vec(IDL.Vec(IDL.Vec(float32)))
    )
    listOfF32(param) {
        return param;
    }
    @query([IDL.Vec(IDL.Vec(IDL.Vec(int)))], IDL.Vec(IDL.Vec(IDL.Vec(int))))
    listOfInt(param) {
        return param;
    }
    @query([IDL.Vec(IDL.Vec(IDL.Vec(int64)))], IDL.Vec(IDL.Vec(IDL.Vec(int64))))
    listOfInt64(param) {
        return param;
    }
    @query([IDL.Vec(IDL.Vec(IDL.Vec(int32)))], IDL.Vec(IDL.Vec(IDL.Vec(int32))))
    listOfInt32(param) {
        return param;
    }
    @query([IDL.Vec(IDL.Vec(IDL.Vec(int16)))], IDL.Vec(IDL.Vec(IDL.Vec(int16))))
    listOfInt16(param) {
        return param;
    }
    @query([IDL.Vec(IDL.Vec(IDL.Vec(int8)))], IDL.Vec(IDL.Vec(IDL.Vec(int8))))
    listOfInt8(param) {
        return param;
    }
    @query([IDL.Vec(IDL.Vec(IDL.Vec(nat)))], IDL.Vec(IDL.Vec(IDL.Vec(nat))))
    listOfNat(param) {
        return param;
    }
    @query([IDL.Vec(IDL.Vec(IDL.Vec(nat64)))], IDL.Vec(IDL.Vec(IDL.Vec(nat64))))
    listOfNat64(param) {
        return param;
    }
    @query([IDL.Vec(IDL.Vec(IDL.Vec(nat32)))], IDL.Vec(IDL.Vec(IDL.Vec(nat32))))
    listOfNat32(param) {
        return param;
    }
    @query([IDL.Vec(IDL.Vec(IDL.Vec(nat16)))], IDL.Vec(IDL.Vec(IDL.Vec(nat16))))
    listOfNat16(param) {
        return param;
    }
    @query([IDL.Vec(IDL.Vec(IDL.Vec(nat8)))], IDL.Vec(IDL.Vec(IDL.Vec(nat8))))
    listOfNat8(param) {
        return param;
    }
    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(Person)))],
        IDL.Vec(IDL.Vec(IDL.Vec(Person)))
    )
    listOfRecord(param) {
        return param;
    }
    @query([IDL.Vec(IDL.Vec(IDL.Vec(State)))], IDL.Vec(IDL.Vec(IDL.Vec(State))))
    listOfVariant(param) {
        return param;
    }
    @query([IDL.Vec(IDL.Vec(IDL.Nat8))], IDL.Vec(IDL.Vec(IDL.Nat8)))
    listOfBlob(param) {
        return param;
    }
    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat8)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat8)))
    )
    listOfListOfBlob(param) {
        return param;
    }
}
