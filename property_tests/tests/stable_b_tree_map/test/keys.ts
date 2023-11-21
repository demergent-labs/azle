import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { StableBTreeMapArb } from '../../../arbitraries/stable_b_tree_map_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { getActor } from '../../../../property_tests';
import { Test } from '../../../../test';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { CandidType } from '../../../arbitraries/candid/candid_type_arb';
import { getArrayForCandidType, getArrayStringForCandidType } from './utils';
import { UniqueIdentifierArb } from '../../../arbitraries/unique_identifier_arb';

export const KeysTestArb = fc
    .tuple(UniqueIdentifierArb('stableBTreeMap'), StableBTreeMapArb)
    .map(([functionName, stableBTreeMap]): TestSample => {
        const imports = new Set([
            ...stableBTreeMap.param0.src.imports,
            ...stableBTreeMap.param1.src.imports,
            'Vec',
            'stableJson',
            'StableBTreeMap'
        ]);

        const paramNames = ['param0', 'param1'];
        const paramCandidTypes = [
            stableBTreeMap.param0.src.candidType,
            stableBTreeMap.param1.src.candidType
        ].join(', ');

        const returnCandidType = `Vec(${stableBTreeMap.param0.src.candidType})`;
        const body = generateBody(
            stableBTreeMap.name,
            stableBTreeMap.param0.src.candidType,
            stableBTreeMap.body
        );

        const test = generateTest(
            functionName,
            stableBTreeMap.param0,
            stableBTreeMap.param1.value
        );

        return {
            imports,
            functionName,
            paramNames,
            paramCandidTypes,
            returnCandidType,
            body,
            test
        };
    });

function generateBody(
    stableBTreeMapName: string,
    stableBTreeMapKeyCandidType: string,
    stableBTreeMapBody: string
): string {
    return `
        ${stableBTreeMapBody}

        ${stableBTreeMapName}.insert(param0, param1);

        return ${getArrayStringForCandidType(
            stableBTreeMapKeyCandidType
        )}(${stableBTreeMapName}.keys());
    `;
}

function generateTest(
    functionName: string,
    param0: CandidMeta<CandidType>,
    param1Value: any
): Test {
    return {
        name: `keys ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/stable_b_tree_map/test');

            const result = await actor[functionName](param0.value, param1Value);

            return {
                Ok: deepEqual(
                    getArrayForCandidType(param0.src.candidType).from(result),
                    getArrayForCandidType(param0.src.candidType).from([
                        param0.value
                    ])
                )
            };
        }
    };
}
