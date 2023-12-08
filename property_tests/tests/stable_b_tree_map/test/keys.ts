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
            const imports = new Set([...stableBTreeMap.imports, 'Vec']);

            const returnCandidTypeObject = `Vec(${stableBTreeMap.keySample.src.candidTypeObject})`;
            const body = generateBody(
                stableBTreeMap.name,
                stableBTreeMap.keySample.src.candidTypeAnnotation
            );

            const tests = generateTests(functionName, stableBTreeMap.keySample);

            return {
                imports,
                globalDeclarations: [],
                sourceCode: `${functionName}: query([], ${returnCandidTypeObject}, () => {
                ${body}
            })`,
                tests
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

function generateTests(
    functionName: string,
    param0: CandidValueAndMeta<CorrespondingJSType>
): Test[][] {
    return [
        [
            {
                name: `keys after first deploy ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/stable_b_tree_map/test');

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(
                            getArrayForCandidType(
                                param0.src.candidTypeAnnotation
                            ).from(result),
                            getArrayForCandidType(
                                param0.src.candidTypeAnnotation
                            ).from([param0.agentArgumentValue])
                        )
                    };
                }
            }
        ],
        [
            {
                name: `keys after second deploy ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/stable_b_tree_map/test');

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(
                            getArrayForCandidType(
                                param0.src.candidTypeAnnotation
                            ).from(result),
                            getArrayForCandidType(
                                param0.src.candidTypeAnnotation
                            ).from([param0.agentArgumentValue])
                        )
                    };
                }
            }
        ],
        [
            {
                name: `keys after third deploy ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/stable_b_tree_map/test');

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(
                            getArrayForCandidType(
                                param0.src.candidTypeAnnotation
                            ).from(result),
                            getArrayForCandidType(
                                param0.src.candidTypeAnnotation
                            ).from([])
                        )
                    };
                }
            }
        ]
    ];
}
