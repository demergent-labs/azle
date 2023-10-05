import { Test, getCanisterId } from 'azle/test';
import {
    _SERVICE,
    rec_0,
    rec_10,
    rec_12,
    rec_14,
    rec_2,
    rec_24,
    rec_26,
    rec_4,
    rec_6,
    rec_8
} from './dfx_generated/recursion/recursion.did';
import { _SERVICE as _REC_SERVICE } from './dfx_generated/recursive_canister/recursive_canister.did';
import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { execSync } from 'child_process';

// TODO these tests should be rewritten to use @dfinity/agent once this issue is resolved: https://github.com/dfinity/agent-js/issues/702
// TODO this issue also needs to be resolved: https://forum.dfinity.org/t/services-wont-deserialize-properly-if-functions-arent-in-alphabetical-order/20885
export function getRecursiveCanisterTests(
    recursive_canister: ActorSubclass<_REC_SERVICE>
): Test[] {
    return [
        {
            name: 'test recursive canister init method',
            test: async () => {
                const result = await recursive_canister.getMessage();

                return {
                    Ok: result === 'hello'
                };
            }
        }
    ];
}
export function getTests(recursion_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'recursive Variants',
            test: async () => {
                const result = await recursion_canister.testRecVariant({
                    recVariant: { recVariant: { recVariant: { num: 3 } } }
                });

                return {
                    Ok:
                        'recVariant' in result &&
                        'recVariant' in result.recVariant &&
                        'recVariant' in result.recVariant.recVariant &&
                        'num' in result.recVariant.recVariant.recVariant &&
                        result.recVariant.recVariant.recVariant.num === 3
                };
            }
        },
        {
            name: 'recursive Variants return type',
            test: async () => {
                const result = await recursion_canister.testRecVariantReturn();

                return {
                    Ok:
                        'recVariant' in result &&
                        'recVariant' in result.recVariant &&
                        'recVariant' in result.recVariant.recVariant &&
                        'num' in result.recVariant.recVariant.recVariant &&
                        result.recVariant.recVariant.recVariant.num === 12
                };
            }
        },
        {
            name: 'recursive records with variants return type',
            test: async () => {
                const result =
                    await recursion_canister.testRecRecordWithVariantReturn();

                return {
                    Ok:
                        'varRec' in result.myVar &&
                        'varRec' in result.myVar.varRec.myVar &&
                        'varRec' in result.myVar.varRec.myVar &&
                        'num' in result.myVar.varRec.myVar.varRec.myVar &&
                        result.myVar.varRec.myVar.varRec.myVar.num === 7
                };
            }
        },
        {
            name: 'recursive records with variants',
            test: async () => {
                const result =
                    await recursion_canister.testRecRecordWithVariant({
                        myVar: {
                            varRec: {
                                myVar: { varRec: { myVar: { num: 40 } } }
                            }
                        }
                    });

                return {
                    Ok:
                        'varRec' in result.myVar &&
                        'varRec' in result.myVar.varRec.myVar &&
                        'varRec' in result.myVar.varRec.myVar &&
                        'num' in result.myVar.varRec.myVar.varRec.myVar &&
                        result.myVar.varRec.myVar.varRec.myVar.num === 40
                };
            }
        },
        {
            name: 'recursive tuples with variants return type',
            test: async () => {
                const result =
                    await recursion_canister.testRecTupleWithVariantReturn();

                return {
                    Ok:
                        'varTuple' in result[0] &&
                        'varTuple' in result[0].varTuple[0] &&
                        'num' in result[0].varTuple[0].varTuple[0] &&
                        'num' in result[0].varTuple[0].varTuple[1] &&
                        'varTuple' in result[0].varTuple[1] &&
                        'num' in result[0].varTuple[1].varTuple[0] &&
                        'num' in result[0].varTuple[1].varTuple[1] &&
                        'varTuple' in result[1] &&
                        'num' in result[1].varTuple[0] &&
                        'varTuple' in result[1].varTuple[1] &&
                        'num' in result[1].varTuple[1].varTuple[0] &&
                        'num' in result[1].varTuple[1].varTuple[1] &&
                        result[0].varTuple[0].varTuple[0].num === 70 &&
                        result[0].varTuple[0].varTuple[1].num === 7 &&
                        result[0].varTuple[1].varTuple[0].num === 3 &&
                        result[0].varTuple[1].varTuple[1].num === 12 &&
                        result[1].varTuple[0].num === 40 &&
                        result[1].varTuple[1].varTuple[0].num === 5 &&
                        result[1].varTuple[1].varTuple[1].num === 10
                };
            }
        },
        {
            name: 'recursive records with opts',
            test: async () => {
                const result = await recursion_canister.testRecRecordWithOpt({
                    myOpt: [{ myOpt: [] }]
                });

                return {
                    Ok: result.myOpt[0]?.myOpt.length === 0
                };
            }
        },
        {
            name: 'recursive funcs',
            test: async () => {
                const result = await recursion_canister.testRecFunc([
                    Principal.fromText('aaaaa-aa'),
                    'delete_canister'
                ]);

                return {
                    Ok:
                        result[0].toString() === 'aaaaa-aa' &&
                        result[1] === 'delete_canister'
                };
            }
        },
        {
            name: 'recursive funcs return',
            test: async () => {
                const result = await recursion_canister.testRecFuncReturn();

                return {
                    Ok:
                        result[0].toString() === 'aaaaa-aa' &&
                        result[1] === 'create_canister'
                };
            }
        },
        {
            name: 'recursive records with vec',
            test: async () => {
                const input = {
                    myVecRecords: [
                        { myVecRecords: [{ myVecRecords: [] }] },
                        {
                            myVecRecords: [
                                { myVecRecords: [] },
                                { myVecRecords: [{ myVecRecords: [] }] }
                            ]
                        },
                        { myVecRecords: [] },
                        { myVecRecords: [] },
                        { myVecRecords: [] },
                        { myVecRecords: [] },
                        { myVecRecords: [] },
                        { myVecRecords: [] }
                    ]
                };
                const result =
                    await recursion_canister.testRecRecordWithVec(input);

                return {
                    Ok: deepCompare(result, input)
                };
            }
        },
        {
            name: 'recursive tuples with vec',
            test: async () => {
                const input: rec_26 = [[[[], [[[], []]]]], []];
                const result =
                    await recursion_canister.testRecTupleWithVec(input);

                return {
                    Ok: deepCompare(result, input)
                };
            }
        },
        {
            name: 'recursive tuples with vec return',
            test: async () => {
                const input = [
                    [[[], [[[], []]]]],
                    [
                        [[], []],
                        [[], []],
                        [[], []],
                        [[], []]
                    ]
                ];
                const result =
                    await recursion_canister.testRecTupleWithVecReturn();

                return {
                    Ok: deepCompare(result, input)
                };
            }
        },
        {
            name: 'recursive tuples with opt',
            test: async () => {
                const input: rec_24 = [[[[], [[[], []]]]], []];
                const result =
                    await recursion_canister.testRecTupleWithOpt(input);

                return {
                    Ok: deepCompare(result, input)
                };
            }
        },
        {
            name: 'recursive tuples with opt return',
            test: async () => {
                const input = [[], [[[], []]]];
                const result =
                    await recursion_canister.testRecTupleWithOptReturn();

                return {
                    Ok: deepCompare(result, input)
                };
            }
        },
        {
            name: 'recursive records with vec return',
            test: async () => {
                const input = {
                    myVecRecords: [
                        { myVecRecords: [{ myVecRecords: [] }] },
                        {
                            myVecRecords: [
                                { myVecRecords: [] },
                                { myVecRecords: [{ myVecRecords: [] }] }
                            ]
                        },
                        { myVecRecords: [] }
                    ]
                };
                const result =
                    await recursion_canister.testRecRecordWithVecReturn();

                return {
                    Ok: deepCompare(result, input)
                };
            }
        },
        {
            name: 'recursive records with opts return type',
            test: async () => {
                const result =
                    await recursion_canister.testRecRecordWithOptReturn();

                return {
                    Ok: result.myOpt[0]?.myOpt[0]?.myOpt.length === 0
                };
            }
        },
        {
            name: 'recursive tuples with variants',
            test: async () => {
                const result = await recursion_canister.testRecTupleWithVariant(
                    [
                        {
                            varTuple: [
                                { varTuple: [{ num: 70 }, { num: 7 }] },
                                { varTuple: [{ num: 3 }, { num: 12 }] }
                            ]
                        },
                        {
                            varTuple: [
                                { num: 40 },
                                { varTuple: [{ num: 5 }, { num: 10 }] }
                            ]
                        }
                    ]
                );

                return {
                    Ok:
                        'varTuple' in result[0] &&
                        'varTuple' in result[0].varTuple[0] &&
                        'num' in result[0].varTuple[0].varTuple[0] &&
                        'num' in result[0].varTuple[0].varTuple[1] &&
                        'varTuple' in result[0].varTuple[1] &&
                        'num' in result[0].varTuple[1].varTuple[0] &&
                        'num' in result[0].varTuple[1].varTuple[1] &&
                        'varTuple' in result[1] &&
                        'num' in result[1].varTuple[0] &&
                        'varTuple' in result[1].varTuple[1] &&
                        'num' in result[1].varTuple[1].varTuple[0] &&
                        'num' in result[1].varTuple[1].varTuple[1] &&
                        result[0].varTuple[0].varTuple[0].num === 70 &&
                        result[0].varTuple[0].varTuple[1].num === 7 &&
                        result[0].varTuple[1].varTuple[0].num === 3 &&
                        result[0].varTuple[1].varTuple[1].num === 12 &&
                        result[1].varTuple[0].num === 40 &&
                        result[1].varTuple[1].varTuple[0].num === 5 &&
                        result[1].varTuple[1].varTuple[1].num === 10
                };
            }
        },
        {
            name: 'test rec service simple',
            test: async () => {
                const principalId = getCanisterId('recursive_canister');
                const result = execSync(
                    `dfx canister call recursion testRecServiceSimple '(service "${principalId}")'`
                )
                    .toString()
                    .trim();

                return {
                    Ok: result === `(service "${principalId}")`
                };
            }
        },
        {
            name: 'test rec service',
            test: async () => {
                const principalId = getCanisterId('recursive_canister');
                const result = execSync(
                    `dfx canister call recursion testRecService '(service "${principalId}")'`
                )
                    .toString()
                    .trim();

                return {
                    Ok: result === `(service "${principalId}")`
                };
            }
        },
        {
            name: 'test rec service return',
            test: async () => {
                const principalId = getCanisterId('recursive_canister');
                const result = execSync(
                    `dfx canister call recursion testRecServiceReturn`
                )
                    .toString()
                    .trim();

                return {
                    Ok: result === `(service "${principalId}")`
                };
            }
        },
        {
            name: 'test rec service call',
            skip: true, // TODO waiting for azle.encode and azle.decode to be implemented
            test: async () => {
                const principalId = getCanisterId('recursive_canister');
                const result = execSync(
                    `dfx canister call recursion testRecServiceCall '(service "${principalId}")'`
                )
                    .toString()
                    .trim();

                return {
                    Ok: result === `(service "${principalId}")`
                };
            }
        },
        {
            name: 'recursive vec with variant',
            test: async () => {
                const input: rec_0 = [
                    { Leaf: 1 },
                    { Branch: [{ Leaf: 2 }] },
                    { Leaf: 3 },
                    {
                        Branch: [
                            {
                                Branch: [
                                    { Branch: [{ Leaf: 4 }, { Leaf: 5 }] },
                                    { Leaf: 6 }
                                ]
                            }
                        ]
                    }
                ];
                const result =
                    await recursion_canister.testRecVecWithVariant(input);

                return {
                    Ok: deepCompare(result, input)
                };
            }
        },
        {
            name: 'recursive vec with tuple',
            test: async () => {
                const input: rec_4 = [
                    [[], []],
                    [[[[], []]], []],
                    [[], [[[], []]]],
                    [[[[], []]], [[[], []]]]
                ];
                const result =
                    await recursion_canister.testRecVecWithTuple(input);

                return {
                    Ok: deepCompare(result, input)
                };
            }
        },
        {
            name: 'recursive vec with opt',
            test: async () => {
                const input: rec_2 = [[[[], [[[], []]]]], []];
                const result =
                    await recursion_canister.testRecVecWithOpt(input);

                return {
                    Ok: deepCompare(result, input)
                };
            }
        },
        {
            name: 'recursive vec with vec',
            test: async () => {
                const input: rec_6 = [[[[], [[[], []]]]], []];
                const result =
                    await recursion_canister.testRecVecWithVec(input);

                return {
                    Ok: deepCompare(result, input)
                };
            }
        },
        {
            name: 'recursive opt with vec',
            test: async () => {
                const input: rec_14 = [[[], [], [], []]];
                const result =
                    await recursion_canister.testRecOptWithVec(input);

                return {
                    Ok: deepCompare(result, input)
                };
            }
        },
        {
            name: 'recursive opt with tuple',
            test: async () => {
                const input: rec_12 = [[[], []]];
                const result =
                    await recursion_canister.testRecOptWithTuple(input);

                return {
                    Ok: deepCompare(result, input)
                };
            }
        },
        {
            name: 'recursive opt with variant',
            test: async () => {
                const input: rec_8 = [{ Branch: [] }];
                const result =
                    await recursion_canister.testRecOptWithVariant(input);

                return {
                    Ok: deepCompare(result, input)
                };
            }
        },
        {
            name: 'recursive opt with opt',
            test: async () => {
                const input: rec_10 = [
                    [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
                ];
                const result =
                    await recursion_canister.testRecOptWithOpt(input);

                return {
                    Ok: deepCompare(result, input)
                };
            }
        }
    ];
}

function deepCompare(obj1: any, obj2: any): boolean {
    // Check if both objects are of type object
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return obj1 === obj2;
    }

    // Get the keys of both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if they have the same keys
    if (keys1.length !== keys2.length) {
        return false;
    }

    // Check if each key's value is deeply equal
    for (const key of keys1) {
        if (!deepCompare(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}
