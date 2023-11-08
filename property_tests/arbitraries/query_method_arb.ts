import fc from 'fast-check';
import { QueryMethodBlueprint } from './test_sample_arb';
import { Test } from '../../test';

export type QueryMethod = {
    imports: Set<string>;
    candidTypeDeclarations: string[] | undefined;
    sourceCode: string;
    tests: Test[];
};

export function QueryMethodArb(blueprint: fc.Arbitrary<Candid>) {
    return blueprint.map((blueprint): QueryMethod => {
        const {
            paramNames,
            paramCandidTypes,
            returnCandidType,
            body,
            functionName,
            tests,
            imports,
            candidTypeDeclarations
        } = blueprint;

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
