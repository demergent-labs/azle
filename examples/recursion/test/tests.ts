import { Test } from 'azle/test';
import { _SERVICE, rec_1 } from './dfx_generated/recursion/recursion.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(recursion_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'recursive Variants',
            test: async () => {
                const result = await recursion_canister.recVariant({
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
                const result = await recursion_canister.recVariantReturn();

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
                const result = await recursion_canister.varRecordReturn();

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
                const result = await recursion_canister.varRecord({
                    myVar: {
                        varRec: { myVar: { varRec: { myVar: { num: 40 } } } }
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
        }
    ];
}
