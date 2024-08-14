import fc from 'fast-check';

import { Named } from '../..';
import { Test } from '../../test';
import { CandidValueAndMeta } from '../candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from '../candid/corresponding_js_type';
import { VoidArb } from '../candid/primitive/void';
import { Syntax } from '../types';
import { UniqueIdentifierArb } from '../unique_identifier_arb';
import {
    BodyGenerator,
    CallbackLocation,
    generateCallback,
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
        syntax: Syntax;
        callbackLocation?: CallbackLocation;
    }
): fc.Arbitrary<
    PostUpgradeMethod<ParamAgentArgumentValue, ParamAgentResponseValue>
> {
    return fc
        .tuple(
            UniqueIdentifierArb('canisterProperties'),
            paramTypeArrayArb,
            VoidArb(constraints.syntax),
            fc.constantFrom<CallbackLocation>('INLINE', 'STANDALONE'),
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
                defaultCallbackLocation,
                callbackName
            ]): PostUpgradeMethod<
                ParamAgentArgumentValue,
                ParamAgentResponseValue
            > => {
                const callbackLocation =
                    constraints.syntax === 'class'
                        ? 'INLINE'
                        : constraints.callbackLocation ??
                          defaultCallbackLocation;

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

                const callback = generateCallback(
                    namedParams,
                    returnType,
                    constraints.generateBody,
                    callbackLocation,
                    callbackName,
                    constraints.syntax
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
    callback: string,
    syntax: Syntax
): string {
    const paramCandidTypeObjects = paramTypes
        .map((param) => param.src.candidTypeObject)
        .join(', ');

    if (syntax === 'functional') {
        return `${functionName}: postUpgrade([${paramCandidTypeObjects}], ${callback})`;
    } else {
        return (
            `@postUpgrade([${paramCandidTypeObjects}])` +
            `\n` +
            `${functionName}${callback}`
        );
    }
}
