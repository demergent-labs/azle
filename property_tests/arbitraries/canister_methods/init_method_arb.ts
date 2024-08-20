import fc from 'fast-check';

import { Named } from '../..';
import { Test } from '../../test';
import { CandidValueAndMeta } from '../candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from '../candid/corresponding_js_type';
import { VoidArb } from '../candid/primitive/void';
import { Api } from '../types';
import { UniqueIdentifierArb } from '../unique_identifier_arb';
import {
    BodyGenerator,
    generateMethodImplementation,
    isDefined,
    MethodImplementationLocation,
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
    paramTypeArrayArb: fc.Arbitrary<
        CandidValueAndMeta<ParamAgentArgumentValue, ParamAgentResponseValue>[]
    >,
    constraints: {
        generateBody: BodyGenerator<
            ParamAgentArgumentValue,
            ParamAgentResponseValue
        >;
        generateTests: TestsGenerator<
            ParamAgentArgumentValue,
            ParamAgentResponseValue
        >;
        api: Api;
        methodImplementationLocation?: MethodImplementationLocation;
    }
): fc.Arbitrary<InitMethod<ParamAgentArgumentValue, ParamAgentResponseValue>> {
    return fc
        .tuple(
            UniqueIdentifierArb('canisterProperties'),
            paramTypeArrayArb,
            VoidArb(constraints.api),
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
                    constraints.api === 'class'
                        ? 'INLINE'
                        : constraints.methodImplementationLocation ??
                          defaultMethodImplementationLocation;

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
                    constraints.generateBody,
                    methodImplementationLocation,
                    methodName,
                    constraints.api
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
                    constraints.api
                );

                const tests = constraints.generateTests(
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

    if (api === 'functional') {
        return `${functionName}: init([${paramTypeObjects}], ${methodImplementation})`;
    } else {
        return `@init([${paramTypeObjects}])\n${functionName}${methodImplementation}`;
    }
}
