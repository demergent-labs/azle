import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { getActor } from '../../../../property_tests';
import { Test } from '../../../../test';
import { UniqueIdentifierArb } from '../../../arbitraries/unique_identifier_arb';
import { QueryMethod } from '../../../arbitraries/canister_methods/query_method_arb';
import { StableBTreeMap } from '../../../arbitraries/stable_b_tree_map_arb';

export function ContainsKeyTestArb(stableBTreeMap: StableBTreeMap) {
    return fc
        .tuple(UniqueIdentifierArb('stableBTreeMap'))
        .map(([functionName]): QueryMethod => {
            const imports = new Set([
                ...stableBTreeMap.param0.src.imports,
                ...stableBTreeMap.param1.src.imports,
                'bool',
                'stableJson',
                'StableBTreeMap'
            ]);

            const paramCandidTypeObjects = [
                stableBTreeMap.param0.src.candidTypeObject,
                stableBTreeMap.param1.src.candidTypeObject
            ].join(', ');

            const returnCandidType = `bool`;
            const body = generateBody(stableBTreeMap.name);
            const test = generateTest(
                functionName,
                stableBTreeMap.param0.agentArgumentValue,
                stableBTreeMap.param1.agentArgumentValue
            );

            return {
                imports,
                globalDeclarations: [
                    ...stableBTreeMap.param0.src.variableAliasDeclarations,
                    ...stableBTreeMap.param1.src.variableAliasDeclarations
                ],
                sourceCode: `${functionName}: query([${paramCandidTypeObjects}], ${returnCandidType}, (param0, param1) => {
                ${body}
            })`,
                tests: [test]
            };
        });
}

function generateBody(stableBTreeMapName: string): string {
    return `
        ${stableBTreeMapName}.insert(param0, param1);

        return ${stableBTreeMapName}.containsKey(param0);
    `;
}

function generateTest(
    functionName: string,
    param0Value: any,
    param1Value: any
): Test {
    return {
        name: `containsKey ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/stable_b_tree_map/test');

            const result = await actor[functionName](param0Value, param1Value);

            return {
                Ok: deepEqual(result, true)
            };
        }
    };
}
