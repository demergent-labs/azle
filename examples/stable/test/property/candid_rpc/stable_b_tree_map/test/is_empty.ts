import { getActor } from 'azle/test/property';
import { CorrespondingJSType } from 'azle/test/property/arbitraries/candid/corresponding_js_type';
import { UpdateMethod } from 'azle/test/property/arbitraries/canister_methods/update_method_arb';
import { StableBTreeMap } from 'azle/test/property/arbitraries/stable_b_tree_map_arb';
import { UniqueIdentifierArb } from 'azle/test/property/arbitraries/unique_identifier_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';
import fc from 'fast-check';

export function IsEmptyTestArb(
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

                const body = generateBody(stableBTreeMap.name);

                const tests = generateTests(functionName);

                return {
                    imports,
                    globalDeclarations: [],
                    sourceCode: `@query([], IDL.Bool)
                ${functionName}(): boolean {
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
        return ${stableBTreeMapName}.isEmpty();
    `;
}

function generateTests(functionName: string): Test[][] {
    return [
        [
            {
                name: `isEmpty after first deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(result, true);
                }
            }
        ],
        [
            {
                name: `isEmpty after second deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(result, false);
                }
            }
        ],
        [
            {
                name: `isEmpty after third deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(result, true);
                }
            }
        ]
    ];
}
