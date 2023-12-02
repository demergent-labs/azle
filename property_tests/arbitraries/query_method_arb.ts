import fc from 'fast-check';
import { Test } from '../../test';
import { UniqueIdentifierArb } from './unique_identifier_arb';
import { CorrespondingJSType } from './candid/corresponding_js_type';
import { CandidValueAndMeta } from './candid/candid_value_and_meta_arb';
import { Named } from '../';

export type QueryMethod = {
    imports: Set<string>;
    candidTypeDeclarations: string[] | undefined;
    sourceCode: string;
    tests: Test[];
};

export type BodyGenerator<
    ParamAgentArgumentValue extends CorrespondingJSType,
    ParamAgentResponseValue,
    ReturnTypeAgentArgumentValue extends CorrespondingJSType,
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
    ParamAgentArgumentValue extends CorrespondingJSType,
    ParamAgentResponseValue,
    ReturnTypeAgentArgumentValue extends CorrespondingJSType,
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
        // TODO: Consider adding a callback to determine the returnType
        // i.e. instead of using the first one if the params array isn't empty.
    }
) {
    return fc
        .tuple(
            UniqueIdentifierArb('canisterMethod'),
            paramTypeArrayArb,
            returnTypeArb
        )
        .map(([functionName, paramTypes, returnType]): QueryMethod => {
            const imports = new Set([
                ...paramTypes.flatMap((param) => [...param.src.imports]),
                ...returnType.src.imports
            ]);

            const candidTypeDeclarations = [
                ...paramTypes.flatMap(
                    (param) => param.src.typeAliasDeclarations
                ),
                ...returnType.src.typeAliasDeclarations
            ];

            const namedParams = paramTypes.map(
                <T>(param: T, index: number): Named<T> => ({
                    name: `param${index}`,
                    el: param
                })
            );

            const paramCandidTypes = paramTypes
                .map((param) => param.src.typeAnnotation)
                .join(', ');

            const returnCandidType = returnType.src.typeAnnotation;

            const paramNames = namedParams
                .map((namedParam) => namedParam.name)
                .join(', ');

            const body = constraints.generateBody(namedParams, returnType);
            const tests = constraints.generateTests(
                functionName,
                namedParams,
                returnType
            );

            return {
                imports,
                candidTypeDeclarations,
                sourceCode: `${functionName}: query([${paramCandidTypes}], ${returnCandidType}, (${paramNames}) => {
                    ${body}
                })`,
                tests
            };
        });
}
