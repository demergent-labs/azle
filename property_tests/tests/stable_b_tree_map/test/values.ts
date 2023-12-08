import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { StableBTreeMap } from '../../../arbitraries/stable_b_tree_map_arb';
import { getActor } from '../../../../property_tests';
import { Test } from '../../../../test';
import { getArrayForCandidType, getArrayStringForCandidType } from './utils';
import { CandidValueAndMeta } from '../../../arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from '../../../arbitraries/candid/corresponding_js_type';
import { UniqueIdentifierArb } from '../../../arbitraries/unique_identifier_arb';
import { QueryMethod } from '../../../arbitraries/canister_methods/query_method_arb';

export function ValuesTestArb(stableBTreeMap: StableBTreeMap) {
    return fc
        .tuple(UniqueIdentifierArb('stableBTreeMap'))
        .map(([functionName]): QueryMethod => {
            const imports = new Set([...stableBTreeMap.imports, 'Vec']);

            const returnCandidTypeObject = `Vec(${stableBTreeMap.valueSample.src.candidTypeObject})`;
            const body = generateBody(
                stableBTreeMap.name,
                stableBTreeMap.valueSample.src.candidTypeAnnotation
            );

            const tests = generateTests(
                functionName,
                stableBTreeMap.valueSample
            );

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
    stableBTreeMapValueCandidTypeAnnotation: string
): string {
    return `
        return ${getArrayStringForCandidType(
            stableBTreeMapValueCandidTypeAnnotation
        )}(${stableBTreeMapName}.values());
    `;
}

function generateTests(
    functionName: string,
    param1: CandidValueAndMeta<CorrespondingJSType>
): Test[][] {
    return [
        [
            {
                name: `values after first deploy ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/stable_b_tree_map/test');

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(
                            getArrayForCandidType(
                                param1.src.candidTypeAnnotation
                            ).from(result),
                            getArrayForCandidType(
                                param1.src.candidTypeAnnotation
                            ).from([param1.agentArgumentValue])
                        )
                    };
                }
            }
        ],
        [
            {
                name: `values after second deploy ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/stable_b_tree_map/test');

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(
                            getArrayForCandidType(
                                param1.src.candidTypeAnnotation
                            ).from(result),
                            getArrayForCandidType(
                                param1.src.candidTypeAnnotation
                            ).from([param1.agentArgumentValue])
                        )
                    };
                }
            }
        ],
        [
            {
                name: `values after third deploy ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/stable_b_tree_map/test');

                    const result = await actor[functionName]();

                    return {
                        Ok: deepEqual(
                            getArrayForCandidType(
                                param1.src.candidTypeAnnotation
                            ).from(result),
                            getArrayForCandidType(
                                param1.src.candidTypeAnnotation
                            ).from([])
                        )
                    };
                }
            }
        ]
    ];
}
