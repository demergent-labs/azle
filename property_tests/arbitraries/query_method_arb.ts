import fc from 'fast-check';
import { Test } from '../../test';
import { UniqueIdentifierArb } from './unique_identifier_arb';
import { CandidType } from './candid/candid_type_arb';
import { Named } from '../';
import { CandidValueAndMeta } from './candid/candid_value_and_meta_arb';

export type QueryMethod = {
    imports: Set<string>;
    candidTypeDeclarations: string[] | undefined;
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
                ...paramTypes.map((param) => param.src.typeDeclaration ?? ''),
                returnType.src.typeDeclaration ?? ''
            ];

            const namedParams = paramTypes.map(
                <T>(param: T, index: number): Named<T> => ({
                    name: `param${index}`,
                    el: param
                })
            );

            const paramCandidTypes = paramTypes
                .map((param) => param.src.candidType)
                .join(', ');

            const returnCandidType = returnType.src.candidType;

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
