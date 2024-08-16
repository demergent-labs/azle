import { getActor } from 'azle/property_tests';
import { QueryMethod } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { StableBTreeMap } from 'azle/property_tests/arbitraries/stable_b_tree_map_arb';
import { UniqueIdentifierArb } from 'azle/property_tests/arbitraries/unique_identifier_arb';
import { AzleResult, Test, testEquality } from 'azle/property_tests/test';
import fc from 'fast-check';

import { getArrayForCandidType, getArrayStringForCandidType } from './utils';

export function KeysTestArb(
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

            const returnCandidTypeObject = `IDL.Vec(${stableBTreeMap.keySample.src.candidTypeObject})`;
            const body = generateBody(
                stableBTreeMap.name,
                stableBTreeMap.keySample.src.candidTypeAnnotation
            );

            const tests = generateTests(functionName, stableBTreeMap.keySample);

            return {
                imports,
                globalDeclarations: [],
                sourceCode: `@query([], ${returnCandidTypeObject})
                ${functionName}() {
                ${body}
            }`,
                tests
            };
        });
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
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(
                        getArrayForCandidType(
                            keySample.src.candidTypeAnnotation
                        ).from(result),
                        getArrayForCandidType(
                            keySample.src.candidTypeAnnotation
                        ).from([keySample.value.agentArgumentValue])
                    );
                }
            }
        ],
        [
            {
                name: `keys after second deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(
                        getArrayForCandidType(
                            keySample.src.candidTypeAnnotation
                        ).from(result),
                        getArrayForCandidType(
                            keySample.src.candidTypeAnnotation
                        ).from([keySample.value.agentArgumentValue])
                    );
                }
            }
        ],
        [
            {
                name: `keys after third deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(
                        getArrayForCandidType(
                            keySample.src.candidTypeAnnotation
                        ).from(result),
                        getArrayForCandidType(
                            keySample.src.candidTypeAnnotation
                        ).from([])
                    );
                }
            }
        ]
    ];
}
