import '#experimental/build/assert_experimental';

import { Principal } from '@icp-sdk/core/principal';
import fc from 'fast-check';

import { CandidValues } from '../../candid_values_arb';
import { PrincipalValueArb } from '../principal_arb';

export function ServiceValueArb(): fc.Arbitrary<CandidValues<Principal>> {
    return PrincipalValueArb().map((principal) => {
        const valueLiteral = `${principal.valueLiteral}`;
        const value = principal.agentArgumentValue;

        return {
            valueLiteral,
            agentArgumentValue: value,
            agentResponseValue: value
        };
    });
}
