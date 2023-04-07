import {
    blob,
    empty,
    float32,
    float64,
    Func,
    Query,
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
    Opt,
    Principal,
    $query,
    Record,
    reserved,
    Variant,
    Vec
} from 'azle';

type Person = Record<{
    name: string;
    age: nat8;
}>;

type State = Variant<{
    solid: null;
    liquid: null;
    gas: null;
}>;

type BasicFunc = Func<Query<(param1: string) => string>>;

$query;
export function listOfStringOne(param: Vec<string>): Vec<string> {
    return param;
}

$query;
export function listOfStringTwo(params: Vec<Vec<string>>): Vec<Vec<string>> {
    return params;
}

$query;
export function listOfStringFour(
    params: Vec<Vec<Vec<Vec<string>>>>
): Vec<Vec<Vec<Vec<string>>>> {
    return params;
}

$query;
export function listOfListOfInt8(): Vec<Vec<Vec<Vec<Vec<Vec<Vec<int8>>>>>>> {
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

$query;
export function listOfNull(param: Vec<Vec<Vec<null>>>): Vec<Vec<Vec<null>>> {
    return param;
}

$query;
export function listOfBool(
    param: Vec<Vec<Vec<boolean>>>
): Vec<Vec<Vec<boolean>>> {
    return param;
}

$query;
export function listOfString(
    param: Vec<Vec<Vec<string>>>
): Vec<Vec<Vec<string>>> {
    return param;
}

$query;
export function listOfOptionString(
    param: Vec<Vec<Vec<Opt<string>>>>
): Vec<Vec<Vec<Opt<string>>>> {
    return param;
}

$query;
export function listOfEmpty(): Vec<Vec<Vec<empty>>> {
    throw new Error('Anything you want');
}

$query;
export function listOfReserved(): Vec<Vec<Vec<reserved>>> {
    return [
        [['A'], ['n']],
        [
            ['y', 't', 'h'],
            ['i', 'n', 'g']
        ]
    ];
}

$query;
export function listOfFunc(
    param: Vec<Vec<Vec<BasicFunc>>>
): Vec<Vec<Vec<BasicFunc>>> {
    return param;
}

$query;
export function listOfPrincipal(
    param: Vec<Vec<Vec<Principal>>>
): Vec<Vec<Vec<Principal>>> {
    return param;
}

$query;
export function listOfF64(
    param: Vec<Vec<Vec<float64>>>
): Vec<Vec<Vec<float64>>> {
    return param;
}

$query;
export function listOfF32(
    param: Vec<Vec<Vec<float32>>>
): Vec<Vec<Vec<float32>>> {
    return param;
}

$query;
export function listOfInt(param: Vec<Vec<Vec<int>>>): Vec<Vec<Vec<int>>> {
    return param;
}

$query;
export function listOfInt64(param: Vec<Vec<Vec<int64>>>): Vec<Vec<Vec<int64>>> {
    return param;
}

$query;
export function listOfInt32(param: Vec<Vec<Vec<int32>>>): Vec<Vec<Vec<int32>>> {
    return param;
}

$query;
export function listOfInt16(param: Vec<Vec<Vec<int16>>>): Vec<Vec<Vec<int16>>> {
    return param;
}

$query;
export function listOfInt8(param: Vec<Vec<Vec<int8>>>): Vec<Vec<Vec<int8>>> {
    return param;
}

$query;
export function listOfNat(param: Vec<Vec<Vec<nat>>>): Vec<Vec<Vec<nat>>> {
    return param;
}

$query;
export function listOfNat64(param: Vec<Vec<Vec<nat64>>>): Vec<Vec<Vec<nat64>>> {
    return param;
}

$query;
export function listOfNat32(param: Vec<Vec<Vec<nat32>>>): Vec<Vec<Vec<nat32>>> {
    return param;
}

$query;
export function listOfNat16(param: Vec<Vec<Vec<nat16>>>): Vec<Vec<Vec<nat16>>> {
    return param;
}

$query;
export function listOfNat8(param: Vec<Vec<Vec<nat8>>>): Vec<Vec<Vec<nat8>>> {
    return param;
}

$query;
export function listOfRecord(
    param: Vec<Vec<Vec<Person>>>
): Vec<Vec<Vec<Person>>> {
    return param;
}

$query;
export function listOfVariant(
    param: Vec<Vec<Vec<State>>>
): Vec<Vec<Vec<State>>> {
    return param;
}

$query;
export function listOfBlob(param: Vec<blob>): Vec<blob> {
    return param;
}

$query;
export function listOfListOfBlob(param: Vec<Vec<blob>>): Vec<Vec<blob>> {
    return param;
}
