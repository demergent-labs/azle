import fc from 'fast-check';

import { CandidValueAndMeta } from '../candid/candid_value_and_meta_arb';
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
import { VoidArb } from '../candid/primitive/void';

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
        callbackLocation?: CallbackLocation;
    }
): fc.Arbitrary<InitMethod<ParamAgentArgumentValue, ParamAgentResponseValue>> {
    return fc
        .tuple(
            UniqueIdentifierArb('canisterMethod'),
            paramTypeArrayArb,
            VoidArb(),
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
            ]): InitMethod<
                ParamAgentArgumentValue,
                ParamAgentResponseValue
            > => {
                const callbackLocation =
                    constraints.callbackLocation ?? defaultCallbackLocation;

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

                const callback = generateCallback(
                    namedParams,
                    returnType,
                    constraints.generateBody,
                    callbackLocation,
                    callbackName
                );

                const variableAliasDeclarations = paramTypes
                    .flatMap((param) => param.src.variableAliasDeclarations)
                    .filter(isDefined);

                const globalDeclarations =
                    callbackLocation === 'STANDALONE'
                        ? [...variableAliasDeclarations, callback]
                        : variableAliasDeclarations;

                const sourceCode = generateSourceCode(
                    functionName,
                    paramTypes,
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
    callback: string
): string {
    const paramCandidTypeObjects = paramTypes
        .map((param) => param.src.candidTypeObject)
        .join(', ');

    return `${functionName}: init([${paramCandidTypeObjects}], ${callback})`;
}
