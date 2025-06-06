import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { Named } from '../..';
import { Test } from '../../test';
import { CandidValueAndMeta } from '../candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from '../candid/corresponding_js_type';
import { VoidArb } from '../candid/primitive/void_arb';
import { Api, Context } from '../types';
import { UniqueIdentifierArb } from '../unique_identifier_arb';
import {
    BodyGenerator,
    CanisterMethodConstraints,
    generateMethodImplementation,
    isDefined,
    MethodImplementationLocationArb,
    TestsGenerator
} from '.';

export type InitMethod<
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

export function InitMethodArb<
    ParamAgentArgumentValue extends CorrespondingJSType,
    ParamAgentResponseValue
>(
    context: Context<CanisterMethodConstraints>,
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
): fc.Arbitrary<InitMethod<ParamAgentArgumentValue, ParamAgentResponseValue>> {
    const api = context.api;
    const constraints = context.constraints;
    return fc
        .tuple(
            UniqueIdentifierArb('canisterProperties', 'property'),
            paramTypeArrayArb,
            VoidArb({ ...context, constraints: {} }),
            MethodImplementationLocationArb,
            UniqueIdentifierArb('globalNames')
            // TODO: This unique id would be better named globalScope or something
            // But needs to match the same scope as typeDeclarations so I'm using
            // that for now.
        )
        .map(
            ([
                functionName,
                paramTypes,
                returnType,
                defaultMethodImplementationLocation,
                methodName
            ]): InitMethod<
                ParamAgentArgumentValue,
                ParamAgentResponseValue
            > => {
                const methodImplementationLocation =
                    api === 'class'
                        ? 'INLINE'
                        : (constraints.methodImplementationLocation ??
                          defaultMethodImplementationLocation);

                const imports = new Set([
                    'init',
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
                    methodImplementationLocation,
                    functionName,
                    methodName,
                    api
                );

                const variableAliasDeclarations = paramTypes
                    .flatMap((param) => param.src.variableAliasDeclarations)
                    .filter(isDefined);

                const globalDeclarations =
                    methodImplementationLocation === 'STANDALONE'
                        ? [...variableAliasDeclarations, methodImplementation]
                        : variableAliasDeclarations;

                const sourceCode = generateSourceCode(
                    functionName,
                    paramTypes,
                    methodImplementationLocation === 'STANDALONE'
                        ? methodName
                        : methodImplementation,
                    api
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
    methodImplementation: string,
    api: Api
): string {
    const paramTypeObjects = paramTypes
        .map((param) => param.src.typeObject)
        .join(', ');

    const escapedFunctionName = functionName.startsWith('"')
        ? `"${functionName.slice(1, -1).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
        : functionName;

    if (api === 'functional') {
        return `${escapedFunctionName}: init([${paramTypeObjects}], ${methodImplementation})`;
    } else {
        return `@init([${paramTypeObjects}])\n${escapedFunctionName}${methodImplementation}`;
    }
}
