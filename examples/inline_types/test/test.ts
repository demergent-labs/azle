import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/inline_types';

const inline_types_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('inline_types'),
    {
        name: 'inlineRecordReturnType',
        test: async () => {
            const result = await inline_types_canister.inlineRecordReturnType();

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
            const result = await inline_types_canister.recordWithInlineFields();

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
                await inline_types_canister.recordReferencingRecordFromParam({
                    test: {
                        id: '0'
                    }
                });

            return {
                ok: result === '0'
            };
        }
    },
    {
        name: 'recordReferencingVariantFromParam',
        test: async () => {
            const result =
                await inline_types_canister.recordReferencingVariantFromParam({
                    testVariant: {
                        prop1: '0'
                    }
                });

            return {
                ok: result.length === 1 && result[0] === '0'
            };
        }
    },
    {
        name: 'recordReferencingVariantFromParam',
        test: async () => {
            const result =
                await inline_types_canister.recordReferencingVariantFromParam({
                    testVariant: {
                        prop2: {
                            id: '0'
                        }
                    }
                });

            return {
                ok: result.length === 0
            };
        }
    },
    {
        name: 'variantReferencingRecordFromParam',
        test: async () => {
            const result =
                await inline_types_canister.variantReferencingRecordFromParam({
                    prop1: {
                        id: '0'
                    }
                });

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'variantReferencingVariantFromParam',
        test: async () => {
            const result =
                await inline_types_canister.variantReferencingVariantFromParam({
                    prop1: {
                        prop1: null
                    }
                });

            return {
                ok: result === undefined
            };
        }
    }
];

run_tests(tests);
