import fc from 'fast-check';

import { CandidMeta } from '../candid/candid_arb';
import { CandidReturnType } from '../candid/candid_return_type_arb';
import { CandidType } from '../candid/candid_type_arb';
import { UniqueIdentifierArb } from '../unique_identifier_arb';
import { Test } from '../../../test';
import { Named } from '../..';

import {
    BodyGenerator,
    TestsGenerator,
    CallbackLocation,
    isDefined,
    generateCallback
} from '.';

export type UpdateMethod = {
    imports: Set<string>;
    globalDeclarations: string[];
    sourceCode: string;
    tests: Test[];
};

export function UpdateMethodArb<
    ParamAgentArgumentValue extends CandidType,
    ParamAgentResponseValue,
    ReturnTypeAgentArgumentValue extends CandidType,
    ReturnTypeAgentResponseValue
>(
    paramTypeArrayArb: fc.Arbitrary<
        CandidMeta<ParamAgentArgumentValue, ParamAgentResponseValue>[]
    >,
    returnTypeArb: fc.Arbitrary<
        CandidMeta<ReturnTypeAgentArgumentValue, ReturnTypeAgentResponseValue>
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
            fc.constantFrom(
                'INLINE',
                'STANDALONE'
            ) as fc.Arbitrary<CallbackLocation>,
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
            ]): UpdateMethod => {
                const callbackLocation =
                    constraints.callbackLocation ?? defaultCallbackLocation;

                const imports = new Set([
                    ...paramTypes.flatMap((param) => [...param.src.imports]),
                    ...returnType.src.imports
                ]);

                const namedParams = paramTypes.map(
                    <T>(param: T, index: number): Named<T> => ({
                        name: `param${index}`,
                        el: param
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
                    ...paramTypes.map((param) => param.src.typeDeclaration),
                    returnType.src.typeDeclaration
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
    ParamType extends CandidType,
    ParamAgentType,
    ReturnType extends CandidReturnType,
    ReturnAgentType
>(
    functionName: string,
    paramTypes: CandidMeta<ParamType, ParamAgentType>[],
    returnType: CandidMeta<ReturnType, ReturnAgentType>,
    callback: string
): string {
    const paramCandidTypes = paramTypes
        .map((param) => param.src.candidType)
        .join(', ');

    const returnCandidType = returnType.src.candidType;

    return `${functionName}: update([${paramCandidTypes}], ${returnCandidType}, ${callback})`;
}
