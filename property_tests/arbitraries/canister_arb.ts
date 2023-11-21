import fc from 'fast-check';
import { QueryMethodArb } from './query_method_arb';
import { Test } from '../../test';
import { TestSample } from './test_sample_arb';

export function CanisterArb(testArbs: fc.Arbitrary<TestSample>[]) {
    return fc
        .tuple(
            ...testArbs.map((testArb) =>
                fc.array(QueryMethodArb(testArb), {
                    minLength: 10,
                    maxLength: 30
                })
            )
        )
        .map((queriesMethods) => {
            const queryMethods = queriesMethods.flat(1);

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
                    queryMethods.reduce(
                        (acc, queryMethod) => {
                            return [...acc, ...queryMethod.imports];
                        },
                        ['Canister', 'query']
                    )
                )
            ].join();

            const tests: Test[] = queryMethods.map(
                (queryMethod) => queryMethod.test
            );

            return {
                sourceCode: `
    import { ${imports} } from 'azle';
    import { deepEqual } from 'fast-equals';
    // TODO solve the underlying principal problem https://github.com/demergent-labs/azle/issues/1443
    import { Principal as DfinityPrincipal } from '@dfinity/principal';

    ${candidTypeDeclarations}

    export default Canister({
        ${queryMethodSourceCodes.join(',\n    ')}
    });`,
                tests
            };
        });
}
