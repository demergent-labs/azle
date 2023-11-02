import fc from 'fast-check';
import { QueryMethodArb } from './query_method_arb';
import { Test } from '../../test';
import { TestSample } from './test_sample_arb';

export function CanisterArb(testArb: fc.Arbitrary<TestSample>) {
    return fc
        .array(QueryMethodArb(testArb), {
            minLength: 20, // TODO work on these
            maxLength: 100
        })
        .map((queryMethods) => {
            const queryMethodSourceCodes = queryMethods.map(
                (queryMethod) => queryMethod.sourceCode
            );

            const candidTypeDeclarations = queryMethods
                .map(
                    (queryMethod) =>
                        queryMethod.candidTypeDeclarations?.join('\n') ?? ''
                )
                .join('\n');

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
    import { Canister, query, ${imports.join(', ')} } from 'azle';

    ${candidTypeDeclarations}

    export default Canister({
        ${queryMethodSourceCodes.join(',\n    ')}
    });`,
                tests
            };
        });
}
