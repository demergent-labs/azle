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

import {
    getArrayForCandidTypeObject,
    getArrayStringForTypeObject,
    getArrayTypeAnnotation
} from './utils';

export function ValuesTestArb(
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
                    tests,
                    paramTypes: [],
                    methodName: functionName
                };
            }
        );
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
                    const actor = await getActor(__dirname);

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
                    const actor = await getActor(__dirname);

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
                    const actor = await getActor(__dirname);

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
