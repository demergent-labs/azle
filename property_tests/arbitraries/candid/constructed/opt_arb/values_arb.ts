import fc from 'fast-check';
import { Opt } from '.';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { OptCandidDefinition } from '../../candid_definition_arb/types';
import { CandidValues, CandidValueArb } from '../../candid_values_arb';

type SomeOrNone = 'Some' | 'None';

export function OptValuesArb(
    optDefinition: OptCandidDefinition,
    n: number
): fc.Arbitrary<CandidValues<Opt>> {
    if (n < 1) {
        return fc.constant(generateNoneValue());
    }
    const innerValue = fc.tuple(
        fc.constantFrom('Some', 'None') as fc.Arbitrary<SomeOrNone>,
        CandidValueArb(optDefinition.innerType, n - 1)
    );

    return innerValue.map(([someOrNone, innerType]) => {
        const valueLiteral = generateValueLiteral(someOrNone, innerType);
        const agentArgumentValue = generateValue(someOrNone, innerType);
        const agentResponseValue = generateValue(someOrNone, innerType, true);

        return {
            valueLiteral,
            agentArgumentValue,
            agentResponseValue
        };
    });
}

function generateNoneValue(): CandidValues<Opt> {
    return {
        valueLiteral: 'None',
        agentArgumentValue: [],
        agentResponseValue: []
    };
}

function generateValue(
    someOrNone: SomeOrNone,
    innerType: CandidValues<CorrespondingJSType>,
    useAgentResponseValue: boolean = false
): Opt {
    if (someOrNone === 'Some') {
        return [
            useAgentResponseValue
                ? innerType.agentResponseValue
                : innerType.agentArgumentValue
        ];
    } else {
        return [];
    }
}

function generateValueLiteral(
    someOrNone: SomeOrNone,
    innerType: CandidValues<CorrespondingJSType>
): string {
    if (someOrNone === 'Some') {
        return `Some(${innerType.valueLiteral})`;
    } else {
        return `None`;
    }
}
