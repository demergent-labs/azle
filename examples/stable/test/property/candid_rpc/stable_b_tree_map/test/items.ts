import { getActor } from 'azle/test/property';
import { StableBTreeMap } from 'azle/test/property/arbitraries/stable_b_tree_map_arb';
import { UniqueIdentifierArb } from 'azle/test/property/arbitraries/unique_identifier_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';
import fc from 'fast-check';

import { CorrespondingJSType } from '../../../../../../../test/property/arbitraries/candid/corresponding_js_type';
import { UpdateMethod } from '../../../../../../../test/property/arbitraries/canister_methods/update_method_arb';

export function ItemsTestArb(
    stableBTreeMap: StableBTreeMap
): fc.Arbitrary<UpdateMethod<CorrespondingJSType, CorrespondingJSType>> {
    return fc
        .tuple(UniqueIdentifierArb('canisterProperties'))
        .map(
            ([functionName]): UpdateMethod<
                CorrespondingJSType,
                CorrespondingJSType
            > => {
                const imports = new Set([
                    ...stableBTreeMap.imports,
                    'IDL',
                    'query'
                ]);

                const returnTypeObject = `IDL.Vec(IDL.Tuple(${stableBTreeMap.keySample.src.typeObject}, ${stableBTreeMap.valueSample.src.typeObject}))`;
                const returnTypeAnnotation = `[${stableBTreeMap.keySample.src.typeAnnotation}, ${stableBTreeMap.valueSample.src.typeAnnotation}][]`;
                const body = generateBody(stableBTreeMap.name);

                const tests = generateTests(
                    functionName,
                    stableBTreeMap.keySample.value.agentArgumentValue,
                    stableBTreeMap.valueSample.value.agentArgumentValue
                );

                return {
                    imports,
                    globalDeclarations: [],
                    sourceCode: `@query([], ${returnTypeObject})
                ${functionName}(): ${returnTypeAnnotation} {
                ${body}
            }`,
                    tests,
                    paramTypes: [],
                    methodName: functionName
                };
            }
        );
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
