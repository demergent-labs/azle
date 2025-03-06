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

export function GetTestArb(
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
                    'query',
                    'IDL'
                ]);

                const paramTypeObjects = [
                    stableBTreeMap.keySample.src.typeObject
                ].join(', ');

                const paramNames = [
                    `param0: ${stableBTreeMap.keySample.src.typeAnnotation}`
                ].join(', ');

                const returnTypeObject = `IDL.Opt(${stableBTreeMap.valueSample.src.typeObject})`;
                const returnTypeAnnotation =
                    stableBTreeMap.valueSample.src.typeAnnotation;
                const body = generateBody(stableBTreeMap.name);

                const tests = generateTests(
                    functionName,
                    stableBTreeMap.keySample.value.agentArgumentValue,
                    stableBTreeMap.valueSample.value.agentArgumentValue
                );

                return {
                    imports,
                    globalDeclarations: [],
                    sourceCode: `@query([${paramTypeObjects}], ${returnTypeObject})
                ${functionName}(${paramNames}): [${returnTypeAnnotation}] | [] {
                ${body}
            }`,
                    tests,
                    paramTypes: [stableBTreeMap.keySample],
                    methodName: functionName
                };
            }
        );
}

function generateBody(stableBTreeMapName: string): string {
    return /*TS*/ `
        const result = ${stableBTreeMapName}.get(param0);
        if (result === undefined) {
            return []
        } else {
            return [result]
        }
    `;
}

function generateTests(
    functionName: string,
    keySampleAgentArgumentValue: StableBTreeMap['keySample']['value']['agentArgumentValue'],
    valueSampleAgentArgumentValue: StableBTreeMap['valueSample']['value']['agentArgumentValue']
): Test[][] {
    return [
        [
            {
                name: `get after first deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[functionName](
                        keySampleAgentArgumentValue
                    );

                    return testEquality(result, [
                        valueSampleAgentArgumentValue
                    ]);
                }
            }
        ],
        [
            {
                name: `get after second deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[functionName](
                        keySampleAgentArgumentValue
                    );

                    return testEquality(result, [
                        valueSampleAgentArgumentValue
                    ]);
                }
            }
        ],
        [
            {
                name: `get after third deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[functionName](
                        keySampleAgentArgumentValue
                    );

                    return testEquality(result, []);
                }
            }
        ]
    ];
}
