import { getActor } from 'azle/experimental/_internal/test/property';
import { CorrespondingJSType } from 'azle/experimental/_internal/test/property/arbitraries/candid/corresponding_js_type';
import { UpdateMethod } from 'azle/experimental/_internal/test/property/arbitraries/canister_methods/update_method_arb';
import { StableBTreeMap } from 'azle/experimental/_internal/test/property/arbitraries/stable_b_tree_map_arb';
import { UniqueIdentifierArb } from 'azle/experimental/_internal/test/property/arbitraries/unique_identifier_arb';
import {
    AzleResult,
    candidTestEquality,
    Test
} from 'azle/experimental/_internal/test/property/test';
import fc from 'fast-check';

export function GetTestArb(
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
                    'Opt',
                    'query',
                    'None',
                    'Some'
                ]);

                const paramTypeObjects = [
                    stableBTreeMap.keySample.src.typeObject
                ].join(', ');

                const returnTypeObject = `Opt(${stableBTreeMap.valueSample.src.typeObject})`;
                const valueTypeIsNull =
                    stableBTreeMap.valueSample.src.typeAnnotation === 'Null';
                const body = generateBody(stableBTreeMap.name, valueTypeIsNull);

                const tests = generateTests(
                    functionName,
                    stableBTreeMap.keySample.value.agentArgumentValue,
                    stableBTreeMap.valueSample.value.agentArgumentValue
                );

                return {
                    imports,
                    globalDeclarations: [],
                    sourceCode: `${functionName}: query([${paramTypeObjects}], ${returnTypeObject}, (param0) => {
                ${body}
            })`,
                    tests,
                    paramTypes: [stableBTreeMap.keySample],
                    methodName: functionName
                };
            }
        );
}

function generateBody(
    stableBTreeMapName: string,
    valueTypeIsNull: boolean
): string {
    return /*TS*/ `
        const result = ${stableBTreeMapName}.get(param0);
        const containsKey = ${stableBTreeMapName}.containsKey(param0); // For situations where the stored value is literally null
        if (result === null ${valueTypeIsNull ? '&& !containsKey' : ''}) {
            return None
        } else {
            return Some(result)
        }
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
                name: `get after first deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[
                        functionName.startsWith('"')
                            ? functionName.slice(1, -1)
                            : functionName
                    ](keySampleAgentArgumentValue);

                    return candidTestEquality(result, [
                        valueSampleAgentArgumentValue
                    ]);
                }
            }
        ],
        [
            {
                name: `get after second deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[
                        functionName.startsWith('"')
                            ? functionName.slice(1, -1)
                            : functionName
                    ](keySampleAgentArgumentValue);

                    return candidTestEquality(result, [
                        valueSampleAgentArgumentValue
                    ]);
                }
            }
        ],
        [
            {
                name: `get after third deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[
                        functionName.startsWith('"')
                            ? functionName.slice(1, -1)
                            : functionName
                    ](keySampleAgentArgumentValue);

                    return candidTestEquality(result, []);
                }
            }
        ]
    ];
}
