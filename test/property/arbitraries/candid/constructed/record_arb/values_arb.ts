import fc from 'fast-check';

import { DEFAULT_VALUE_MAX_DEPTH } from '../../../config';
import { Context } from '../../../types';
import { RecordCandidDefinition } from '../../candid_definition_arb/types';
import {
    CandidValueArb,
    CandidValueConstraints,
    CandidValues
} from '../../candid_values_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { RecursiveShapes } from '../../recursive';
import { Record } from './index';

type Field = [string, CandidValues<CorrespondingJSType>];
type ArbField = [string, fc.Arbitrary<CandidValues<CorrespondingJSType>>];

export function RecordValuesArb(
    context: Context<CandidValueConstraints>,
    recordDefinition: RecordCandidDefinition,
    recursiveShapes: RecursiveShapes
): fc.Arbitrary<CandidValues<Record>> {
    const depthLevel =
        context.constraints?.depthLevel ?? DEFAULT_VALUE_MAX_DEPTH;
    const fieldValues = recordDefinition.innerTypes.map(([name, innerType]) => {
        const result: ArbField = [
            name,
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
            )
        ];
        return result;
    });
    const arbitraryFieldValues = fieldValues.map(([key, arbValue]) =>
        arbValue.map((value): Field => [key, value])
    );

    return fc.tuple(...arbitraryFieldValues).map((fieldValues) => {
        const valueLiteral = generateValueLiteral(fieldValues);
        const agentArgumentValue = generateValue(fieldValues);
        const agentResponseValue = generateValue(fieldValues, true);

        return {
            valueLiteral,
            agentArgumentValue,
            agentResponseValue
        };
    });
}

function generateValue(fields: Field[], returned: boolean = false): Record {
    return fields.length === 0
        ? {}
        : fields.reduce((record, [fieldName, fieldCandidValues]) => {
              return {
                  ...record,
                  [fieldName]: returned
                      ? fieldCandidValues.agentResponseValue
                      : fieldCandidValues.agentArgumentValue
              };
          }, {});
}

function generateValueLiteral(fields: Field[]): string {
    if (fields.length === 0) {
        return '{}';
    }

    const fieldLiterals = fields
        .map(
            ([fieldName, fieldCandidValues]) =>
                `${fieldName}: ${fieldCandidValues.valueLiteral}`
        )
        .join(',\n');

    return `{
        ${fieldLiterals}
    }`;
}
