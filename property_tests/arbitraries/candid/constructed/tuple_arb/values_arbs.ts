import fc from 'fast-check';
import { Tuple, ReturnTuple } from '.';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { TupleCandidDefinition } from '../../candid_definition_arb/types';
import {
    CandidValues,
    CandidValueArb,
    CandidValueConstraints
} from '../../candid_values_arb';
import { RecursiveShapes } from '../../recursive';
import { DEFAULT_VALUE_MAX_DEPTH } from '../../../config';

export function TupleValuesArb(
    tupleDefinition: TupleCandidDefinition,
    recursiveShapes: RecursiveShapes,
    constraints?: CandidValueConstraints
): fc.Arbitrary<CandidValues<Tuple, ReturnTuple>> {
    const depthLevel = constraints?.depthLevel ?? DEFAULT_VALUE_MAX_DEPTH;
    const fieldValues = tupleDefinition.innerTypes.map((innerType) => {
        const result: fc.Arbitrary<CandidValues<CorrespondingJSType>> =
            CandidValueArb(innerType, recursiveShapes, {
                ...constraints,
                depthLevel: depthLevel - 1
            });
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

function generateValueLiteral(fields: CandidValues<CorrespondingJSType>[]) {
    const fieldLiterals = fields.map((field) => field.valueLiteral).join(',\n');

    return `[
        ${fieldLiterals}
    ]`;
}
