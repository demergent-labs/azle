import fc from 'fast-check';

import { CandidValueAndMeta } from '../candid/candid_value_and_meta_arb';
import { CandidReturnType } from '../candid/candid_return_type_arb';
import { CorrespondingJSType } from '../candid/corresponding_js_type';
import { UniqueIdentifierArb } from '../unique_identifier_arb';
import { Named } from '../..';
import {
    BodyGenerator,
    TestsGenerator,
    CallbackLocation,
    isDefined,
    generateCallback,
    CallbackLocationArb
} from '.';
import { Test } from '../../../test';

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
        callbackLocation?: CallbackLocation;
    }
) {
    return fc
        .tuple(
            UniqueIdentifierArb('canisterMethod'),
            paramTypeArrayArb,
            returnTypeArb,
            CallbackLocationArb,
            UniqueIdentifierArb('typeDeclaration')
            // TODO: This unique id would be better named globalScope or something
            // But needs to match the same scope as typeDeclarations so I'm using
            // that for now.
        )
        .map(
            ([
                functionName,
                paramTypes,
                returnType,
                defaultCallbackLocation,
                callbackName
            ]): QueryMethod => {
                const callbackLocation =
                    constraints.callbackLocation ?? defaultCallbackLocation;

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

                const callback = generateCallback(
                    namedParams,
                    returnType,
                    constraints.generateBody,
                    callbackLocation,
                    callbackName
                );

                const candidTypeDeclarations = [
                    ...paramTypes.flatMap(
                        (param) => param.src.variableAliasDeclarations
                    ),
                    ...returnType.src.variableAliasDeclarations
                ].filter(isDefined);

                const globalDeclarations =
                    callbackLocation === 'STANDALONE'
                        ? [...candidTypeDeclarations, callback]
                        : candidTypeDeclarations;

                const sourceCode = generateSourceCode(
                    functionName,
                    paramTypes,
                    returnType,
                    callbackLocation === 'STANDALONE' ? callbackName : callback
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
    callback: string
): string {
    const paramCandidTypeObjects = paramTypes
        .map((param) => param.src.candidTypeObject)
        .join(', ');

    const returnCandidTypeObject = returnType.src.candidTypeObject;

    return `${functionName}: query([${paramCandidTypeObjects}], ${returnCandidTypeObject}, ${callback})`;
}
