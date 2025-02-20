import { getActor } from 'azle/experimental/_internal/test/property';
import { CorrespondingJSType } from 'azle/experimental/_internal/test/property/arbitraries/candid/corresponding_js_type';
import { UpdateMethod } from 'azle/experimental/_internal/test/property/arbitraries/canister_methods/update_method_arb';
import { StableBTreeMap } from 'azle/experimental/_internal/test/property/arbitraries/stable_b_tree_map_arb';
import { UniqueIdentifierArb } from 'azle/experimental/_internal/test/property/arbitraries/unique_identifier_arb';
import {
    AzleResult,
    Test,
    testEquality
} from 'azle/experimental/_internal/test/property/test';
import fc from 'fast-check';

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

                    const result =
                        await actor[
                            functionName.startsWith('"')
                                ? functionName.slice(1, -1)
                                : functionName
                        ]();

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

                    const result =
                        await actor[
                            functionName.startsWith('"')
                                ? functionName.slice(1, -1)
                                : functionName
                        ]();

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

                    const result =
                        await actor[
                            functionName.startsWith('"')
                                ? functionName.slice(1, -1)
                                : functionName
                        ]();

                    return testEquality(result, []);
                }
            }
        ]
    ];
}
