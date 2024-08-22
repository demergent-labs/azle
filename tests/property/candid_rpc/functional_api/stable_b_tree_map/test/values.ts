import { getActor } from 'azle/test/property';
import { QueryMethod } from 'azle/test/property/arbitraries/canister_methods/query_method_arb';
import { StableBTreeMap } from 'azle/test/property/arbitraries/stable_b_tree_map_arb';
import { UniqueIdentifierArb } from 'azle/test/property/arbitraries/unique_identifier_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';
import fc from 'fast-check';

import { getArrayForCandidType, getArrayStringForCandidType } from './utils';

export function ValuesTestArb(
    stableBTreeMap: StableBTreeMap
): fc.Arbitrary<QueryMethod> {
    return fc
        .tuple(UniqueIdentifierArb('canisterProperties'))
        .map(([functionName]): QueryMethod => {
            const imports = new Set([
                ...stableBTreeMap.imports,
                'Vec',
                'query'
            ]);

            const returnTypeObject = `Vec(${stableBTreeMap.valueSample.src.typeObject})`;
            const body = generateBody(
                stableBTreeMap.name,
                stableBTreeMap.valueSample.src.typeAnnotation
            );

            const tests = generateTests(
                functionName,
                stableBTreeMap.valueSample
            );

            return {
                imports,
                globalDeclarations: [],
                sourceCode: `${functionName}: query([], ${returnTypeObject}, () => {
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
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(
                        getArrayForCandidType(
                            valueSample.src.typeAnnotation
                        ).from(result),
                        getArrayForCandidType(
                            valueSample.src.typeAnnotation
                        ).from([valueSample.value.agentArgumentValue])
                    );
                }
            }
        ],
        [
            {
                name: `values after second deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(
                        getArrayForCandidType(
                            valueSample.src.typeAnnotation
                        ).from(result),
                        getArrayForCandidType(
                            valueSample.src.typeAnnotation
                        ).from([valueSample.value.agentArgumentValue])
                    );
                }
            }
        ],
        [
            {
                name: `values after third deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName]();

                    return testEquality(
                        getArrayForCandidType(
                            valueSample.src.typeAnnotation
                        ).from(result),
                        getArrayForCandidType(
                            valueSample.src.typeAnnotation
                        ).from([])
                    );
                }
            }
        ]
    ];
}
