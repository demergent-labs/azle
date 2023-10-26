import fc from 'fast-check';
import { TestSample } from './canister_arb';

export function createQueryMethodArb(testArb: fc.Arbitrary<TestSample>) {
    return testArb.map((testSample) => {
        const {
            paramNames,
            paramCandidTypes,
            returnCandidType,
            body,
            functionName,
            test,
            imports,
            candidTypeDeclarations
        } = testSample;

        return {
            name: functionName,
            sourceCode: `${functionName}: query([${paramCandidTypes}], ${returnCandidType}, (${paramNames.join(
                ', '
            )}) => {
                    ${body}
                })`,
            test,
            imports,
            candidTypeDeclarations
        };
    });
}
