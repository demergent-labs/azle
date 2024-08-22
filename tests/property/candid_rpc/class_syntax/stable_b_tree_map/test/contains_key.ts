import { getActor } from 'azle/property_tests';
import { QueryMethod } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { StableBTreeMap } from 'azle/property_tests/arbitraries/stable_b_tree_map_arb';
import { UniqueIdentifierArb } from 'azle/property_tests/arbitraries/unique_identifier_arb';
import { AzleResult, Test, testEquality } from 'azle/property_tests/test';
import fc from 'fast-check';

export function ContainsKeyTestArb(
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

            const paramTypeObjects = [
                stableBTreeMap.keySample.src.typeObject
            ].join(', ');

            const paramName = [
                `param0: ${stableBTreeMap.keySample.src.typeAnnotation}`
            ].join(', ');

            const returnTypeObject = 'IDL.Bool';
            const returnTypeAnnotation = 'boolean';
            const body = generateBody(stableBTreeMap.name);
            const tests = generateTests(
                functionName,
                stableBTreeMap.keySample.value.agentArgumentValue
            );

            return {
                imports,
                globalDeclarations: [],
                sourceCode: generateSourceCode(
                    functionName,
                    paramName,
                    body,
                    paramTypeObjects,
                    returnTypeObject,
                    returnTypeAnnotation
                ),
                tests
            };
        });
}

function generateSourceCode(
    functionName: string,
    paramName: string,
    body: string,
    paramTypeObjects: string,
    returnTypeObject: string,
    returnTypeAnnotation: string
): string {
    return `
        @query([${paramTypeObjects}], ${returnTypeObject})
        ${functionName}(${paramName}): ${returnTypeAnnotation} {
            ${body}
        }`;
}

function generateBody(stableBTreeMapName: string): string {
    return /*TS*/ `
        return ${stableBTreeMapName}.containsKey(param0);
    `;
}

function generateTests(
    functionName: string,
    keySampleAgentArgumentValue: StableBTreeMap['keySample']['value']['agentArgumentValue']
): Test[][] {
    return [
        [
            {
                name: `containsKey after first deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](
                        keySampleAgentArgumentValue
                    );

                    return testEquality(result, true);
                }
            }
        ],
        [
            {
                name: `containsKey after second deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](
                        keySampleAgentArgumentValue
                    );

                    return testEquality(result, true);
                }
            }
        ],
        [
            {
                name: `containsKey after third deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](
                        keySampleAgentArgumentValue
                    );

                    return testEquality(result, false);
                }
            }
        ]
    ];
}
