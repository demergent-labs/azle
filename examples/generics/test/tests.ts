import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/generics/generics.did';

export function getTests(genericsCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'simpleResult',
            test: async () => {
                const result = await genericsCanister.simpleResult();
                return {
                    Ok: 'Ok' in result && result.Ok === 'A simple string'
                };
            }
        },
        {
            name: 'nonGenericResultAlias',
            test: async () => {
                const result = await genericsCanister.nonGenericResultAlias();
                return {
                    Ok:
                        'Ok' in result &&
                        result.Ok === 'Non-generic alias result'
                };
            }
        },
        {
            name: 'genericResultAlias',
            test: async () => {
                const result = await genericsCanister.genericResultAlias();
                return {
                    Ok: 'Ok' in result && result.Ok === 42
                };
            }
        },
        {
            name: 'resultInlineTypeArguments',
            test: async () => {
                const result =
                    await genericsCanister.resultInlineTypeArguments();
                return {
                    Ok:
                        'Err' in result &&
                        result.Err.error ===
                            'An error with inline type arguments'
                };
            }
        },
        {
            name: 'oneGenericTypeParamVariant',
            test: async () => {
                const result =
                    await genericsCanister.oneGenericTypeParamVariant();
                return {
                    Ok:
                        'A' in result &&
                        result.A === 'One generic type parameter'
                };
            }
        },
        {
            name: 'twoGenericTypeParamsVariant',
            test: async () => {
                const result =
                    await genericsCanister.twoGenericTypeParamsVariant();
                return { Ok: 'B' in result && result.B === 42 };
            }
        },
        {
            name: 'threeGenericTypeParamsVariant',
            test: async () => {
                const result =
                    await genericsCanister.threeGenericTypeParamsVariant();
                return { Ok: 'C' in result && result.C === true };
            }
        },
        {
            name: 'myVariantAlias',
            test: async () => {
                const result = await genericsCanister.myVariantAlias();
                return {
                    Ok: 'Arm1' in result && result.Arm1 === 'Hello, world!'
                };
            }
        },
        {
            name: 'genericAliasVariantAlias',
            test: async () => {
                const result =
                    await genericsCanister.genericAliasVariantAlias();
                return {
                    Ok:
                        'Arm2' in result &&
                        'Key' in result.Arm2 &&
                        result.Arm2.Key === 'example'
                };
            }
        },
        {
            name: 'inlineTypesGenericVariant',
            test: async () => {
                const result =
                    await genericsCanister.inlineTypesGenericVariant();
                return {
                    Ok:
                        'Arm1' in result &&
                        result.Arm1.id === 1 &&
                        result.Arm1.name === 'John Doe'
                };
            }
        }
    ];
}
