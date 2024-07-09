import { IDL, Principal, query } from 'azle';

const Person = IDL.Record({
    name: IDL.Text,
    age: IDL.Nat8
});
type Person = { name: string; age: number };

const State = IDL.Variant({
    solid: IDL.Null,
    liquid: IDL.Null,
    gas: IDL.Null
});
type State = { solid: null } | { liquid: null } | { gas: null };

const BasicFunc = IDL.Func([IDL.Text], [IDL.Text], ['query']);
type BasicFunc = [Principal, string];

export default class {
    @query([IDL.Vec(IDL.Text)], IDL.Vec(IDL.Text))
    listOfStringOne(param: string[]): string[] {
        return param;
    }

    @query([IDL.Vec(IDL.Vec(IDL.Text))], IDL.Vec(IDL.Vec(IDL.Text)))
    listOfStringTwo(params: string[][]): string[][] {
        return params;
    }

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Vec(IDL.Text))))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Vec(IDL.Text))))
    )
    listOfStringFour(params: string[][][][]): string[][][][] {
        return params;
    }

    @query(
        [],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Vec(IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int8)))))))
    )
    listOfListOfInt8(): Int8Array[][][][][][] {
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

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Null)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Null)))
    )
    listOfNull(param: null[][][]): null[][][] {
        return param;
    }

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Bool)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Bool)))
    )
    listOfBool(param: boolean[][][]): boolean[][][] {
        return param;
    }

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Text)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Text)))
    )
    listOfString(param: string[][][]): string[][][] {
        return param;
    }

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Opt(IDL.Text))))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Opt(IDL.Text))))
    )
    listOfOptionString(param: ([string] | [])[][][]): ([string] | [])[][][] {
        return param;
    }

    @query([], IDL.Vec(IDL.Vec(IDL.Vec(IDL.Empty))))
    listOfEmpty(): never[][][] {
        throw new Error('Anything you want');
    }

    @query([], IDL.Vec(IDL.Vec(IDL.Vec(IDL.Reserved))))
    listOfReserved(): any[][][] {
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
    listOfFunc(param: BasicFunc[][][]): BasicFunc[][][] {
        return param;
    }

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Principal)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Principal)))
    )
    listOfPrincipal(param: Principal[][][]): Principal[][][] {
        return param;
    }

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Float64)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Float64)))
    )
    listOfF64(param: number[][][]): number[][][] {
        return param;
    }

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Float32)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Float32)))
    )
    listOfF32(param: number[][][]): number[][][] {
        return param;
    }

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int)))
    )
    listOfInt(param: bigint[][][]): bigint[][][] {
        return param;
    }

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int64)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat64)))
    )
    listOfInt64(param: bigint[][][]): bigint[][][] {
        return param;
    }

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int32)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int32)))
    )
    listOfInt32(param: number[][][]): number[][][] {
        return param;
    }

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int16)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int16)))
    )
    listOfInt16(param: number[][][]): number[][][] {
        return param;
    }

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int8)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Int8)))
    )
    listOfInt8(param: number[][][]): number[][][] {
        return param;
    }

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat)))
    )
    listOfNat(param: bigint[][][]): bigint[][][] {
        return param;
    }

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat64)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat64)))
    )
    listOfNat64(param: bigint[][][]): bigint[][][] {
        return param;
    }

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat32)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat32)))
    )
    listOfNat32(param: number[][][]): number[][][] {
        return param;
    }

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat16)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat16)))
    )
    listOfNat16(param: number[][][]): number[][][] {
        return param;
    }

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat8)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat8)))
    )
    listOfNat8(param: number[][][]): number[][][] {
        return param;
    }

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(Person)))],
        IDL.Vec(IDL.Vec(IDL.Vec(Person)))
    )
    listOfRecord(param: Person[][][]): Person[][][] {
        return param;
    }

    @query([IDL.Vec(IDL.Vec(IDL.Vec(State)))], IDL.Vec(IDL.Vec(IDL.Vec(State))))
    listOfVariant(param: State[][][]): State[][][] {
        return param;
    }

    @query([IDL.Vec(IDL.Vec(IDL.Nat8))], IDL.Vec(IDL.Vec(IDL.Nat8)))
    listOfBlob(param: Uint8Array[]): Uint8Array[] {
        return param;
    }

    @query(
        [IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat8)))],
        IDL.Vec(IDL.Vec(IDL.Vec(IDL.Nat8)))
    )
    listOfListOfBlob(param: Uint8Array[][]): Uint8Array[][] {
        return param;
    }
}
