import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { StableBTreeMap } from '../../../arbitraries/stable_b_tree_map_arb';
import { getActor } from '../../../../property_tests';
import { Test } from '../../../../test';
import { UniqueIdentifierArb } from '../../../arbitraries/unique_identifier_arb';
import { QueryMethod } from '../../../arbitraries/canister_methods/query_method_arb';

export function GetTestArb(stableBTreeMap: StableBTreeMap) {
    return fc
        .tuple(UniqueIdentifierArb('stableBTreeMap'))
        .map(([functionName]): QueryMethod => {
            const imports = new Set([...stableBTreeMap.imports, 'Opt']);

            const paramCandidTypeObjects = [
                stableBTreeMap.keySample.src.candidTypeObject
            ].join(', ');

            const returnCandidTypeObject = `Opt(${stableBTreeMap.valueSample.src.candidTypeObject})`;
            const body = generateBody(stableBTreeMap.name);

            const tests = generateTests(
                functionName,
                stableBTreeMap.keySample.agentArgumentValue,
                stableBTreeMap.valueSample.agentArgumentValue
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
        return ${stableBTreeMapName}.get(param0);
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
                name: `get after first deploy ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/stable_b_tree_map/test');

                    const result = await actor[functionName](param0Value);

                    return {
                        Ok: deepEqual(result, [param1Value])
                    };
                }
            }
        ],
        [
            {
                name: `get after second deploy ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/stable_b_tree_map/test');

                    const result = await actor[functionName](param0Value);

                    return {
                        Ok: deepEqual(result, [param1Value])
                    };
                }
            }
        ],
        [
            {
                name: `get after third deploy ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/stable_b_tree_map/test');

                    const result = await actor[functionName](param0Value);

                    return {
                        Ok: deepEqual(result, [])
                    };
                }
            }
        ]
    ];
}
