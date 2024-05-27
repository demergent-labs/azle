import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { getCanisterId } from 'azle/dfx';
import { Test, testEquality } from 'azle/test';
import { execSync } from 'child_process';

import {
    _SERVICE,
    rec_0,
    rec_2,
    rec_4,
    rec_6,
    rec_8,
    rec_10,
    rec_12,
    rec_14,
    rec_16,
    rec_24,
    rec_26,
    rec_28,
    rec_32,
    rec_33,
    rec_34,
    rec_36
    // @ts-ignore
} from './dfx_generated/recursion/recursion.did';
// @ts-ignore
import { _SERVICE as _REC_SERVICE } from './dfx_generated/recursive_canister/recursive_canister.did';

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

                return testEquality(result, 'hello');
            }
        }
    ];
}
export function getTests(recursion_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'recursive Variants',
            test: async () => {
                const expected = {
                    recVariant: { recVariant: { recVariant: { num: 3 } } }
                };
                const result =
                    await recursion_canister.testRecVariant(expected);

                return testEquality(result, expected);
            }
        },
        {
            name: 'recursive Variants return type',
            test: async () => {
                const result = await recursion_canister.testRecVariantReturn();
                const expected = {
                    recVariant: { recVariant: { recVariant: { num: 12 } } }
                };

                return testEquality(result, expected);
            }
        },
        {
            name: 'recursive records with variants return type',
            test: async () => {
                const result =
                    await recursion_canister.testRecRecordWithVariantReturn();

                const expecected = {
                    myVar: {
                        varRec: {
                            myVar: { varRec: { myVar: { num: 7 } } }
                        }
                    }
                };
                return testEquality(result, expecected);
            }
        },
        {
            name: 'recursive records with variants',
            test: async () => {
                const expected = {
                    myVar: {
                        varRec: {
                            myVar: {
                                varRec: {
                                    myVar: {
                                        num: 40
                                    }
                                }
                            }
                        }
                    }
                };
                const result =
                    await recursion_canister.testRecRecordWithVariant(expected);

                return testEquality(result, expected);
            }
        },
        {
            name: 'recursive tuples with variants return type',
            test: async () => {
                const result =
                    await recursion_canister.testRecTupleWithVariantReturn();
                const expected: rec_36 = [
                    {
                        varTuple: [
                            {
                                varTuple: [{ num: 70 }, { num: 7 }]
                            },
                            {
                                varTuple: [{ num: 3 }, { num: 12 }]
                            }
                        ]
                    },
                    {
                        varTuple: [
                            { num: 40 },
                            {
                                varTuple: [{ num: 5 }, { num: 10 }]
                            }
                        ]
                    }
                ];

                return testEquality(result, expected);
            }
        },
        {
            name: 'recursive records with opts',
            test: async () => {
                const expected: rec_16 = {
                    myOpt: [{ myOpt: [] }]
                };
                const result =
                    await recursion_canister.testRecRecordWithOpt(expected);

                return testEquality(result, expected);
            }
        },
        {
            name: 'recursive funcs',
            test: async () => {
                const expected: [Principal, string] = [
                    Principal.fromText('aaaaa-aa'),
                    'delete_canister'
                ];
                const result = await recursion_canister.testRecFunc(expected);

                return testEquality(result, expected);
            }
        },
        {
            name: 'recursive funcs return',
            test: async () => {
                const result = await recursion_canister.testRecFuncReturn();
                const expected: [Principal, string] = [
                    Principal.fromText('aaaaa-aa'),
                    'create_canister'
                ];

                return testEquality(result, expected);
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

                return testEquality(result, input);
            }
        },
        {
            name: 'recursive tuples with vec',
            test: async () => {
                const input: rec_26 = [[[[], [[[], []]]]], []];
                const result =
                    await recursion_canister.testRecTupleWithVec(input);

                return testEquality(result, input);
            }
        },
        {
            name: 'recursive tuples with vec return',
            test: async () => {
                const input: rec_33 = [
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

                return testEquality(result, input);
            }
        },
        {
            name: 'recursive tuples with opt',
            test: async () => {
                const input: rec_24 = [[[[], [[[], []]]]], []];
                const result =
                    await recursion_canister.testRecTupleWithOpt(input);

                return testEquality(result, input);
            }
        },
        {
            name: 'recursive tuples with opt return',
            test: async () => {
                const input: rec_32 = [[], [[[], []]]];
                const result =
                    await recursion_canister.testRecTupleWithOptReturn();

                return testEquality(result, input);
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

                return testEquality(result, input);
            }
        },
        {
            name: 'recursive records with opts return type',
            test: async () => {
                const result =
                    await recursion_canister.testRecRecordWithOptReturn();
                const expected: rec_28 = {
                    myOpt: [
                        {
                            myOpt: [
                                {
                                    myOpt: []
                                }
                            ]
                        }
                    ]
                };

                return testEquality(result, expected);
            }
        },
        {
            name: 'recursive tuples with variants',
            test: async () => {
                const expected: rec_34 = [
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
                ];
                const result =
                    await recursion_canister.testRecTupleWithVariant(expected);

                return testEquality(result, expected);
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

                return testEquality(result, `(service "${principalId}")`);
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

                return testEquality(result, `(service "${principalId}")`);
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

                return testEquality(result, `(service "${principalId}")`);
            }
        },
        {
            name: 'test rec service call',
            test: async () => {
                const principalId = getCanisterId('recursive_canister');
                const result = execSync(
                    `dfx canister call recursion testRecServiceCall '(service "${principalId}")'`
                )
                    .toString()
                    .trim();

                return testEquality(result, `(service "${principalId}")`);
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

                return testEquality(result, input);
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

                return testEquality(result, input);
            }
        },
        {
            name: 'recursive vec with opt',
            test: async () => {
                const input: rec_2 = [[[[], [[[], []]]]], []];
                const result =
                    await recursion_canister.testRecVecWithOpt(input);

                return testEquality(result, input);
            }
        },
        {
            name: 'recursive vec with vec',
            test: async () => {
                const input: rec_6 = [[[[], [[[], []]]]], []];
                const result =
                    await recursion_canister.testRecVecWithVec(input);

                return testEquality(result, input);
            }
        },
        {
            name: 'recursive opt with vec',
            test: async () => {
                const input: rec_14 = [[[], [], [], []]];
                const result =
                    await recursion_canister.testRecOptWithVec(input);

                return testEquality(result, input);
            }
        },
        {
            name: 'recursive opt with tuple',
            test: async () => {
                const input: rec_12 = [[[], []]];
                const result =
                    await recursion_canister.testRecOptWithTuple(input);

                return testEquality(result, input);
            }
        },
        {
            name: 'recursive opt with variant',
            test: async () => {
                const input: rec_8 = [{ Branch: [] }];
                const result =
                    await recursion_canister.testRecOptWithVariant(input);

                return testEquality(result, input);
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

                return testEquality(result, input);
            }
        }
    ];
}
// functreturn testEquality(obj1: any, obj2: any): boolean {;

//     // Check if both objects are of type object
//     if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
//         return obj1 === obj2;
//     }

//     // Get the keys of both objects
//     const keys1 = Object.keys(obj1);
//     const keys2 = Object.keys(obj2);

//     // Check if they have the same keys
//     if (keys1.length !== keys2.length) {
//         return false;
//     }

//     // Check if each key's value is deeply equal
//         ireturn testEquality(obj1[key], obj2[key])) {;
//     for (const key of keys1) {
//             return false;
//         }
//     }

//     return true;
// }
