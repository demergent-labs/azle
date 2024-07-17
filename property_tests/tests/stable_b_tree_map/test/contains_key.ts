import { getActor } from 'azle/property_tests';
import { QueryMethod } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { StableBTreeMap } from 'azle/property_tests/arbitraries/stable_b_tree_map_arb';
import { UniqueIdentifierArb } from 'azle/property_tests/arbitraries/unique_identifier_arb';
import { AzleResult, Test, testEquality } from 'azle/property_tests/test';
import fc from 'fast-check';

export function ContainsKeyTestArb(
    stableBTreeMap: StableBTreeMap
): fc.Arbitrary<QueryMethod> {
    return fc
        .tuple(UniqueIdentifierArb('canisterProperties'))
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
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](
                        keySampleAgentArgumentValue
                    );

                    return testEquality(result, true);
                }
            }
        ],
        [
            {
                name: `containsKey after second deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](
                        keySampleAgentArgumentValue
                    );

                    return testEquality(result, true);
                }
            }
        ],
        [
            {
                name: `containsKey after third deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](
                        keySampleAgentArgumentValue
                    );

                    return testEquality(result, false);
                }
            }
        ]
    ];
}
