import fc from 'fast-check';

import { StableBTreeMap } from 'azle/property_tests/arbitraries/stable_b_tree_map_arb';
import { deepEqual, getActor } from 'azle/property_tests';
import { Test } from 'azle/test';
import { UniqueIdentifierArb } from 'azle/property_tests/arbitraries/unique_identifier_arb';
import { QueryMethod } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

export function ItemsTestArb(stableBTreeMap: StableBTreeMap) {
    return fc
        .tuple(UniqueIdentifierArb('stableBTreeMap'))
        .map(([functionName]): QueryMethod => {
            const imports = new Set([
                ...stableBTreeMap.imports,
                'Vec',
                'Tuple',
                'query'
            ]);

            const returnCandidTypeObject = `Vec(Tuple(${stableBTreeMap.keySample.src.candidTypeObject}, ${stableBTreeMap.valueSample.src.candidTypeObject}))`;
            const body = generateBody(stableBTreeMap.name);

            const tests = generateTests(
                functionName,
                stableBTreeMap.keySample.value.agentArgumentValue,
                stableBTreeMap.valueSample.value.agentArgumentValue
            );

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
        return ${stableBTreeMapName}.items();
    `;
}

function generateTests(
    functionName: string,
    keySampleAgentArgumentValue: StableBTreeMap['keySample']['value']['agentArgumentValue'],
    valueSampleAgentArgumentValue: StableBTreeMap['valueSample']['value']['agentArgumentValue']
): Test[][] {
    return [
        [
            {
                name: `items after first deploy ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(result, [
                            [
                                keySampleAgentArgumentValue,
                                valueSampleAgentArgumentValue
                            ]
                        ])
                    };
                }
            }
        ],
        [
            {
                name: `items after second deploy ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(result, [
                            [
                                keySampleAgentArgumentValue,
                                valueSampleAgentArgumentValue
                            ]
                        ])
                    };
                }
            }
        ],
        [
            {
                name: `items after third deploy ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(result, [])
                    };
                }
            }
        ]
    ];
}
