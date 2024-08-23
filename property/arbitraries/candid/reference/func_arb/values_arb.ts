import fc from 'fast-check';

import { Context } from '../../../types';
import { CandidValueConstraints, CandidValues } from '../../candid_values_arb';
import { TextValueArb } from '../../primitive/text';
import { PrincipalValueArb } from '../principal_arb';
import { Func } from '.';

export function FuncValueArb(
    context: Context<CandidValueConstraints>
): fc.Arbitrary<CandidValues<Func>> {
    return fc
        .tuple(
            TextValueArb({
                ...context,
                constraints: { isJsFunctionName: true }
            }),
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
