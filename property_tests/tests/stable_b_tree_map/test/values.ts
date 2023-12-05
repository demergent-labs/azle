import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { StableBTreeMapArb } from '../../../arbitraries/stable_b_tree_map_arb';
import { getActor } from '../../../../property_tests';
import { Test } from '../../../../test';
import { getArrayForCandidType, getArrayStringForCandidType } from './utils';
import { CandidValueAndMeta } from '../../../arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from '../../../arbitraries/candid/corresponding_js_type';
import { UniqueIdentifierArb } from '../../../arbitraries/unique_identifier_arb';
import { QueryMethod } from '../../../arbitraries/canister_methods/query_method_arb';

export const ValuesTestArb = fc
    .tuple(UniqueIdentifierArb('stableBTreeMap'), StableBTreeMapArb)
    .map(([functionName, stableBTreeMap]): QueryMethod => {
        const imports = new Set([
            ...stableBTreeMap.param0.src.imports,
            ...stableBTreeMap.param1.src.imports,
            'Vec',
            'stableJson',
            'StableBTreeMap'
        ]);

        const paramCandidTypeObjects = [
            stableBTreeMap.param0.src.candidTypeAnnotation,
            stableBTreeMap.param1.src.candidTypeAnnotation
        ].join(', ');

        const returnCandidType = `Vec(${stableBTreeMap.param1.src.candidTypeAnnotation})`;
        const body = generateBody(
            stableBTreeMap.name,
            stableBTreeMap.param1.src.candidTypeAnnotation,
            stableBTreeMap.body
        );

        const test = generateTest(
            functionName,
            stableBTreeMap.param0,
            stableBTreeMap.param1
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

function generateBody(
    stableBTreeMapName: string,
    stableBTreeMapValueCandidType: string,
    stableBTreeMapBody: string
): string {
    return `
        ${stableBTreeMapBody}

        ${stableBTreeMapName}.insert(param0, param1);

        return ${getArrayStringForCandidType(
            stableBTreeMapValueCandidType
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
