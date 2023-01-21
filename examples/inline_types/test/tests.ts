import { ok, Test } from 'azle/test';
import { execSync } from 'child_process';
import { _SERVICE } from './dfx_generated/inline_types/inline_types.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(
    inline_types_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'inlineRecordReturnType',
            test: async () => {
                const result =
                    await inline_types_canister.inlineRecordReturnType();

                return {
                    ok: result.prop1 === 'prop1' && result.prop2 === 'prop2'
                };
            }
        },
        {
            name: 'inlineRecordParam',
            test: async () => {
                const result = await inline_types_canister.inlineRecordParam({
                    prop1: 'prop1'
                });

                return {
                    ok: result === 'prop1'
                };
            }
        },
        {
            name: 'inlineVariantReturnType',
            test: async () => {
                const result =
                    await inline_types_canister.inlineVariantReturnType();

                return {
                    ok: 'var1' in result
                };
            }
        },
        {
            name: 'inlineRecordReturnType',
            test: async () => {
                const result = await inline_types_canister.inlineVariantParam({
                    var1: null
                });

                return {
                    ok: 'var1' in result
                };
            }
        },
        {
            name: 'inlineVariantParam',
            test: async () => {
                const result = await inline_types_canister.inlineVariantParam({
                    var2: null
                });

                return {
                    ok: 'var2' in result
                };
            }
        },
        {
            name: 'recordWithInlineFields',
            test: async () => {
                const result =
                    await inline_types_canister.recordWithInlineFields();

                return {
                    ok:
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
                    await inline_types_canister.variantWithInlineFields();

                return {
                    ok: 'three' in result && result.three.id === '0'
                };
            }
        },
        {
            name: 'recordReferencingOtherTypesFromReturnType',
            test: async () => {
                const result =
                    await inline_types_canister.recordReferencingOtherTypesFromReturnType();

                return {
                    ok: result.prop1 === 'prop1' && result.prop2.id === '0'
                };
            }
        },
        {
            name: 'variantReferencingOtherTypesFromReturnType',
            test: async () => {
                const result =
                    await inline_types_canister.variantReferencingOtherTypesFromReturnType();

                return {
                    ok: 'prop2' in result && result.prop2.id === '0'
                };
            }
        },
        {
            name: 'recordReferencingRecordFromParam',
            test: async () => {
                const result =
                    await inline_types_canister.recordReferencingRecordFromParam(
                        {
                            test: {
                                id: '0'
                            }
                        }
                    );

                return {
                    ok: result === '0'
                };
            }
        },
        {
            name: 'recordReferencingVariantFromParam',
            test: async () => {
                const result =
                    await inline_types_canister.recordReferencingVariantFromParam(
                        {
                            testVariant: {
                                prop1: '0'
                            }
                        }
                    );

                return {
                    ok: result.length === 1 && result[0] === '0'
                };
            }
        },
        {
            name: 'recordReferencingVariantFromParam',
            test: async () => {
                const result =
                    await inline_types_canister.recordReferencingVariantFromParam(
                        {
                            testVariant: {
                                prop2: {
                                    id: '0'
                                }
                            }
                        }
                    );

                return {
                    ok: result.length === 0
                };
            }
        },
        {
            name: 'variantReferencingRecordFromParam',
            test: async () => {
                const result =
                    await inline_types_canister.variantReferencingRecordFromParam(
                        {
                            prop1: {
                                id: '0'
                            }
                        }
                    );

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'variantReferencingVariantFromParam',
            test: async () => {
                const result =
                    await inline_types_canister.variantReferencingVariantFromParam(
                        {
                            prop1: {
                                prop1: null
                            }
                        }
                    );

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'inserting into an inline-defined StableBTreeMap',
            test: async () => {
                const result = await inline_types_canister.stable_map_insert(
                    'test_key',
                    {
                        variant: {
                            var2: {
                                prop1: 'test_value'
                            }
                        }
                    }
                );

                if (!ok(result)) {
                    if ('ValueTooLarge' in result.err) {
                        return {
                            err: `InsertError::ValueTooLarge Expected value to be <= ${result.err.ValueTooLarge.max} bytes but received value with ${result.err.ValueTooLarge.given} bytes.`
                        };
                    } else {
                        return {
                            err: `InsertError::KeyTooLarge Expected key to be <= ${result.err.KeyTooLarge.max} bytes but received key with ${result.err.KeyTooLarge.given} bytes.`
                        };
                    }
                }

                return {
                    ok: Array.isArray(result.ok) && result.ok.length == 0
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
                const result = await inline_types_canister.stable_map_get(
                    'test_key'
                );

                return {
                    ok:
                        result.length != 0 &&
                        'var2' in result[0].variant &&
                        'prop1' in result[0].variant.var2 &&
                        result[0].variant.var2.prop1 === 'test_value'
                };
            }
        }
    ];
}
