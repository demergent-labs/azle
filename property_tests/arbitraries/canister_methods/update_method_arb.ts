import fc from 'fast-check';

import { Named } from '../..';
import { Test } from '../../test';
import { CandidReturnType } from '../candid/candid_return_type_arb';
import { CandidValueAndMeta } from '../candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from '../candid/corresponding_js_type';
import { Api } from '../types';
import { UniqueIdentifierArb } from '../unique_identifier_arb';
import {
    BodyGenerator,
    generateMethodImplementation,
    isDefined,
    MethodImplementationLocation,
    TestsGenerator
} from '.';

export type UpdateMethod = {
    imports: Set<string>;
    globalDeclarations: string[];
    sourceCode: string;
    tests: Test[][];
};

export function UpdateMethodArb<
    ParamAgentArgumentValue extends CorrespondingJSType,
    ParamAgentResponseValue,
    ReturnTypeAgentArgumentValue extends CorrespondingJSType,
    ReturnTypeAgentResponseValue
>(
    paramTypeArrayArb: fc.Arbitrary<
        CandidValueAndMeta<ParamAgentArgumentValue, ParamAgentResponseValue>[]
    >,
    returnTypeArb: fc.Arbitrary<
        CandidValueAndMeta<
            ReturnTypeAgentArgumentValue,
            ReturnTypeAgentResponseValue
        >
    >,
    constraints: {
        generateBody: BodyGenerator<
            ParamAgentArgumentValue,
            ParamAgentResponseValue,
            ReturnTypeAgentArgumentValue,
            ReturnTypeAgentResponseValue
        >;
        generateTests: TestsGenerator<
            ParamAgentArgumentValue,
            ParamAgentResponseValue,
            ReturnTypeAgentArgumentValue,
            ReturnTypeAgentResponseValue
        >;
        api: Api;
        methodImplementationLocation?: MethodImplementationLocation;
        name?: string;
    }
): fc.Arbitrary<UpdateMethod> {
    return fc
        .tuple(
            UniqueIdentifierArb('canisterProperties'),
            paramTypeArrayArb,
            returnTypeArb,
            fc.constantFrom<MethodImplementationLocation>(
                'INLINE',
                'STANDALONE'
            ),
            UniqueIdentifierArb('globalNames')
            // TODO: This unique id would be better named globalScope or something
            // But needs to match the same scope as typeDeclarations so I'm using
            // that for now.
        )
        .map(
            ([
                defaultFunctionName,
                paramTypes,
                returnType,
                defaultMethodImplementationLocation,
                methodName
            ]): UpdateMethod => {
                const methodImplementationLocation =
                    constraints.api === 'class'
                        ? 'INLINE'
                        : constraints.methodImplementationLocation ??
                          defaultMethodImplementationLocation;
                const functionName = constraints.name ?? defaultFunctionName;

                const imports = new Set([
                    'update',
                    ...paramTypes.flatMap((param) => [...param.src.imports]),
                    ...returnType.src.imports
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

                const candidTypeDeclarations = [
                    ...paramTypes.flatMap(
                        (param) => param.src.variableAliasDeclarations
                    ),
                    ...returnType.src.variableAliasDeclarations
                ].filter(isDefined);

                const globalDeclarations =
                    methodImplementationLocation === 'STANDALONE'
                        ? [...candidTypeDeclarations, methodImplementation]
                        : candidTypeDeclarations;

                const sourceCode = generateSourceCode(
                    functionName,
                    paramTypes,
                    returnType,
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
                    sourceCode,
                    tests
                };
            }
        );
}

function generateSourceCode<
    ParamType extends CorrespondingJSType,
    ParamAgentType,
    ReturnType extends CandidReturnType,
    ReturnAgentType
>(
    functionName: string,
    paramTypes: CandidValueAndMeta<ParamType, ParamAgentType>[],
    returnType: CandidValueAndMeta<ReturnType, ReturnAgentType>,
    methodImplementation: string,
    api: Api
): string {
    const paramTypeObjects = paramTypes
        .map((param) => param.src.typeObject)
        .join(', ');

    const returnTypeObject = returnType.src.typeObject;

    if (api === 'functional') {
        return `${functionName}: update([${paramTypeObjects}], ${returnTypeObject}, ${methodImplementation})`;
    } else {
        return `@update([${paramTypeObjects}], ${returnTypeObject})\n${functionName}${methodImplementation}`;
    }
}
