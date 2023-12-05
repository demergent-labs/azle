import fc from 'fast-check';
import { QueryMethod } from './canister_methods/query_method_arb';
import { Test } from '../../test';
import { UpdateMethod } from './canister_methods/update_method_arb';

export type Canister = {
    sourceCode: string;
    tests: Test[];
};

export type CanisterConstraints = {
    queryMethods?: fc.Arbitrary<QueryMethod[]>;
    updateMethods?: fc.Arbitrary<UpdateMethod[]>;
};

// TODO: Update the signature to support init, pre/post upgrade, heartbeat, etc.
export function CanisterArb(constraints: CanisterConstraints) {
    return fc
        .tuple(
            constraints.queryMethods ?? fc.constant([]),
            constraints.updateMethods ?? fc.constant([])
        )
        .map(([queryMethods, updateMethods]): Canister => {
            const canisterMethods: (QueryMethod | UpdateMethod)[] = [
                ...queryMethods,
                ...updateMethods
            ];

            const sourceCode = generateSourceCode(canisterMethods);
            const tests = canisterMethods.flatMap(
                (canisterMethod) => canisterMethod.tests
            );

            return {
                sourceCode,
                tests
            };
        });
}

function generateSourceCode(canisterMethods: (UpdateMethod | QueryMethod)[]) {
    const imports = [
        ...new Set(
            canisterMethods.reduce(
                (acc, method) => {
                    return [...acc, ...method.imports];
                },
                ['Canister', 'query', 'update']
            )
        )
    ].join();

    const declarations = canisterMethods
        .flatMap((method) => method.globalDeclarations)
        .join('\n');

    const sourceCodes = canisterMethods.map((method) => method.sourceCode);

    return /*TS*/ `
        import { ${imports} } from 'azle';
        import { deepEqual } from 'fast-equals';
        // TODO solve the underlying principal problem https://github.com/demergent-labs/azle/issues/1443
        import { Principal as DfinityPrincipal } from '@dfinity/principal';

        ${declarations}

        export default Canister({
            ${sourceCodes.join(',\n    ')}
        });
    `;
}
