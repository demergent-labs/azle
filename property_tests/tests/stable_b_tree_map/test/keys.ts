import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { StableBTreeMap } from '../../../arbitraries/stable_b_tree_map_arb';
import { getActor } from '../../../../property_tests';
import { Test } from '../../../../test';
import { CandidValueAndMeta } from '../../../arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from '../../../arbitraries/candid/corresponding_js_type';
import { getArrayForCandidType, getArrayStringForCandidType } from './utils';
import { UniqueIdentifierArb } from '../../../arbitraries/unique_identifier_arb';
import { QueryMethod } from '../../../arbitraries/canister_methods/query_method_arb';

export function KeysTestArb(stableBTreeMap: StableBTreeMap) {
    return fc
        .tuple(UniqueIdentifierArb('stableBTreeMap'))
        .map(([functionName]): QueryMethod => {
            const imports = new Set([
                ...stableBTreeMap.param0.src.imports,
                ...stableBTreeMap.param1.src.imports,
                'Vec',
                'stableJson',
                'StableBTreeMap'
            ]);

            const returnCandidTypeObject = `Vec(${stableBTreeMap.param0.src.candidTypeObject})`;
            const body = generateBody(
                stableBTreeMap.name,
                stableBTreeMap.param0.src.candidTypeAnnotation
            );

            const test = generateTest(functionName, stableBTreeMap.param0);

            return {
                imports,
                globalDeclarations: [],
                sourceCode: `${functionName}: query([], ${returnCandidTypeObject}, () => {
                ${body}
            })`,
                tests: [test]
            };
        });
}

function generateBody(
    stableBTreeMapName: string,
    stableBTreeMapKeyCandidTypeAnnotation: string
): string {
    return `
        return ${getArrayStringForCandidType(
            stableBTreeMapKeyCandidTypeAnnotation
        )}(${stableBTreeMapName}.keys());
    `;
}

function generateTest(
    functionName: string,
    param0: CandidValueAndMeta<CorrespondingJSType>
): Test {
    return {
        name: `keys ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/stable_b_tree_map/test');

            const result = await actor[functionName]();

            return {
                Ok: deepEqual(
                    getArrayForCandidType(param0.src.candidTypeAnnotation).from(
                        result
                    ),
                    getArrayForCandidType(param0.src.candidTypeAnnotation).from(
                        [param0.agentArgumentValue]
                    )
                )
            };
        }
    };
}
