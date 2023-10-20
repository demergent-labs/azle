import fc from 'fast-check';
import { TestSample } from './canister_arb';

export function createQueryMethodArb(testArb: fc.Arbitrary<TestSample>) {
    return testArb.map((testSample) => {
        const paramNames = testSample.paramNames;
        const paramSamples = testSample.paramSamples;
        const paramCandidTypes = testSample.paramCandidTypes;
        const returnCandidType = testSample.returnCandidType;
        const body = testSample.body;
        const functionName = testSample.functionName;

        return {
            name: functionName,
            sourceCode: `${functionName}: query([${paramCandidTypes}], ${returnCandidType}, (${paramNames.join(
                ', '
            )}) => {
                    ${body}
                })`,
            test: testSample.test,
            imports: testSample.imports
        };
    });
}
