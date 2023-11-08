import fc from 'fast-check';
import { QueryMethod, QueryMethodArb } from './query_method_arb';
import { TestSample } from './test_sample_arb';

export function CanisterArb(testArb: fc.Arbitrary<TestSample>) {
    return fc
        .array(QueryMethodArb(testArb), {
            minLength: 20, // TODO work on these
            maxLength: 100
        })
        .map((queryMethods) => {
            const sourceCode = generateSourceCode(queryMethods);
            const tests = queryMethods.map((queryMethod) => queryMethod.test);

            return {
                sourceCode,
                tests
            };
        });
}

function generateSourceCode(queryMethods: QueryMethod[]) {
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

    const candidTypeDeclarations = queryMethods
        .map(
            (queryMethod) =>
                queryMethod.candidTypeDeclarations?.join('\n') ?? ''
        )
        .join('\n');

    const sourceCodes = queryMethods.map(
        (queryMethod) => queryMethod.sourceCode
    );

    return /*TS*/ `
        import { ${imports} } from 'azle';
        import { deepEqual } from 'fast-equals';
        // TODO solve the underlying principal problem https://github.com/demergent-labs/azle/issues/1443
        import { Principal as DfinityPrincipal } from '@dfinity/principal';

        ${candidTypeDeclarations}

        export default Canister({
            ${sourceCodes.join(',\n    ')}
        });
    `;
}
