import { getActor } from 'azle/property_tests';
import { QueryMethod } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { StableBTreeMap } from 'azle/property_tests/arbitraries/stable_b_tree_map_arb';
import { UniqueIdentifierArb } from 'azle/property_tests/arbitraries/unique_identifier_arb';
import { AzleResult, Test, testEquality } from 'azle/property_tests/test';
import fc from 'fast-check';

export function IsEmptyTestArb(
    stableBTreeMap: StableBTreeMap
): fc.Arbitrary<QueryMethod> {
    return fc
        .tuple(UniqueIdentifierArb('canisterProperties'))
        .map(([functionName]): QueryMethod => {
            const imports = new Set([
                ...stableBTreeMap.imports,
                'IDL',
                'query'
            ]);

            const body = generateBody(stableBTreeMap.name);

            const tests = generateTests(functionName);

            return {
                imports,
                globalDeclarations: [],
                sourceCode: `@query([], IDL.Bool)
                ${functionName}() {
                ${body}
            }`,
                tests
            };
        });
}

function generateBody(stableBTreeMapName: string): string {
    return `
        return ${stableBTreeMapName}.isEmpty();
    `;
}

function generateTests(functionName: string): Test[][] {
    return [
        [
            {
                name: `isEmpty after first deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(result, true);
                }
            }
        ],
        [
            {
                name: `isEmpty after second deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(result, false);
                }
            }
        ],
        [
            {
                name: `isEmpty after third deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(result, true);
                }
            }
        ]
    ];
}
