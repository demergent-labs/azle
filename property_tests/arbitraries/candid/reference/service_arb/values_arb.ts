import { Principal } from '@dfinity/principal';
import fc from 'fast-check';
import { ServiceCandidDefinition } from '../../candid_definition_arb/types';
import { CandidValues } from '../../candid_values_arb';
import { PrincipalValueArb } from '../principal_arb';

export function ServiceValueArb(
    serviceDefinition: ServiceCandidDefinition
): fc.Arbitrary<CandidValues<Principal>> {
    return PrincipalValueArb().map((principal) => {
        const valueLiteral = `${serviceDefinition.name}(${principal.valueLiteral})`;
        const value = principal.agentArgumentValue;

        return {
            valueLiteral,
            agentArgumentValue: value,
            agentResponseValue: value
        };
    });
}
