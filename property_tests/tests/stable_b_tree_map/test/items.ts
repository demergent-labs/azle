import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { StableBTreeMap } from '../../../arbitraries/stable_b_tree_map_arb';
import { getActor } from '../../../../property_tests';
import { Test } from '../../../../test';
import { UniqueIdentifierArb } from '../../../arbitraries/unique_identifier_arb';
import { QueryMethod } from '../../../arbitraries/canister_methods/query_method_arb';

export function ItemsTestArb(stableBTreeMap: StableBTreeMap) {
    return fc
        .tuple(UniqueIdentifierArb('stableBTreeMap'))
        .map(([functionName]): QueryMethod => {
            const imports = new Set([
                ...stableBTreeMap.imports,
                'Vec',
                'Tuple'
            ]);

            const returnCandidTypeObject = `Vec(Tuple(${stableBTreeMap.keySample.src.candidTypeObject}, ${stableBTreeMap.valueSample.src.candidTypeObject}))`;
            const body = generateBody(stableBTreeMap.name);

            const tests = generateTests(
                functionName,
                stableBTreeMap.keySample.agentArgumentValue,
                stableBTreeMap.valueSample.agentArgumentValue
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
    param0Value: any,
    param1Value: any
): Test[][] {
    return [
        [
            {
                name: `items after first deploy ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/stable_b_tree_map/test');

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(result, [[param0Value, param1Value]])
                    };
                }
            }
        ],
        [
            {
                name: `items after second deploy ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/stable_b_tree_map/test');

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(result, [[param0Value, param1Value]])
                    };
                }
            }
        ],
        [
            {
                name: `items after third deploy ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/stable_b_tree_map/test');

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(result, [])
                    };
                }
            }
        ]
    ];
}
