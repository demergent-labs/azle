import { getActor } from 'azle/experimental/_internal/test/property';
import { CorrespondingJSType } from 'azle/experimental/_internal/test/property/arbitraries/candid/corresponding_js_type';
import { UpdateMethod } from 'azle/experimental/_internal/test/property/arbitraries/canister_methods/update_method_arb';
import { StableBTreeMap } from 'azle/experimental/_internal/test/property/arbitraries/stable_b_tree_map_arb';
import { UniqueIdentifierArb } from 'azle/experimental/_internal/test/property/arbitraries/unique_identifier_arb';
import {
    AzleResult,
    candidTestEquality,
    Test} from 'azle/experimental/_internal/test/property/test';
import fc from 'fast-check';

export function RemoveTestArb(
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
                    'update'
                ]);

                const paramTypeObjects = [
                    stableBTreeMap.keySample.src.typeObject
                ].join(', ');

                const paramNames = [
                    `param0: ${stableBTreeMap.keySample.src.typeAnnotation}`
                ].join(', ');

                const returnTypeObject = `IDL.Opt(${stableBTreeMap.valueSample.src.typeObject})`;
                const returnTypeAnnotation = `[${stableBTreeMap.valueSample.src.typeAnnotation}] | []`;
                const body = generateBody(stableBTreeMap.name);

                const tests = generateTests(
                    functionName,
                    stableBTreeMap.keySample.value.agentArgumentValue,
                    stableBTreeMap.valueSample.value.agentArgumentValue
                );

                return {
                    imports,
                    globalDeclarations: [],
                    sourceCode: `@update([${paramTypeObjects}], ${returnTypeObject})
                ${functionName}(${paramNames}): ${returnTypeAnnotation} {
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
        const result = ${stableBTreeMapName}.remove(param0);
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
        [],
        [
            {
                name: `remove after second deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[
                        functionName.startsWith('"')
                            ? functionName.slice(1, -1)
                            : functionName
                    ](keySampleAgentArgumentValue);

                    return candidTestEquality(result, [
                        valueSampleAgentArgumentValue
                    ]);
                }
            }
        ]
    ];
}
