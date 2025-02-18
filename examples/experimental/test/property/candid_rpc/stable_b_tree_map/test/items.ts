import { getActor } from 'azle/test/property';
import { StableBTreeMap } from 'azle/test/property/arbitraries/stable_b_tree_map_arb';
import { UniqueIdentifierArb } from 'azle/test/property/arbitraries/unique_identifier_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';
import fc from 'fast-check';

import { UpdateMethod } from '../../../../../../../test/property/arbitraries/canister_methods/update_method_arb';

export function ItemsTestArb(
    stableBTreeMap: StableBTreeMap
): fc.Arbitrary<UpdateMethod<any, any>> {
    return fc
        .tuple(UniqueIdentifierArb('canisterProperties'))
        .map(([functionName]): UpdateMethod<any, any> => {
            const imports = new Set([
                ...stableBTreeMap.imports,
                'Vec',
                'Tuple',
                'query'
            ]);

            const returnTypeObject = `Vec(Tuple(${stableBTreeMap.keySample.src.typeObject}, ${stableBTreeMap.valueSample.src.typeObject}))`;
            const body = generateBody(stableBTreeMap.name);

            const tests = generateTests(
                functionName,
                stableBTreeMap.keySample.value.agentArgumentValue,
                stableBTreeMap.valueSample.value.agentArgumentValue
            );

            return {
                imports,
                globalDeclarations: [],
                sourceCode: `${functionName}: query([], ${returnTypeObject}, () => {
                ${body}
            })`,
                tests,
                paramTypes: [],
                methodName: functionName
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
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(result, [
                        [
                            keySampleAgentArgumentValue,
                            valueSampleAgentArgumentValue
                        ]
                    ]);
                }
            }
        ],
        [
            {
                name: `items after second deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(result, [
                        [
                            keySampleAgentArgumentValue,
                            valueSampleAgentArgumentValue
                        ]
                    ]);
                }
            }
        ],
        [
            {
                name: `items after third deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(result, []);
                }
            }
        ]
    ];
}
