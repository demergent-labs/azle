import { Test } from 'azle/test';
import { _SERVICE, rec_1 } from './dfx_generated/recursion/recursion.did';
import { ActorSubclass } from '@dfinity/agent';

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
        }
    ];
}
