import fc from 'fast-check';
import { Tuple, ReturnTuple } from '.';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { TupleCandidDefinition } from '../../candid_definition_arb/types';
import { CandidValues, CandidValueArb } from '../../candid_values_arb';

export function TupleValuesArb(
    tupleDefinition: TupleCandidDefinition
): fc.Arbitrary<CandidValues<Tuple, ReturnTuple>> {
    const fieldValues = tupleDefinition.innerTypes.map((innerType) => {
        const result: fc.Arbitrary<CandidValues<CorrespondingJSType>> =
            CandidValueArb(innerType);
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
