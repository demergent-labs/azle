import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { Named } from '../..';
import { Test } from '../../test';
import { CandidReturnType } from '../candid/candid_return_type_arb';
import { CandidValueAndMeta } from '../candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from '../candid/corresponding_js_type';
import { Context } from '../types';
import { UniqueIdentifierArb } from '../unique_identifier_arb';
import {
    BodyGenerator,
    generateMethodImplementation,
    isDefined,
    QueryOrUpdateConstraints,
    TestsGenerator
} from '.';

export type QueryMethod = {
    imports: Set<string>;
    globalDeclarations: string[];
    sourceCode: string;
    tests: Test[][];
};

export function QueryMethodArb<
    ParamAgentArgumentValue extends CorrespondingJSType,
    ParamAgentResponseValue,
    ReturnTypeAgentArgumentValue extends CorrespondingJSType,
    ReturnTypeAgentResponseValue
>(
    context: Context<QueryOrUpdateConstraints>,
    generator: {
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
    },
    paramTypeArrayArb: fc.Arbitrary<
        CandidValueAndMeta<ParamAgentArgumentValue, ParamAgentResponseValue>[]
    >,
    returnTypeArb: fc.Arbitrary<
        CandidValueAndMeta<
            ReturnTypeAgentArgumentValue,
            ReturnTypeAgentResponseValue
        >
    >
): fc.Arbitrary<QueryMethod> {
    const constraints = context.constraints;
    return fc
        .tuple(
            UniqueIdentifierArb('canisterProperties', 'property'),
            paramTypeArrayArb,
            returnTypeArb
        )
        .map(([defaultFunctionName, paramTypes, returnType]): QueryMethod => {
            const functionName = constraints.name ?? defaultFunctionName;

            const imports = new Set([
                'query',
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
                generator.generateBody,
                functionName
            );

            const candidTypeDeclarations = [
                ...paramTypes.flatMap(
                    (param) => param.src.variableAliasDeclarations
                ),
                ...returnType.src.variableAliasDeclarations
            ].filter(isDefined);

            const globalDeclarations = candidTypeDeclarations;

            const sourceCode = generateSourceCode(
                functionName,
                paramTypes,
                returnType,
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
                sourceCode,
                tests
            };
        });
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
    methodImplementation: string
): string {
    const paramTypeObjects = paramTypes
        .map((param) => param.src.typeObject)
        .join(', ');

    const returnTypeObject = returnType.src.typeObject;

    const escapedFunctionName = functionName.startsWith('"')
        ? `"${functionName.slice(1, -1).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
        : functionName;

    return `@query([${paramTypeObjects}], ${returnTypeObject})\n${escapedFunctionName}${methodImplementation}`;
}
