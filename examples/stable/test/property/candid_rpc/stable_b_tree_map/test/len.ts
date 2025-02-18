import { getActor } from 'azle/test/property';
import { StableBTreeMap } from 'azle/test/property/arbitraries/stable_b_tree_map_arb';
import { UniqueIdentifierArb } from 'azle/test/property/arbitraries/unique_identifier_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';
import fc from 'fast-check';

import { CorrespondingJSType } from '../../../../../../../test/property/arbitraries/candid/corresponding_js_type';
import { UpdateMethod } from '../../../../../../../test/property/arbitraries/canister_methods/update_method_arb';

export function LenTestArb(
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

                const returnTypeObject = `IDL.Nat64`;
                const returnTypeAnnotation = `bigint`;
                const body = generateBody(stableBTreeMap.name);

                const tests = generateTests(functionName);

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
        return ${stableBTreeMapName}.len();
    `;
}

function generateTests(functionName: string): Test[][] {
    return [
        [
            {
                name: `len after first deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(result, 1n);
                }
            }
        ],
        [
            {
                name: `len after second deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(result, 1n);
                }
            }
        ],
        [
            {
                name: `len after third deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(result, 0n);
                }
            }
        ]
    ];
}
