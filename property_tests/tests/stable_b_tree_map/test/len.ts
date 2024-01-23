import fc from 'fast-check';

import { StableBTreeMap } from 'azle/property_tests/arbitraries/stable_b_tree_map_arb';
import { deepEqual, getActor } from 'azle/property_tests';
import { Test } from 'azle/test';
import { UniqueIdentifierArb } from 'azle/property_tests/arbitraries/unique_identifier_arb';
import { QueryMethod } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

export function LenTestArb(stableBTreeMap: StableBTreeMap) {
    return fc
        .tuple(UniqueIdentifierArb('stableBTreeMap'))
        .map(([functionName]): QueryMethod => {
            const imports = new Set([
                ...stableBTreeMap.imports,
                'nat64',
                'query'
            ]);

            const returnCandidTypeObject = `nat64`;
            const body = generateBody(stableBTreeMap.name);

            const tests = generateTests(functionName);

            return {
                imports,
                globalDeclarations: [],
                sourceCode: `${functionName}: query([], ${returnCandidTypeObject}, () => {
                ${body}
            })`,
                tests
            };
        });
}

function generateBody(stableBTreeMapName: string): string {
    return `
        return ${stableBTreeMapName}.len();
    `;
}

function generateTests(functionName: string): Test[][] {
    return [
        [
            {
                name: `len after first deploy ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(result, 1n)
                    };
                }
            }
        ],
        [
            {
                name: `len after second deploy ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(result, 1n)
                    };
                }
            }
        ],
        [
            {
                name: `len after third deploy ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(result, 0n)
                    };
                }
            }
        ]
    ];
}
