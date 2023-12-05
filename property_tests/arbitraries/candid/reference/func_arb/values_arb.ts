import fc from 'fast-check';
import { Func } from '.';
import { TextArb } from '../../primitive/text';
import { CandidValues } from '../../candid_values_arb';
import { PrincipalArb } from '../principal_arb';

export function FuncValueArb(): fc.Arbitrary<CandidValues<Func>> {
    return fc.tuple(TextArb(), PrincipalArb()).map(([name, principal]) => {
        const value: Func = [
            principal.agentArgumentValue,
            name.agentArgumentValue
        ];

        const valueLiteral = `[${principal.src.valueLiteral}, ${name.src.valueLiteral}]`;

        return {
            valueLiteral,
            agentArgumentValue: value,
            agentResponseValue: value
        };
    });
}
