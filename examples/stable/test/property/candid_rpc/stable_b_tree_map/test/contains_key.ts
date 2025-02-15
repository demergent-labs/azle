import { getActor } from 'azle/test/property';
import { QueryMethod } from 'azle/test/property/arbitraries/canister_methods/query_method_arb';
import { StableBTreeMap } from 'azle/test/property/arbitraries/stable_b_tree_map_arb';
import { UniqueIdentifierArb } from 'azle/test/property/arbitraries/unique_identifier_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';
import fc from 'fast-check';

export function ContainsKeyTestArb(
    stableBTreeMap: StableBTreeMap
): fc.Arbitrary<QueryMethod<any, any>> {
    return fc
        .tuple(UniqueIdentifierArb('canisterProperties'))
        .map(([functionName]): QueryMethod<any, any> => {
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
                tests,
                paramTypes: [], // TODO this is not correct but I don't want to take the time to fix it now
                methodName: functionName
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
                    const actor = await getActor(__dirname);

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
                    const actor = await getActor(__dirname);

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
                    const actor = await getActor(__dirname);

                    const result = await actor[functionName](
                        keySampleAgentArgumentValue
                    );

                    return testEquality(result, false);
                }
            }
        ]
    ];
}
