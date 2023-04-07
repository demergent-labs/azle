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
        },
        {
            name: 'oneGenericTypeParamRecord',
            test: async () => {
                const result =
                    await genericsCanister.oneGenericTypeParamRecord();
                return {
                    Ok:
                        'a' in result &&
                        result.a === 'One generic type parameter' &&
                        'b' in result &&
                        result.b === 456
                };
            }
        },
        {
            name: 'twoGenericTypeParamsRecord',
            test: async () => {
                const result =
                    await genericsCanister.twoGenericTypeParamsRecord();
                return {
                    Ok:
                        'a' in result &&
                        result.a === 'two generic type params record' &&
                        'b' in result &&
                        result.b === 42
                };
            }
        },
        {
            name: 'threeGenericTypeParamsRecord',
            test: async () => {
                const result =
                    await genericsCanister.threeGenericTypeParamsRecord();
                return {
                    Ok:
                        'a' in result &&
                        result.a === 'property a' &&
                        'b' in result &&
                        result.b === 432 &&
                        'c' in result &&
                        result.c === true
                };
            }
        },
        {
            name: 'myRecordAlias',
            test: async () => {
                const result = await genericsCanister.myRecordAlias();
                return {
                    Ok:
                        'prop1' in result &&
                        result.prop1 === 'Hello, world!' &&
                        'prop2' in result &&
                        result.prop2 === 211n
                };
            }
        },
        {
            name: 'genericAliasRecordAlias',
            test: async () => {
                const result = await genericsCanister.genericAliasRecordAlias();
                return {
                    Ok:
                        'arm1' in result &&
                        result.arm1 === 'Why yes' &&
                        'arm2' in result &&
                        'key' in result.arm2 &&
                        result.arm2.key === 'example' &&
                        'value' in result.arm2 &&
                        result.arm2.value === 0n
                };
            }
        },
        {
            name: 'inlineTypesGenericRecord',
            test: async () => {
                const result =
                    await genericsCanister.inlineTypesGenericRecord();
                return {
                    Ok:
                        'arm1' in result &&
                        'id' in result.arm1 &&
                        result.arm1.id === 1 &&
                        'name' in result.arm1 &&
                        result.arm1.name === 'John Doe' &&
                        'arm2' in result &&
                        result.arm2[0] === true &&
                        result.arm2[1] === false &&
                        result.arm2[2] === false &&
                        'arm3' in result &&
                        result.arm3[0] === 665 &&
                        result.arm3[1] === 'oh yeah'
                };
            }
        },
        {
            name: 'oneGenericTypeParamTuple',
            test: async () => {
                const result =
                    await genericsCanister.oneGenericTypeParamTuple();
                return {
                    Ok:
                        Array.isArray(result) &&
                        result[0] === 'One generic type parameter' &&
                        result[1] === 456
                };
            }
        },
        {
            name: 'twoGenericTypeParamsTuple',
            test: async () => {
                const result =
                    await genericsCanister.twoGenericTypeParamsTuple();
                return {
                    Ok:
                        Array.isArray(result) &&
                        result[0] === 'two generic type params tuple' &&
                        result[1] === 42
                };
            }
        },
        {
            name: 'threeGenericTypeParamsTuple',
            test: async () => {
                const result =
                    await genericsCanister.threeGenericTypeParamsTuple();
                return {
                    Ok:
                        Array.isArray(result) &&
                        result[0] === 'property a' &&
                        result[1] === 432 &&
                        result[2] === true
                };
            }
        },
        {
            name: 'myTupleAlias',
            test: async () => {
                const result = await genericsCanister.myTupleAlias();
                return {
                    Ok:
                        Array.isArray(result) &&
                        result[0] === 'Hello, world!' &&
                        result[1] === 211n
                };
            }
        },
        {
            name: 'genericAliasTupleAlias',
            test: async () => {
                const result = await genericsCanister.genericAliasTupleAlias();
                return {
                    Ok:
                        Array.isArray(result) &&
                        result[0] === 'Why yes' &&
                        Array.isArray(result[1]) &&
                        result[1][0] === 'example' &&
                        result[1][1] === 0n
                };
            }
        },
        {
            name: 'inlineTypesGenericTuple',
            test: async () => {
                const result = await genericsCanister.inlineTypesGenericTuple();
                return {
                    Ok:
                        Array.isArray(result) &&
                        typeof result[0] === 'object' &&
                        result[0].id === 1 &&
                        result[0].name === 'John Doe' &&
                        Array.isArray(result[1]) &&
                        result[1][0] === true &&
                        result[1][1] === false &&
                        result[1][2] === false &&
                        Array.isArray(result[2]) &&
                        result[2][0] === 665 &&
                        result[2][1] === 'oh yeah'
                };
            }
        },
        {
            name: 'oneGenericTypeParamVec',
            test: async () => {
                const result = await genericsCanister.oneGenericTypeParamVec();
                return {
                    Ok:
                        Array.isArray(result) &&
                        result.length === 2 &&
                        result[0] === 'One generic type parameter' &&
                        result[1] === 'example 1'
                };
            }
        },
        {
            name: 'myVecAlias',
            test: async () => {
                const result = await genericsCanister.myVecAlias();
                return {
                    Ok:
                        Array.isArray(result) &&
                        result.length === 2 &&
                        result[0] === 'Hello, world!' &&
                        result[1] === 'example 4'
                };
            }
        },
        {
            name: 'inlineTypesGenericVec',
            test: async () => {
                const result = await genericsCanister.inlineTypesGenericVec();
                return {
                    Ok:
                        Array.isArray(result) &&
                        result.length === 1 &&
                        result[0].id === 1 &&
                        result[0].name === 'John Doe'
                };
            }
        },
        {
            name: 'threeInlinesGenericVariant',
            test: async () => {
                const result =
                    await genericsCanister.threeInlinesGenericVariant();
                return {
                    Ok:
                        'Arm3' in result &&
                        Array.isArray(result.Arm3) &&
                        result.Arm3[0] === 'It did work'
                };
            }
        }
    ];
}
