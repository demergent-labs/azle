import fc from 'fast-check';
import { Test } from '../../test';
import { UniqueIdentifierArb } from './unique_identifier_arb';
import { CandidType } from './candid/candid_type_arb';
import { CandidMeta } from './candid/candid_arb';

export type Named<T> = {
    name: string;
    el: T;
};

export type QueryMethod = {
    imports: Set<string>;
    candidTypeDeclarations: string[] | undefined;
    sourceCode: string;
    tests: Test[];
};

export type BodyGenerator<
    ParamType extends CandidType,
    ReturnType extends CandidType
> = (
    namedParams: Named<CandidMeta<ParamType>>[],
    returnType: CandidMeta<ReturnType>
) => string;

export type TestsGenerator<
    ParamType extends CandidType,
    ReturnType extends CandidType
> = (
    methodName: string,
    namedParams: Named<CandidMeta<ParamType>>[],
    returnType: CandidMeta<ReturnType>
) => Test[];

export function QueryMethodArb<
    ParamType extends CandidType,
    ReturnType extends CandidType
>(
    paramTypeArrayArb: fc.Arbitrary<CandidMeta<ParamType>[]>,
    returnTypeArb: fc.Arbitrary<CandidMeta<ReturnType>>,
    constraints: {
        generateBody: BodyGenerator<ParamType, ReturnType>;
        generateTests: TestsGenerator<ParamType, ReturnType>;
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
