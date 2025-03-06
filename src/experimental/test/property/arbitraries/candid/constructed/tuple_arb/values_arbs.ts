import fc from 'fast-check';

import { DEFAULT_VALUE_MAX_DEPTH } from '../../../config';
import { Context } from '../../../types';
import { TupleCandidDefinition } from '../../candid_definition_arb/types';
import {
    CandidValueArb,
    CandidValueConstraints,
    CandidValues
} from '../../candid_values_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { RecursiveShapes } from '../../recursive';
import { ReturnTuple, Tuple } from '.';

export function TupleValuesArb(
    context: Context<CandidValueConstraints>,
    tupleDefinition: TupleCandidDefinition,
    recursiveShapes: RecursiveShapes
): fc.Arbitrary<CandidValues<Tuple, ReturnTuple>> {
    const depthLevel =
        context.constraints?.depthLevel ?? DEFAULT_VALUE_MAX_DEPTH;
    const fieldValues = tupleDefinition.innerTypes.map((innerType) => {
        const result: fc.Arbitrary<CandidValues<CorrespondingJSType>> =
            CandidValueArb(
                {
                    ...context,
                    constraints: {
                        ...context.constraints,
                        depthLevel: depthLevel - 1
                    }
                },
                innerType,
                recursiveShapes
            );
        return result;
    });

    return fc.tuple(...fieldValues).map((fieldValues) => {
        const valueLiteral = generateValueLiteral(fieldValues);
        const agentArgumentValue = generateAgentArgumentValue(fieldValues);
        const agentResponseValue = generateAgentResponseValue(fieldValues);

        return {
            valueLiteral,
            agentArgumentValue,
            agentResponseValue
        };
    });
}

function generateAgentArgumentValue(
    fields: CandidValues<CorrespondingJSType>[]
): Tuple {
    return fields.map((field) => field.agentArgumentValue);
}

function generateAgentResponseValue(
    fields: CandidValues<CorrespondingJSType>[]
): ReturnTuple {
    if (fields.length === 0) {
        return {};
    }
    return fields.map((field) => field.agentResponseValue);
}

function generateValueLiteral(
    fields: CandidValues<CorrespondingJSType>[]
): string {
    const fieldLiterals = fields.map((field) => field.valueLiteral).join(',\n');

    return `[
        ${fieldLiterals}
    ]`;
}
