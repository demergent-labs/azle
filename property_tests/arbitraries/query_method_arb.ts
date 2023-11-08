import fc from 'fast-check';
import { Test } from '../../test';
import { UniqueIdentifierArb } from './unique_identifier_arb';
import { CandidType } from './candid/candid_type_arb';
import { CandidMeta } from './candid/candid_arb';

export type QueryMethod = {
    imports: Set<string>;
    candidTypeDeclarations: string[] | undefined;
    sourceCode: string;
    tests: Test[];
};

export function QueryMethodArb<
    ParamType extends CandidType,
    ReturnType extends CandidType
>(
    paramTypeArrayArb: fc.Arbitrary<CandidMeta<ParamType>[]>,
    returnTypeArb: fc.Arbitrary<CandidMeta<ReturnType>>,
    constraints: {
        generateBody: (
            // TODO: Consider combining params and paramNames into Named<CandidMeta<ParamType>>
            paramNames: string[],
            params: CandidMeta<ParamType>[],
            defaultReturnType: CandidMeta<ReturnType>
        ) => string;
        generateTests: (
            methodName: string,
            params: CandidMeta<ParamType>[],
            defaultReturnType: CandidMeta<ReturnType>
        ) => Test[];
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
        .map(([functionName, paramTypes, defaultReturnType]): QueryMethod => {
            const imports = new Set([
                ...paramTypes.flatMap((param) => [...param.src.imports]),
                ...defaultReturnType.src.imports
            ]);

            const candidTypeDeclarations = [
                ...paramTypes.map((param) => param.src.typeDeclaration ?? ''),
                defaultReturnType.src.typeDeclaration ?? ''
            ];

            const paramNames = paramTypes.map((_, index) => `param${index}`);

            const paramCandidTypes = paramTypes
                .map((param) => param.src.candidType)
                .join(', ');

            const returnCandidType =
                paramTypes[0]?.src?.candidType ??
                defaultReturnType.src.candidType;

            const body = constraints.generateBody(
                paramNames,
                paramTypes,
                defaultReturnType
            );
            const tests = constraints.generateTests(
                functionName,
                paramTypes,
                defaultReturnType
            );

            return {
                imports,
                candidTypeDeclarations,
                sourceCode: `${functionName}: query([${paramCandidTypes}], ${returnCandidType}, (${paramNames.join(
                    ', '
                )}) => {
                    ${body}
                })`,
                tests
            };
        });
}
