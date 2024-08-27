import fc from 'fast-check';

import { DEFAULT_VALUE_MAX_DEPTH } from '../../../config';
import { Api, Context } from '../../../types';
import { OptCandidDefinition } from '../../candid_definition_arb/types';
import {
    CandidValueArb,
    CandidValueConstraints,
    CandidValues
} from '../../candid_values_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { RecursiveShapes } from '../../recursive';
import { Opt } from '.';

type SomeOrNone = 'Some' | 'None';

export function OptValuesArb(
    context: Context<CandidValueConstraints>,
    optDefinition: OptCandidDefinition,
    recursiveShapes: RecursiveShapes
): fc.Arbitrary<CandidValues<Opt>> {
    const constraints = context.constraints ?? {
        depthLevel: DEFAULT_VALUE_MAX_DEPTH
    };
    const api = context.api;
    const depthLevel = constraints.depthLevel ?? DEFAULT_VALUE_MAX_DEPTH;
    if (depthLevel < 1) {
        return fc.constant(generateNoneValue(api));
    }
    const innerValue = fc.tuple(
        fc.constantFrom('Some', 'None') as fc.Arbitrary<SomeOrNone>,
        CandidValueArb(
            {
                api,
                constraints: { ...constraints, depthLevel: depthLevel - 1 }
            },
            optDefinition.innerType,
            recursiveShapes
        )
    );

    return innerValue.map(([someOrNone, innerType]) => {
        const valueLiteral = generateValueLiteral(someOrNone, innerType, api);
        const agentArgumentValue = generateValue(someOrNone, innerType);
        const agentResponseValue = generateValue(someOrNone, innerType, true);

        return {
            valueLiteral,
            agentArgumentValue,
            agentResponseValue
        };
    });
}

function generateNoneValue(api: Api): CandidValues<Opt> {
    return {
        valueLiteral: api === 'functional' ? 'None' : '[]',
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
    innerType: CandidValues<CorrespondingJSType>,
    api: Api
): string {
    if (someOrNone === 'Some') {
        return api === 'functional'
            ? `Some(${innerType.valueLiteral})`
            : `[${innerType.valueLiteral}]`;
    } else {
        return api === 'functional' ? `None` : '[]';
    }
}
