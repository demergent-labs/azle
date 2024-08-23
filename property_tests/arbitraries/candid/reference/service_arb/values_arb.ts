import { Principal } from '@dfinity/principal';
import fc from 'fast-check';

import { Context } from '../../../types';
import { ServiceCandidDefinition } from '../../candid_definition_arb/types';
import { CandidValueConstraints, CandidValues } from '../../candid_values_arb';
import { PrincipalValueArb } from '../principal_arb';

export function ServiceValueArb(
    context: Context<CandidValueConstraints>,
    serviceDefinition: ServiceCandidDefinition
): fc.Arbitrary<CandidValues<Principal>> {
    return PrincipalValueArb().map((principal) => {
        const valueLiteral =
            context.api === 'functional'
                ? `${serviceDefinition.name}(${principal.valueLiteral})`
                : `${principal.valueLiteral}`;
        const value = principal.agentArgumentValue;

        return {
            valueLiteral,
            agentArgumentValue: value,
            agentResponseValue: value
        };
    });
}
