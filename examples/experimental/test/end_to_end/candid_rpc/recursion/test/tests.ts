import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { getCanisterId } from 'azle/dfx';
import { expect, it, Test } from 'azle/test';
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
    rec_34
    // @ts-ignore
} from './dfx_generated/recursion/recursion.did';
// @ts-ignore
import { _SERVICE as _REC_SERVICE } from './dfx_generated/recursive_canister/recursive_canister.did';

// TODO these tests should be rewritten to use @dfinity/agent once this issue is resolved: https://github.com/dfinity/agent-js/issues/702
// TODO this issue also needs to be resolved: https://forum.dfinity.org/t/services-wont-deserialize-properly-if-functions-arent-in-alphabetical-order/20885
export function getRecursiveCanisterTests(
    recursive_canister: ActorSubclass<_REC_SERVICE>
): Test {
    return () => {
        it('test recursive canister init method', async () => {
            const result = await recursive_canister.getMessage();

            expect(result).toBe('hello');
        });
    };
}

export function getTests(recursion_canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('recursive Variants', async () => {
            const recusiveVariant = {
                recVariant: { recVariant: { recVariant: { num: 3 } } }
            };
            const result =
                await recursion_canister.testRecVariant(recusiveVariant);

            const expectedResult = {
                recVariant: {
                    recVariant: {
                        recVariant: {
                            num: 3
                        }
                    }
                }
            };

            expect(result).toStrictEqual(expectedResult);
        });

        it('recursive Variants return type', async () => {
            const result = await recursion_canister.testRecVariantReturn();

            const expectedResult = {
                recVariant: {
                    recVariant: {
                        recVariant: {
                            num: 12
                        }
                    }
                }
            };

            expect(result).toStrictEqual(expectedResult);
        });

        it('recursive records with variants return type', async () => {
            const result =
                await recursion_canister.testRecRecordWithVariantReturn();

            const expectedResult = {
                myVar: {
                    varRec: {
                        myVar: {
                            varRec: {
                                myVar: {
                                    num: 7
                                }
                            }
                        }
                    }
                }
            };

            expect(result).toStrictEqual(expectedResult);
        });

        it('recursive records with variants', async () => {
            const recursiveRecord = {
                myVar: {
                    varRec: {
                        myVar: { varRec: { myVar: { num: 40 } } }
                    }
                }
            };
            const result =
                await recursion_canister.testRecRecordWithVariant(
                    recursiveRecord
                );

            expect(result).toStrictEqual(recursiveRecord);
        });

        it('recursive tuples with variants return type', async () => {
            const result =
                await recursion_canister.testRecTupleWithVariantReturn();

            const expectedResult = [
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
            expect(result).toStrictEqual(expectedResult);
        });

        it('recursive records with opts', async () => {
            const recursiveRecord: rec_16 = {
                myOpt: [{ myOpt: [] }]
            };
            const result =
                await recursion_canister.testRecRecordWithOpt(recursiveRecord);

            expect(result).toStrictEqual(recursiveRecord);
        });

        it('recursive funcs', async () => {
            const func: [Principal, string] = [
                Principal.fromText('aaaaa-aa'),
                'delete_canister'
            ];

            const result = await recursion_canister.testRecFunc(func);

            expect(result).toEqual(func);
        });

        it('recursive funcs return', async () => {
            const result = await recursion_canister.testRecFuncReturn();

            const expectedResult = [
                Principal.fromText('aaaaa-aa'),
                'create_canister'
            ];

            expect(result).toEqual(expectedResult);
        });

        it('recursive records with vec', async () => {
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
            const result = await recursion_canister.testRecRecordWithVec(input);

            expect(result).toStrictEqual(input);
        });

        it('recursive tuples with vec', async () => {
            const input: rec_26 = [[[[], [[[], []]]]], []];
            const result = await recursion_canister.testRecTupleWithVec(input);

            expect(result).toStrictEqual(input);
        });

        it('recursive tuples with vec return', async () => {
            const input = [
                [[[], [[[], []]]]],
                [
                    [[], []],
                    [[], []],
                    [[], []],
                    [[], []]
                ]
            ];
            const result = await recursion_canister.testRecTupleWithVecReturn();

            expect(result).toStrictEqual(input);
        });

        it('recursive tuples with opt', async () => {
            const input: rec_24 = [[[[], [[[], []]]]], []];
            const result = await recursion_canister.testRecTupleWithOpt(input);

            expect(result).toStrictEqual(input);
        });

        it('recursive tuples with opt return', async () => {
            const input = [[], [[[], []]]];
            const result = await recursion_canister.testRecTupleWithOptReturn();

            expect(result).toStrictEqual(input);
        });

        it('recursive records with vec return', async () => {
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

            expect(result).toStrictEqual(input);
        });

        it('recursive records with opts return type', async () => {
            const result =
                await recursion_canister.testRecRecordWithOptReturn();

            const expectedResult = {
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

            expect(result).toStrictEqual(expectedResult);
        });

        it('recursive tuples with variants', async () => {
            const recursiveTuple: rec_34 = [
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
                await recursion_canister.testRecTupleWithVariant(
                    recursiveTuple
                );

            expect(result).toStrictEqual(recursiveTuple);
        });

        it('test rec service simple', async () => {
            const principalId = getCanisterId('recursive_canister');
            const result = execSync(
                `dfx canister call recursion testRecServiceSimple '(service "${principalId}")'`
            )
                .toString()
                .trim();

            expect(result).toBe(`(service "${principalId}")`);
        });

        it('test rec service', async () => {
            const principalId = getCanisterId('recursive_canister');
            const result = execSync(
                `dfx canister call recursion testRecService '(service "${principalId}")'`
            )
                .toString()
                .trim();

            expect(result).toBe(`(service "${principalId}")`);
        });

        it('test rec service return', async () => {
            const principalId = getCanisterId('recursive_canister');
            const result = execSync(
                `dfx canister call recursion testRecServiceReturn`
            )
                .toString()
                .trim();

            expect(result).toBe(`(service "${principalId}")`);
        });

        it('test rec service call', async () => {
            const principalId = getCanisterId('recursive_canister');
            const result = execSync(
                `dfx canister call recursion testRecServiceCall '(service "${principalId}")'`
            )
                .toString()
                .trim();

            expect(result).toBe(`(service "${principalId}")`);
        });

        it('recursive vec with variant', async () => {
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

            expect(result).toStrictEqual(input);
        });

        it('recursive vec with tuple', async () => {
            const input: rec_4 = [
                [[], []],
                [[[[], []]], []],
                [[], [[[], []]]],
                [[[[], []]], [[[], []]]]
            ];
            const result = await recursion_canister.testRecVecWithTuple(input);

            expect(result).toStrictEqual(input);
        });

        it('recursive vec with opt', async () => {
            const input: rec_2 = [[[[], [[[], []]]]], []];
            const result = await recursion_canister.testRecVecWithOpt(input);

            expect(result).toStrictEqual(input);
        });

        it('recursive vec with vec', async () => {
            const input: rec_6 = [[[[], [[[], []]]]], []];
            const result = await recursion_canister.testRecVecWithVec(input);

            expect(result).toStrictEqual(input);
        });

        it('recursive opt with vec', async () => {
            const input: rec_14 = [[[], [], [], []]];
            const result = await recursion_canister.testRecOptWithVec(input);

            expect(result).toStrictEqual(input);
        });

        it('recursive opt with tuple', async () => {
            const input: rec_12 = [[[], []]];
            const result = await recursion_canister.testRecOptWithTuple(input);

            expect(result).toStrictEqual(input);
        });

        it('recursive opt with variant', async () => {
            const input: rec_8 = [{ Branch: [] }];
            const result =
                await recursion_canister.testRecOptWithVariant(input);

            expect(result).toStrictEqual(input);
        });

        it('recursive opt with opt', async () => {
            const input: rec_10 = [
                [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
            ];
            const result = await recursion_canister.testRecOptWithOpt(input);

            expect(result).toStrictEqual(input);
        });
    };
}
