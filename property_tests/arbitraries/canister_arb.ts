import fc from 'fast-check';
import { createQueryMethodArb } from './query_method_arb';
import { Test } from '../../test';

export function createCanisterArb(testName: string) {
    return fc.constant(0).map(() => {
        const queryMethods = fc.sample(createQueryMethodArb(testName), 100);

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
