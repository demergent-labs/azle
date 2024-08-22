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

            const returnTypeObject = `IDL.Vec(${stableBTreeMap.keySample.src.typeObject})`;
            const returnTypeAnnotation = getArrayTypeAnnotation(
                stableBTreeMap.keySample.src.typeObject,
                stableBTreeMap.keySample.src.typeAnnotation
            );
            const body = generateBody(
                stableBTreeMap.name,
                stableBTreeMap.keySample.src.typeObject
            );

            const tests = generateTests(functionName, stableBTreeMap.keySample);

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
    stableBTreeMapKeyTypeObject: string
): string {
    return `
        return ${getArrayStringForTypeObject(
            stableBTreeMapKeyTypeObject
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
                        getArrayForCandidTypeObject(
                            keySample.src.typeObject
                        ).from(result),
                        getArrayForCandidTypeObject(
                            keySample.src.typeObject
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
                        getArrayForCandidTypeObject(
                            keySample.src.typeObject
                        ).from(result),
                        getArrayForCandidTypeObject(
                            keySample.src.typeObject
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
                        getArrayForCandidTypeObject(
                            keySample.src.typeObject
                        ).from(result),
                        getArrayForCandidTypeObject(
                            keySample.src.typeObject
                        ).from([])
                    );
                }
            }
        ]
    ];
}
