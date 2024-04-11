import fc from 'fast-check';

import { CandidValues } from '../../candid_values_arb';
import { TextArb } from '../../primitive/text';
import { PrincipalArb } from '../principal_arb';
import { Func } from '.';

export function FuncValueArb(): fc.Arbitrary<CandidValues<Func>> {
    return fc
        .tuple(TextArb({ isJsFunctionName: true }), PrincipalArb())
        .map(([name, principal]) => {
            const value: Func = [
                principal.value.agentArgumentValue,
                name.value.agentArgumentValue
            ];

            const valueLiteral = `[${principal.src.valueLiteral}, ${name.src.valueLiteral}]`;

            return {
                valueLiteral,
                agentArgumentValue: value,
                agentResponseValue: value
            };
        });
}
