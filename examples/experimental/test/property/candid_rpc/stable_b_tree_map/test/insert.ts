import { getActor } from 'azle/_internal/test/property';
import { CorrespondingJSType } from 'azle/_internal/test/property/arbitraries/candid/corresponding_js_type';
import { UpdateMethod } from 'azle/_internal/test/property/arbitraries/canister_methods/update_method_arb';
import { StableBTreeMap } from 'azle/_internal/test/property/arbitraries/stable_b_tree_map_arb';
import { UniqueIdentifierArb } from 'azle/_internal/test/property/arbitraries/unique_identifier_arb';
import {
    AzleResult,
    Test,
    testEquality
} from 'azle/_internal/test/property/test';
import fc from 'fast-check';

export function InsertTestArb(
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
                    'Opt',
                    'update',
                    'None',
                    'Some'
                ]);

                const paramTypeObjects = [
                    stableBTreeMap.keySample.src.typeObject,
                    stableBTreeMap.valueSample.src.typeObject
                ].join(', ');

                const returnTypeObject = `Opt(${stableBTreeMap.valueSample.src.typeObject})`;
                const body = generateBody(stableBTreeMap.name);

                const tests = generateTests(
                    functionName,
                    stableBTreeMap.keySample.value.agentArgumentValue,
                    stableBTreeMap.valueSample.value.agentArgumentValue
                );

                return {
                    imports,
                    globalDeclarations: [],
                    sourceCode: `${functionName}: update([${paramTypeObjects}], ${returnTypeObject}, (param0, param1) => {
                ${body}
            })`,
                    tests,
                    paramTypes: [
                        stableBTreeMap.keySample,
                        stableBTreeMap.valueSample
                    ],
                    methodName: functionName
                };
            }
        );
}

function generateBody(stableBTreeMapName: string): string {
    return /*TS*/ `
        const result = ${stableBTreeMapName}.insert(param0, param1);
        if (result === null) {
            return None
        } else {
            return Some(result)
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
                name: `insert after first deploy ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[functionName](
                        keySampleAgentArgumentValue,
                        valueSampleAgentArgumentValue
                    );

                    return testEquality(result, []);
                }
            }
        ]
    ];
}
