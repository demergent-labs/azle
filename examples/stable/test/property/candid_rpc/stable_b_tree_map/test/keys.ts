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

                const tests = generateTests(
                    functionName,
                    stableBTreeMap.keySample
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
                    const actor = await getActor(__dirname);

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
                    const actor = await getActor(__dirname);

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
                    const actor = await getActor(__dirname);

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
