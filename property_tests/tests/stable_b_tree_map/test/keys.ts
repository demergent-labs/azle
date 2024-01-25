import fc from 'fast-check';

import { StableBTreeMap } from 'azle/property_tests/arbitraries/stable_b_tree_map_arb';
import { deepEqual, getActor } from 'azle/property_tests';
import { Test } from 'azle/test';
import { getArrayForCandidType, getArrayStringForCandidType } from './utils';
import { UniqueIdentifierArb } from 'azle/property_tests/arbitraries/unique_identifier_arb';
import { QueryMethod } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

export function KeysTestArb(stableBTreeMap: StableBTreeMap) {
    return fc
        .tuple(UniqueIdentifierArb('stableBTreeMap'))
        .map(([functionName]): QueryMethod => {
            const imports = new Set([
                ...stableBTreeMap.imports,
                'Vec',
                'query'
            ]);

            const returnCandidTypeObject = `Vec(${stableBTreeMap.keySample.src.candidTypeObject})`;
            const body = generateBody(
                stableBTreeMap.name,
                stableBTreeMap.keySample.src.candidTypeAnnotation
            );

            const tests = generateTests(functionName, stableBTreeMap.keySample);

            return {
                imports,
                globalDeclarations: [],
                sourceCode: `${functionName}: query([], ${returnCandidTypeObject}, () => {
                ${body}
            })`,
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
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(
                            getArrayForCandidType(
                                keySample.src.candidTypeAnnotation
                            ).from(result),
                            getArrayForCandidType(
                                keySample.src.candidTypeAnnotation
                            ).from([keySample.value.agentArgumentValue])
                        )
                    };
                }
            }
        ],
        [
            {
                name: `keys after second deploy ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(
                            getArrayForCandidType(
                                keySample.src.candidTypeAnnotation
                            ).from(result),
                            getArrayForCandidType(
                                keySample.src.candidTypeAnnotation
                            ).from([keySample.value.agentArgumentValue])
                        )
                    };
                }
            }
        ],
        [
            {
                name: `keys after third deploy ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(
                            getArrayForCandidType(
                                keySample.src.candidTypeAnnotation
                            ).from(result),
                            getArrayForCandidType(
                                keySample.src.candidTypeAnnotation
                            ).from([])
                        )
                    };
                }
            }
        ]
    ];
}
