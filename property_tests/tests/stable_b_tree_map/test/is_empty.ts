import fc from 'fast-check';

import { StableBTreeMap } from 'azle/property_tests/arbitraries/stable_b_tree_map_arb';
import { deepEqual, getActor } from 'azle/property_tests';
import { Test } from 'azle/test';
import { UniqueIdentifierArb } from 'azle/property_tests/arbitraries/unique_identifier_arb';
import { QueryMethod } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

export function IsEmptyTestArb(stableBTreeMap: StableBTreeMap) {
    return fc
        .tuple(UniqueIdentifierArb('canisterProperties'))
        .map(([functionName]): QueryMethod => {
            const imports = new Set([
                ...stableBTreeMap.imports,
                'bool',
                'query'
            ]);

            const body = generateBody(stableBTreeMap.name);

            const tests = generateTests(functionName);

            return {
                imports,
                globalDeclarations: [],
                sourceCode: `${functionName}: query([], bool, () => {
                ${body}
            })`,
                tests
            };
        });
}

function generateBody(stableBTreeMapName: string): string {
    return `
        return ${stableBTreeMapName}.isEmpty();
    `;
}

function generateTests(functionName: string): Test[][] {
    return [
        [
            {
                name: `isEmpty after first deploy ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(result, true)
                    };
                }
            }
        ],
        [
            {
                name: `isEmpty after second deploy ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(result, false)
                    };
                }
            }
        ],
        [
            {
                name: `isEmpty after third deploy ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(result, true)
                    };
                }
            }
        ]
    ];
}
