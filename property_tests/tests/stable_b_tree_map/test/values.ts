import fc from 'fast-check';

import { StableBTreeMap } from 'azle/property_tests/arbitraries/stable_b_tree_map_arb';
import { deepEqual, getActor } from 'azle/property_tests';
import { Test } from 'azle/test';
import { getArrayForCandidType, getArrayStringForCandidType } from './utils';
import { UniqueIdentifierArb } from 'azle/property_tests/arbitraries/unique_identifier_arb';
import { QueryMethod } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

export function ValuesTestArb(stableBTreeMap: StableBTreeMap) {
    return fc
        .tuple(UniqueIdentifierArb('canisterProperties'))
        .map(([functionName]): QueryMethod => {
            const imports = new Set([
                ...stableBTreeMap.imports,
                'Vec',
                'query'
            ]);

            const returnCandidTypeObject = `Vec(${stableBTreeMap.valueSample.src.candidTypeObject})`;
            const body = generateBody(
                stableBTreeMap.name,
                stableBTreeMap.valueSample.src.candidTypeAnnotation
            );

            const tests = generateTests(
                functionName,
                stableBTreeMap.valueSample
            );

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
    stableBTreeMapValueCandidTypeAnnotation: string
): string {
    return `
        return ${getArrayStringForCandidType(
            stableBTreeMapValueCandidTypeAnnotation
        )}(${stableBTreeMapName}.values());
    `;
}

function generateTests(
    functionName: string,
    valueSample: StableBTreeMap['valueSample']
): Test[][] {
    return [
        [
            {
                name: `values after first deploy ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(
                            getArrayForCandidType(
                                valueSample.src.candidTypeAnnotation
                            ).from(result),
                            getArrayForCandidType(
                                valueSample.src.candidTypeAnnotation
                            ).from([valueSample.value.agentArgumentValue])
                        )
                    };
                }
            }
        ],
        [
            {
                name: `values after second deploy ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(
                            getArrayForCandidType(
                                valueSample.src.candidTypeAnnotation
                            ).from(result),
                            getArrayForCandidType(
                                valueSample.src.candidTypeAnnotation
                            ).from([valueSample.value.agentArgumentValue])
                        )
                    };
                }
            }
        ],
        [
            {
                name: `values after third deploy ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(
                            getArrayForCandidType(
                                valueSample.src.candidTypeAnnotation
                            ).from(result),
                            getArrayForCandidType(
                                valueSample.src.candidTypeAnnotation
                            ).from([])
                        )
                    };
                }
            }
        ]
    ];
}
