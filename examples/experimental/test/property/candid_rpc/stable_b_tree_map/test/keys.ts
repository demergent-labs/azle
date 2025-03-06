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

import { getArrayForCandidType, getArrayStringForCandidType } from './utils';

export function KeysTestArb(
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
                    'query'
                ]);

                const returnTypeObject = `Vec(${stableBTreeMap.keySample.src.typeObject})`;
                const body = generateBody(
                    stableBTreeMap.name,
                    stableBTreeMap.keySample.src.typeAnnotation
                );

                const tests = generateTests(
                    functionName,
                    stableBTreeMap.keySample
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

function generateBody(
    stableBTreeMapName: string,
    stableBTreeMapKeyCandidTypeAnnotation: string
): string {
    return `
        return ${getArrayStringForCandidType(
            stableBTreeMapKeyCandidTypeAnnotation
        )}(${stableBTreeMapName}.keys());
    `;
}

function generateTests(
    functionName: string,
    keySample: StableBTreeMap['keySample']
): Test[][] {
    return [
        [
            {
                name: `keys after first deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(
                        getArrayForCandidType(
                            keySample.src.typeAnnotation
                        ).from(result),
                        getArrayForCandidType(
                            keySample.src.typeAnnotation
                        ).from([keySample.value.agentArgumentValue])
                    );
                }
            }
        ],
        [
            {
                name: `keys after second deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(
                        getArrayForCandidType(
                            keySample.src.typeAnnotation
                        ).from(result),
                        getArrayForCandidType(
                            keySample.src.typeAnnotation
                        ).from([keySample.value.agentArgumentValue])
                    );
                }
            }
        ],
        [
            {
                name: `keys after third deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(
                        getArrayForCandidType(
                            keySample.src.typeAnnotation
                        ).from(result),
                        getArrayForCandidType(
                            keySample.src.typeAnnotation
                        ).from([])
                    );
                }
            }
        ]
    ];
}
