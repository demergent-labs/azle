import fc from 'fast-check';

import { StableBTreeMap } from 'azle/property_tests/arbitraries/stable_b_tree_map_arb';
import { deepEqual, getActor } from 'azle/property_tests';
import { Test } from 'azle/test';
import { UniqueIdentifierArb } from 'azle/property_tests/arbitraries/unique_identifier_arb';
import { QueryMethod } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

export function RemoveTestArb(stableBTreeMap: StableBTreeMap) {
    return fc
        .tuple(UniqueIdentifierArb('stableBTreeMap'))
        .map(([functionName]): QueryMethod => {
            const imports = new Set([
                ...stableBTreeMap.imports,
                'Opt',
                'update'
            ]);

            const paramCandidTypeObjects = [
                stableBTreeMap.keySample.src.candidTypeObject
            ].join(', ');

            const returnCandidTypeObject = `Opt(${stableBTreeMap.valueSample.src.candidTypeObject})`;
            const body = generateBody(stableBTreeMap.name);

            const tests = generateTests(
                functionName,
                stableBTreeMap.keySample.value.agentArgumentValue,
                stableBTreeMap.valueSample.value.agentArgumentValue
            );

            return {
                imports,
                globalDeclarations: [],
                sourceCode: `${functionName}: update([${paramCandidTypeObjects}], ${returnCandidTypeObject}, (param0) => {
                ${body}
            })`,
                tests
            };
        });
}

function generateBody(stableBTreeMapName: string): string {
    return `
        return ${stableBTreeMapName}.remove(param0);
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
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](
                        keySampleAgentArgumentValue
                    );

                    return {
                        Ok: deepEqual(result, [valueSampleAgentArgumentValue])
                    };
                }
            }
        ]
    ];
}
