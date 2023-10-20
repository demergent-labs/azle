import fc from 'fast-check';
import { TestSample } from './canister_arb';

export function createQueryMethodArb(testArb: fc.Arbitrary<TestSample>) {
    return testArb.map((testSample) => {
        const paramNames = testSample.paramNames;
        const paramSamples = testSample.paramSamples;
        const paramCandidTypes = testSample.paramCandidTypes;
        const body = testSample.body;
        const functionName = testSample.functionName;

        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                return `if (${paramName} !== ${paramSamples[index]}n) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        return {
            name: functionName,
            sourceCode: `${functionName}: query([${paramCandidTypes}], nat, (${paramNames.join(
                ', '
            )}) => {
                    ${paramsCorrectlyOrdered}

                    ${body}
                })`,
            test: testSample.test
        };
    });
}
