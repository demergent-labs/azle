import fc from 'fast-check';

import { CandidValues } from '../../candid_values_arb';
import { TextValueArb } from '../../primitive/text';
import { PrincipalValueArb } from '../principal_arb';
import { Func } from '.';

export function FuncValueArb(): fc.Arbitrary<CandidValues<Func>> {
    return fc
        .tuple(
            TextValueArb(undefined, undefined, { isJsFunctionName: true }),
            PrincipalValueArb()
        )
        .map(([name, principal]) => {
            const value: Func = [
                principal.agentArgumentValue,
                name.agentArgumentValue
            ];

            const valueLiteral = `[${principal.valueLiteral}, ${name.valueLiteral}]`;

            return {
                valueLiteral,
                agentArgumentValue: value,
                agentResponseValue: value
            };
        });
}
