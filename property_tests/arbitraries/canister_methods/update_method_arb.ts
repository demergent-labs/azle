import fc from 'fast-check';

import { Named } from '../..';
import { Test } from '../../test';
import { CandidReturnType } from '../candid/candid_return_type_arb';
import { CandidValueAndMeta } from '../candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from '../candid/corresponding_js_type';
import { Syntax } from '../types';
import { UniqueIdentifierArb } from '../unique_identifier_arb';
import {
    BodyGenerator,
    CallbackLocation,
    generateCallback,
    isDefined,
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
        syntax: Syntax;
        callbackLocation?: CallbackLocation;
        name?: string;
    }
): fc.Arbitrary<UpdateMethod> {
    return fc
        .tuple(
            UniqueIdentifierArb('canisterProperties'),
            paramTypeArrayArb,
            returnTypeArb,
            fc.constantFrom<CallbackLocation>('INLINE', 'STANDALONE'),
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
                defaultCallbackLocation,
                callbackName
            ]): UpdateMethod => {
                const callbackLocation =
                    constraints.syntax === 'class'
                        ? 'INLINE'
                        : constraints.callbackLocation ??
                          defaultCallbackLocation;
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

                const callback = generateCallback(
                    namedParams,
                    returnType,
                    constraints.generateBody,
                    callbackLocation,
                    callbackName,
                    constraints.syntax
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
                    callbackLocation === 'STANDALONE' ? callbackName : callback,
                    constraints.syntax
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
    callback: string,
    syntax: Syntax
): string {
    const paramCandidTypeObjects = paramTypes
        .map((param) => param.src.candidTypeObject)
        .join(', ');

    const returnCandidTypeObject = returnType.src.candidTypeObject;

    if (syntax === 'functional') {
        return `${functionName}: update([${paramCandidTypeObjects}], ${returnCandidTypeObject}, ${callback})`;
    } else {
        return (
            `@update([${paramCandidTypeObjects}], ${returnCandidTypeObject})` +
            `\n` +
            `${functionName}${callback}`
        );
    }
}
