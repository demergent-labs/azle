import { getActor } from 'azle/property_tests';
import { QueryMethod } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { StableBTreeMap } from 'azle/property_tests/arbitraries/stable_b_tree_map_arb';
import { UniqueIdentifierArb } from 'azle/property_tests/arbitraries/unique_identifier_arb';
import { AzleResult, Test, testEquality } from 'azle/property_tests/test';
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
                'IDL',
                'query'
            ]);

            const returnCandidTypeObject = `IDL.Vec(${stableBTreeMap.valueSample.src.candidTypeObject})`;
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
                            valueSample.src.candidTypeAnnotation
                        ).from(result),
                        getArrayForCandidType(
                            valueSample.src.candidTypeAnnotation
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
                            valueSample.src.candidTypeAnnotation
                        ).from(result),
                        getArrayForCandidType(
                            valueSample.src.candidTypeAnnotation
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
                            valueSample.src.candidTypeAnnotation
                        ).from(result),
                        getArrayForCandidType(
                            valueSample.src.candidTypeAnnotation
                        ).from([])
                    );
                }
            }
        ]
    ];
}
