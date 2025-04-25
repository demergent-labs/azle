import { getActor } from 'azle/experimental/_internal/test/property';
import { CorrespondingJSType } from 'azle/experimental/_internal/test/property/arbitraries/candid/corresponding_js_type';
import { UpdateMethod } from 'azle/experimental/_internal/test/property/arbitraries/canister_methods/update_method_arb';
import { StableBTreeMap } from 'azle/experimental/_internal/test/property/arbitraries/stable_b_tree_map_arb';
import { UniqueIdentifierArb } from 'azle/experimental/_internal/test/property/arbitraries/unique_identifier_arb';
import {
    AzleResult,
    candidTestEquality,
    Test} from 'azle/experimental/_internal/test/property/test';
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
                    'bool',
                    'query'
                ]);

                const body = generateBody(stableBTreeMap.name);

                const tests = generateTests(functionName);

                return {
                    imports,
                    globalDeclarations: [],
                    sourceCode: `${functionName}: query([], bool, () => {
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

                    const result =
                        await actor[
                            functionName.startsWith('"')
                                ? functionName.slice(1, -1)
                                : functionName
                        ]();

                    return candidTestEquality(result, true);
                }
            }
        ],
        [
            {
                name: `isEmpty after second deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result =
                        await actor[
                            functionName.startsWith('"')
                                ? functionName.slice(1, -1)
                                : functionName
                        ]();

                    return candidTestEquality(result, false);
                }
            }
        ],
        [
            {
                name: `isEmpty after third deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result =
                        await actor[
                            functionName.startsWith('"')
                                ? functionName.slice(1, -1)
                                : functionName
                        ]();

                    return candidTestEquality(result, true);
                }
            }
        ]
    ];
}
