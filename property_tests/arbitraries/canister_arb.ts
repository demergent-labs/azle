import fc from 'fast-check';
import { createQueryMethodArb } from './query_method_arb';
import { Test } from '../../test';

export type TestSample = {
    functionName: string;
    imports: string[];
    paramCandidTypes: string;
    returnCandidType: string;
    paramNames: string[];
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

            const imports = [
                ...new Set(
                    queryMethods.reduce((acc, queryMethod) => {
                        return [...acc, ...queryMethod.imports];
                    }, [] as string[])
                )
            ];

            const tests: Test[] = queryMethods.map(
                (queryMethod) => queryMethod.test
            );

            return {
                sourceCode: `
    import { Canister, Recursive, query, ${imports.join(', ')} } from 'azle';

    const recOpt = Recursive(() => Opt(recOpt))

    export default Canister({
        ${queryMethodSourceCodes.join(',\n    ')}
    });`,
                tests
            };
        });
}
