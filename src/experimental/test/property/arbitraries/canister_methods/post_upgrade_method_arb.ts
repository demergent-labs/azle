import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { Named } from '../..';
import { Test } from '../../test';
import { CandidValueAndMeta } from '../candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from '../candid/corresponding_js_type';
import { VoidArb } from '../candid/primitive/void_arb';
import { Context } from '../types';
import { UniqueIdentifierArb } from '../unique_identifier_arb';
import {
    BodyGenerator,
    generateMethodImplementation,
    isDefined,
    TestsGenerator
} from '.';

export type PostUpgradeMethod<
    ParamAgentArgumentValue extends CorrespondingJSType,
    ParamAgentResponseValue
> = {
    imports: Set<string>;
    globalDeclarations: string[];
    params: Named<
        CandidValueAndMeta<ParamAgentArgumentValue, ParamAgentResponseValue>
    >[];
    sourceCode: string;
    tests: Test[][];
};

export function PostUpgradeMethodArb<
    ParamAgentArgumentValue extends CorrespondingJSType,
    ParamAgentResponseValue
>(
    context: Context,
    generator: {
        generateBody: BodyGenerator<
            ParamAgentArgumentValue,
            ParamAgentResponseValue
        >;
        generateTests: TestsGenerator<
            ParamAgentArgumentValue,
            ParamAgentResponseValue
        >;
    },
    paramTypeArrayArb: fc.Arbitrary<
        CandidValueAndMeta<ParamAgentArgumentValue, ParamAgentResponseValue>[]
    >
): fc.Arbitrary<
    PostUpgradeMethod<ParamAgentArgumentValue, ParamAgentResponseValue>
> {
    return fc
        .tuple(
            UniqueIdentifierArb('canisterProperties', 'property'),
            paramTypeArrayArb,
            VoidArb({ ...context, constraints: {} }),
            UniqueIdentifierArb('globalNames')
            // TODO: This unique id would be better named globalScope or something
            // But needs to match the same scope as typeDeclarations so I'm using
            // that for now.
        )
        .map(
            ([functionName, paramTypes, returnType]): PostUpgradeMethod<
                ParamAgentArgumentValue,
                ParamAgentResponseValue
            > => {
                const imports = new Set([
                    'postUpgrade',
                    ...paramTypes.flatMap((param) => [...param.src.imports])
                ]);

                const namedParams = paramTypes.map(
                    <T>(param: T, index: number): Named<T> => ({
                        name: `param${index}`,
                        value: param
                    })
                );

                const methodImplementation = generateMethodImplementation(
                    namedParams,
                    returnType,
                    generator.generateBody,
                    functionName
                );

                const variableAliasDeclarations = paramTypes
                    .flatMap((param) => param.src.variableAliasDeclarations)
                    .filter(isDefined);

                const globalDeclarations = variableAliasDeclarations;

                const sourceCode = generateSourceCode(
                    functionName,
                    paramTypes,
                    methodImplementation
                );

                const tests = generator.generateTests(
                    functionName,
                    namedParams,
                    returnType
                );

                return {
                    imports,
                    globalDeclarations,
                    params: namedParams,
                    sourceCode,
                    tests
                };
            }
        );
}

function generateSourceCode<
    ParamType extends CorrespondingJSType,
    ParamAgentType
>(
    functionName: string,
    paramTypes: CandidValueAndMeta<ParamType, ParamAgentType>[],
    methodImplementation: string
): string {
    const paramTypeObjects = paramTypes
        .map((param) => param.src.typeObject)
        .join(', ');

    const escapedFunctionName = functionName.startsWith('"')
        ? `"${functionName.slice(1, -1).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
        : functionName;

    return `@postUpgrade([${paramTypeObjects}])\n${escapedFunctionName}${methodImplementation}`;
}
