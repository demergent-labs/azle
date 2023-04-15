import { ok, Test } from 'azle/test';
import { execSync } from 'child_process';
import { _SERVICE } from './dfx_generated/inline_types/inline_types.did';
import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

export function getTests(inlineTypesCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'inlineRecordReturnType',
            test: async () => {
                const result =
                    await inlineTypesCanister.inlineRecordReturnType();

                return {
                    Ok: result.prop1 === 'prop1' && result.prop2 === 'prop2'
                };
            }
        },
        {
            name: 'inlineRecordParam',
            test: async () => {
                const result = await inlineTypesCanister.inlineRecordParam({
                    prop1: 'prop1'
                });

                return {
                    Ok: result === 'prop1'
                };
            }
        },
        {
            name: 'inlineVariantReturnType',
            test: async () => {
                const result =
                    await inlineTypesCanister.inlineVariantReturnType();

                return {
                    Ok: 'var1' in result
                };
            }
        },
        {
            name: 'inlineRecordReturnType',
            test: async () => {
                const result = await inlineTypesCanister.inlineVariantParam({
                    var1: null
                });

                return {
                    Ok: 'var1' in result
                };
            }
        },
        {
            name: 'inlineVariantParam',
            test: async () => {
                const result = await inlineTypesCanister.inlineVariantParam({
                    var2: null
                });

                return {
                    Ok: 'var2' in result
                };
            }
        },
        {
            name: 'recordWithInlineFields',
            test: async () => {
                const result =
                    await inlineTypesCanister.recordWithInlineFields();

                return {
                    Ok:
                        result.id === '0' &&
                        result.job.id === '0' &&
                        result.job.title === 'Software Developer'
                };
            }
        },
        {
            name: 'variantWithInlineFields',
            test: async () => {
                const result =
                    await inlineTypesCanister.variantWithInlineFields();

                return {
                    Ok: 'three' in result && result.three.id === '0'
                };
            }
        },
        {
            name: 'recordReferencingOtherTypesFromReturnType',
            test: async () => {
                const result =
                    await inlineTypesCanister.recordReferencingOtherTypesFromReturnType();

                return {
                    Ok: result.prop1 === 'prop1' && result.prop2.id === '0'
                };
            }
        },
        {
            name: 'variantReferencingOtherTypesFromReturnType',
            test: async () => {
                const result =
                    await inlineTypesCanister.variantReferencingOtherTypesFromReturnType();

                return {
                    Ok: 'prop2' in result && result.prop2.id === '0'
                };
            }
        },
        {
            name: 'recordReferencingRecordFromParam',
            test: async () => {
                const result =
                    await inlineTypesCanister.recordReferencingRecordFromParam({
                        test: {
                            id: '0'
                        }
                    });

                return {
                    Ok: result === '0'
                };
            }
        },
        {
            name: 'recordReferencingVariantFromParam',
            test: async () => {
                const result =
                    await inlineTypesCanister.recordReferencingVariantFromParam(
                        {
                            testVariant: {
                                prop1: '0'
                            }
                        }
                    );

                return {
                    Ok: result.length === 1 && result[0] === '0'
                };
            }
        },
        {
            name: 'recordReferencingVariantFromParam',
            test: async () => {
                const result =
                    await inlineTypesCanister.recordReferencingVariantFromParam(
                        {
                            testVariant: {
                                prop2: {
                                    id: '0'
                                }
                            }
                        }
                    );

                return {
                    Ok: result.length === 0
                };
            }
        },
        {
            name: 'variantReferencingRecordFromParam',
            test: async () => {
                const result =
                    await inlineTypesCanister.variantReferencingRecordFromParam(
                        {
                            prop1: {
                                id: '0'
                            }
                        }
                    );

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'variantReferencingVariantFromParam',
            test: async () => {
                const result =
                    await inlineTypesCanister.variantReferencingVariantFromParam(
                        {
                            prop1: {
                                prop1: null
                            }
                        }
                    );

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'inline types in external canister definitions',
            test: async () => {
                const result =
                    await inlineTypesCanister.inlineRecordReturnTypeAsExternalCanisterCall();

                if (!ok(result)) {
                    return { Err: result.Err };
                }

                return {
                    Ok: result.Ok.prop1 == 'prop1' && result.Ok.prop2 == 'prop2'
                };
            }
        },
        {
            name: 'inline types in funcs',
            test: async () => {
                const principalId = 'aaaaa-aa';
                const method = 'rawRand';
                const result = await inlineTypesCanister.inlineFunc([
                    Principal.from(principalId),
                    method
                ]);

                return {
                    Ok:
                        result[0].toString() === principalId &&
                        result[1].toString() === method
                };
            }
        },
        {
            name: 'crazy complex inline record',
            test: async () => {
                const result = await inlineTypesCanister.complex({
                    primitive: 'text',
                    opt: [
                        {
                            primitive: 0n,
                            opt: ['text'],
                            vec: ['item1'],
                            record: { prop1: 'prop1' },
                            variant: { v2: null },
                            func: [Principal.from('aaaaa-aa'), 'rawRand']
                        }
                    ],
                    vec: [
                        {
                            primitive: 0n,
                            opt: ['text'],
                            vec: ['item1'],
                            record: { prop1: 'prop1' },
                            variant: { v2: null },
                            func: [Principal.from('aaaaa-aa'), 'rawRand']
                        }
                    ],
                    record: {
                        prop1: 'text',
                        optional: [],
                        variant: { v1: null }
                    },
                    variant: {
                        v3: {
                            prop1: 'text'
                        }
                    },
                    func: [Principal.from('aaaaa-aa'), 'rawRand']
                });

                return {
                    Ok:
                        'v3' in result.variant &&
                        result.variant.v3.prop1 == 'text' &&
                        result.opt[0]?.record.prop1 == 'prop1'
                };
            }
        },
        {
            name: 'inserting into an inline-defined StableBTreeMap',
            test: async () => {
                const result = await inlineTypesCanister.stableMapInsert(
                    {
                        prop1: ['testKey'],
                        prop2: { var2: { prop1: 'testKey' } },
                        prop3: [{ prop1: 0n }]
                    },
                    {
                        variant: {
                            var2: {
                                prop1: 'testValue'
                            }
                        }
                    }
                );

                return {
                    Ok: Array.isArray(result) && result.length == 0
                };
            }
        },
        {
            name: 'redeploy canister',
            prep: async () => {
                execSync('dfx deploy', { stdio: 'inherit' });
            }
        },
        {
            name: 'reading from an inline-defined StableBTreeMap (after redeploy)',
            test: async () => {
                const result = await inlineTypesCanister.stableMapGet({
                    prop1: ['testKey'],
                    prop2: { var2: { prop1: 'testKey' } },
                    prop3: [{ prop1: 0n }]
                });

                return {
                    Ok:
                        result.length != 0 &&
                        'var2' in result[0].variant &&
                        'prop1' in result[0].variant.var2 &&
                        result[0].variant.var2.prop1 === 'testValue'
                };
            }
        }
    ];
}
