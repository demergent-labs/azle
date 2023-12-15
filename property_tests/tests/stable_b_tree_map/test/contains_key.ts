import fc from 'fast-check';

import { deepEqual, getActor } from 'azle/property_tests';
import { Test } from 'azle/test';
import { UniqueIdentifierArb } from 'azle/property_tests/arbitraries/unique_identifier_arb';
import { QueryMethod } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { StableBTreeMap } from 'azle/property_tests/arbitraries/stable_b_tree_map_arb';

export function ContainsKeyTestArb(stableBTreeMap: StableBTreeMap) {
    return fc
        .tuple(UniqueIdentifierArb('stableBTreeMap'))
        .map(([functionName]): QueryMethod => {
            const imports = new Set([
                ...stableBTreeMap.imports,
                'bool',
                'query'
            ]);

            const paramCandidTypeObjects = [
                stableBTreeMap.keySample.src.candidTypeObject
            ].join(', ');

            const returnCandidTypeObject = `bool`;
            const body = generateBody(stableBTreeMap.name);
            const tests = generateTests(
                functionName,
                stableBTreeMap.keySample.value.agentArgumentValue
            );

            return {
                imports,
                globalDeclarations: [],
                sourceCode: `${functionName}: query([${paramCandidTypeObjects}], ${returnCandidTypeObject}, (param0) => {
                ${body}
            })`,
                tests
            };
        });
}

function generateBody(stableBTreeMapName: string): string {
    return `
        return ${stableBTreeMapName}.containsKey(param0);
    `;
}

function generateTests(
    functionName: string,
    keySampleAgentArgumentValue: StableBTreeMap['keySample']['value']['agentArgumentValue']
): Test[][] {
    return [
        [
            {
                name: `containsKey after first deploy ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](
                        keySampleAgentArgumentValue
                    );

                    return {
                        Ok: deepEqual(result, true)
                    };
                }
            }
        ],
        [
            {
                name: `containsKey after second deploy ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](
                        keySampleAgentArgumentValue
                    );

                    return {
                        Ok: deepEqual(result, true)
                    };
                }
            }
        ],
        [
            {
                name: `containsKey after third deploy ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](
                        keySampleAgentArgumentValue
                    );

                    return {
                        Ok: deepEqual(result, false)
                    };
                }
            }
        ]
    ];
}
