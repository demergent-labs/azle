import { getActor } from 'azle/property_tests';
import { QueryMethod } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { StableBTreeMap } from 'azle/property_tests/arbitraries/stable_b_tree_map_arb';
import { UniqueIdentifierArb } from 'azle/property_tests/arbitraries/unique_identifier_arb';
import { AzleResult, Test, testEquality } from 'azle/property_tests/test';
import fc from 'fast-check';

import {
    getArrayForCandidTypeObject,
    getArrayStringForTypeObject,
    getArrayTypeAnnotation
} from './utils';

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

            const returnTypeObject = `IDL.Vec(${stableBTreeMap.valueSample.src.typeObject})`;
            const returnTypeAnnotation = getArrayTypeAnnotation(
                stableBTreeMap.valueSample.src.typeObject,
                stableBTreeMap.valueSample.src.typeAnnotation
            );
            const body = generateBody(
                stableBTreeMap.name,
                stableBTreeMap.valueSample.src.typeObject
            );

            const tests = generateTests(
                functionName,
                stableBTreeMap.valueSample
            );

            return {
                imports,
                globalDeclarations: [],
                sourceCode: `@query([], ${returnTypeObject})
                ${functionName}(): ${returnTypeAnnotation} {
                ${body}
            }`,
                tests
            };
        });
}

function generateBody(
    stableBTreeMapName: string,
    stableBTreeMapValueTypeObject: string
): string {
    return `
        return ${getArrayStringForTypeObject(
            stableBTreeMapValueTypeObject
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
                        getArrayForCandidTypeObject(
                            valueSample.src.typeObject
                        ).from(result),
                        getArrayForCandidTypeObject(
                            valueSample.src.typeObject
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
                        getArrayForCandidTypeObject(
                            valueSample.src.typeObject
                        ).from(result),
                        getArrayForCandidTypeObject(
                            valueSample.src.typeObject
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
                        getArrayForCandidTypeObject(
                            valueSample.src.typeObject
                        ).from(result),
                        getArrayForCandidTypeObject(
                            valueSample.src.typeObject
                        ).from([])
                    );
                }
            }
        ]
    ];
}
