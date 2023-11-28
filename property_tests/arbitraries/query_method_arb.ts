import fc from 'fast-check';

import { CandidReturnType } from './candid/candid_return_type_arb';
import { CandidType } from './candid/candid_type_arb';
import { UniqueIdentifierArb } from './unique_identifier_arb';
import { Test } from '../../test';
import { Named } from '../';
import { CandidValueAndMeta } from './candid/candid_arb';

export type QueryMethod = {
    imports: Set<string>;
    globalDeclarations: string[];
    sourceCode: string;
    tests: Test[];
};

export type BodyGenerator<
    ParamAgentArgumentValue extends CandidType,
    ParamAgentResponseValue,
    ReturnTypeAgentArgumentValue extends CandidType,
    ReturnTypeAgentResponseValue
> = (
    namedParams: Named<
        CandidValueAndMeta<ParamAgentArgumentValue, ParamAgentResponseValue>
    >[],
    returnType: CandidValueAndMeta<
        ReturnTypeAgentArgumentValue,
        ReturnTypeAgentResponseValue
    >
) => string;

export type TestsGenerator<
    ParamAgentArgumentValue extends CandidType,
    ParamAgentResponseValue,
    ReturnTypeAgentArgumentValue extends CandidType,
    ReturnTypeAgentResponseValue
> = (
    methodName: string,
    namedParams: Named<
        CandidValueAndMeta<ParamAgentArgumentValue, ParamAgentResponseValue>
    >[],
    returnType: CandidValueAndMeta<
        ReturnTypeAgentArgumentValue,
        ReturnTypeAgentResponseValue
    >
) => Test[];

export type CallbackLocation = 'INLINE' | 'STANDALONE';

export function QueryMethodArb<
    ParamAgentArgumentValue extends CandidType,
    ParamAgentResponseValue,
    ReturnTypeAgentArgumentValue extends CandidType,
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
            ]): QueryMethod => {
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

function isDefined<T>(value: T | undefined): value is T {
    return value !== undefined;
}

function generateCallback<
    ParamType extends CandidType,
    ParamAgentType,
    ReturnType extends CandidReturnType,
    ReturnAgentType
>(
    namedParams: Named<CandidValueAndMeta<ParamType, ParamAgentType>>[],
    returnType: CandidValueAndMeta<ReturnType, ReturnAgentType>,
    generateBody: BodyGenerator<
        ParamType,
        ParamAgentType,
        ReturnType,
        ReturnAgentType
    >,
    callbackLocation: CallbackLocation,
    callbackName: string
): string {
    const paramNames = namedParams
        .map((namedParam) => namedParam.name)
        .join(', ');

    const body = generateBody(namedParams, returnType);

    if (callbackLocation === 'INLINE') {
        return `(${paramNames}) => {${body}}`;
    }

    const paramNamesAndTypes = namedParams
        .map((namedParam) => `${namedParam.name}: any`) // TODO: Use actual candid type, not any
        .join(', ');

    return `function ${callbackName}(${paramNamesAndTypes}): any {${body}}`; // TODO: Use actual candid type, not any
}

function generateSourceCode<
    ParamType extends CandidType,
    ParamAgentType,
    ReturnType extends CandidReturnType,
    ReturnAgentType
>(
    functionName: string,
    paramTypes: CandidValueAndMeta<ParamType, ParamAgentType>[],
    returnType: CandidValueAndMeta<ReturnType, ReturnAgentType>,
    callback: string
): string {
    const paramCandidTypes = paramTypes
        .map((param) => param.src.candidType)
        .join(', ');

    const returnCandidType = returnType.src.candidType;

    return `${functionName}: query([${paramCandidTypes}], ${returnCandidType}, ${callback})`;
}
