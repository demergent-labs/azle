import { getActor } from 'azle/test/property';
import { QueryMethod } from 'azle/test/property/arbitraries/canister_methods/query_method_arb';
import { StableBTreeMap } from 'azle/test/property/arbitraries/stable_b_tree_map_arb';
import { UniqueIdentifierArb } from 'azle/test/property/arbitraries/unique_identifier_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';
import fc from 'fast-check';

export function RemoveTestArb(
    stableBTreeMap: StableBTreeMap
): fc.Arbitrary<QueryMethod> {
    return fc
        .tuple(UniqueIdentifierArb('canisterProperties'))
        .map(([functionName]): QueryMethod => {
            const imports = new Set([
                ...stableBTreeMap.imports,
                'Opt',
                'update',
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
                sourceCode: `${functionName}: update([${paramTypeObjects}], ${returnTypeObject}, (param0) => {
                ${body}
            })`,
                tests
            };
        });
}

function generateBody(
    stableBTreeMapName: string,
    valueTypeIsNull: boolean
): string {
    return /*TS*/ `
        const containsKey = ${stableBTreeMapName}.containsKey(param0); // For situations where the stored value is literally null
        const result = ${stableBTreeMapName}.remove(param0);
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
        [],
        [
            {
                name: `remove after second deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](
                        keySampleAgentArgumentValue
                    );

                    return testEquality(result, [
                        valueSampleAgentArgumentValue
                    ]);
                }
            }
        ]
    ];
}
