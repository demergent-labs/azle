import { ActorSubclass } from '@icp-sdk/core/agent';
import { Principal } from '@icp-sdk/core/principal';
import { getCanisterId } from 'azle/_internal/dfx';
import { expect, it, Test } from 'azle/_internal/test';

import {
    _SERVICE,
    rec_3,
    rec_5,
    rec_6,
    rec_8,
    rec_9,
    rec_10,
    rec_11,
    rec_13,
    rec_14,
    rec_15,
    rec_16
} from './dfx_generated/recursion/recursion.did';
import { _SERVICE as _REC_SERVICE } from './dfx_generated/recursive_canister/recursive_canister.did';
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
            const recursiveRecord: rec_3 = {
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
            const input: rec_6 = [[[[], [[[], []]]]], []];
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
            const input: rec_5 = [[[[], [[[], []]]]], []];
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
            const recursiveTuple: rec_8 = [
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
            const recursiveCanisterPrincipal = getRecursiveCanisterPrincipal();
            const result = await recursion_canister.testRecServiceSimple(
                recursiveCanisterPrincipal
            );

            expect(result.toText()).toBe(recursiveCanisterPrincipal.toText());
        });

        it('test rec service', async () => {
            const recursiveCanisterPrincipal = getRecursiveCanisterPrincipal();
            const result = await recursion_canister.testRecService(
                recursiveCanisterPrincipal
            );

            expect(result.toText()).toBe(recursiveCanisterPrincipal.toText());
        });

        it('test rec service return', async () => {
            const recursiveCanisterPrincipal = getRecursiveCanisterPrincipal();
            const result = await recursion_canister.testRecServiceReturn();

            expect(result.toText()).toBe(recursiveCanisterPrincipal.toText());
        });

        it('test rec service call', async () => {
            const recursiveCanisterPrincipal = getRecursiveCanisterPrincipal();
            const result = await recursion_canister.testRecServiceCall(
                recursiveCanisterPrincipal
            );

            expect(result.toText()).toBe(recursiveCanisterPrincipal.toText());
        });

        it('recursive vec with variant', async () => {
            const input: rec_9 = [
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
            const input: rec_11 = [
                [[], []],
                [[[[], []]], []],
                [[], [[[], []]]],
                [[[[], []]], [[[], []]]]
            ];
            const result = await recursion_canister.testRecVecWithTuple(input);

            expect(result).toStrictEqual(input);
        });

        it('recursive vec with opt', async () => {
            const input: rec_10 = [[[[], [[[], []]]]], []];
            const result = await recursion_canister.testRecVecWithOpt(input);

            expect(result).toStrictEqual(input);
        });

        it('recursive vec with vec', async () => {
            const input: rec_6 = [[[[], [[[], []]]]], []];
            const result = await recursion_canister.testRecVecWithVec(input);

            expect(result).toStrictEqual(input);
        });

        it('recursive opt with vec', async () => {
            const input: rec_16 = [[[], [], [], []]];
            const result = await recursion_canister.testRecOptWithVec(input);

            expect(result).toStrictEqual(input);
        });

        it('recursive opt with tuple', async () => {
            const input: rec_15 = [[[], []]];
            const result = await recursion_canister.testRecOptWithTuple(input);

            expect(result).toStrictEqual(input);
        });

        it('recursive opt with variant', async () => {
            const input: rec_13 = [{ Branch: [] }];
            const result =
                await recursion_canister.testRecOptWithVariant(input);

            expect(result).toStrictEqual(input);
        });

        it('recursive opt with opt', async () => {
            const input: rec_14 = [
                [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
            ];
            const result = await recursion_canister.testRecOptWithOpt(input);

            expect(result).toStrictEqual(input);
        });
    };
}

function getRecursiveCanisterPrincipal(): Principal {
    return Principal.fromText(getCanisterId('recursive_canister'));
}
