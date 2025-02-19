import fc from 'fast-check';

import { JsPropertyNameArb } from '../../../js_function_name_arb';
import { CandidValues } from '../../candid_values_arb';
import { PrincipalValueArb } from '../principal_arb';
import { Func } from '.';

export function FuncValueArb(): fc.Arbitrary<CandidValues<Func>> {
    return fc
        .tuple(JsPropertyNameArb, PrincipalValueArb())
        .map(([name, principal]) => {
            const value: Func = [principal.agentArgumentValue, name];

            const valueLiteral = `[${principal.valueLiteral}, ${name.startsWith('"') ? name : `"${name}"`}]`;

            return {
                valueLiteral,
                agentArgumentValue: value,
                agentResponseValue: value
            };
        });
}
