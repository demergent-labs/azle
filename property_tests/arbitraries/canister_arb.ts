import fc from 'fast-check';
import { createQueryMethodArb } from './query_method_arb';
import { Test } from '../../test';

export type TestSample = {
    functionName: string;
    paramCandidTypes: string;
    paramNames: string[];
    paramSamples: any[];
    body: string;
    test: any;
};

export function createCanisterArb(testArb: fc.Arbitrary<TestSample>) {
    return fc
        .array(createQueryMethodArb(testArb), {
            minLength: 20, // TODO work on these
            maxLength: 100
        })
        .map((queryMethods) => {
            const queryMethodSourceCodes = queryMethods.map(
                (queryMethod) => queryMethod.sourceCode
            );

            const tests: Test[] = queryMethods.map(
                (queryMethod) => queryMethod.test
            );

            return {
                sourceCode: `
    import { Canister, nat, query } from 'azle';
    
    export default Canister({
        ${queryMethodSourceCodes.join(',\n    ')}
    });`,
                tests
            };
        });
}
