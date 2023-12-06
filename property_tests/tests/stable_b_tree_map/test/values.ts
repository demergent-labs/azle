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
            const imports = new Set([
                ...stableBTreeMap.param0.src.imports,
                ...stableBTreeMap.param1.src.imports,
                'Vec',
                'stableJson',
                'StableBTreeMap'
            ]);

            const paramCandidTypeObjects = [
                stableBTreeMap.param0.src.candidTypeObject,
                stableBTreeMap.param1.src.candidTypeObject
            ].join(', ');

            const returnCandidTypeObject = `Vec(${stableBTreeMap.param1.src.candidTypeObject})`;
            const body = generateBody(
                stableBTreeMap.name,
                stableBTreeMap.param1.src.candidTypeAnnotation
            );

            const test = generateTest(
                functionName,
                stableBTreeMap.param0,
                stableBTreeMap.param1
            );

            return {
                imports,
                globalDeclarations: [],
                sourceCode: `${functionName}: update([${paramCandidTypeObjects}], ${returnCandidTypeObject}, (param0, param1) => {
                ${body}
            })`,
                tests: [test]
            };
        });
}

function generateBody(
    stableBTreeMapName: string,
    stableBTreeMapValueCandidTypeAnnotation: string
): string {
    return `
        ${stableBTreeMapName}.insert(param0, param1);

        return ${getArrayStringForCandidType(
            stableBTreeMapValueCandidTypeAnnotation
        )}(${stableBTreeMapName}.values());
    `;
}

function generateTest(
    functionName: string,
    param0: CandidValueAndMeta<CorrespondingJSType>,
    param1: CandidValueAndMeta<CorrespondingJSType>
): Test {
    return {
        name: `values ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/stable_b_tree_map/test');

            const result = await actor[functionName](
                param0.agentArgumentValue,
                param1.agentArgumentValue
            );

            return {
                Ok: deepEqual(
                    getArrayForCandidType(param1.src.candidTypeAnnotation).from(
                        result
                    ),
                    getArrayForCandidType(param1.src.candidTypeAnnotation).from(
                        [param1.agentArgumentValue]
                    )
                )
            };
        }
    };
}
