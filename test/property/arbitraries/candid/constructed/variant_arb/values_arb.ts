import fc from 'fast-check';

import { DEFAULT_VALUE_MAX_DEPTH } from '../../../config';
import { Context } from '../../../types';
import { VariantCandidDefinition } from '../../candid_definition_arb/types';
import {
    CandidValueArb,
    CandidValueConstraints,
    CandidValues
} from '../../candid_values_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { RecursiveShapes } from '../../recursive';
import { Variant } from '.';

type Field = [string, CandidValues<CorrespondingJSType>];

export function VariantValuesArb(
    context: Context<CandidValueConstraints>,
    variantDefinition: VariantCandidDefinition,
    recursiveShapes: RecursiveShapes
): fc.Arbitrary<CandidValues<Variant>> {
    const depthLevel =
        context.constraints?.depthLevel ?? DEFAULT_VALUE_MAX_DEPTH;
    return fc
        .nat(depthLevel < 1 ? 0 : variantDefinition.innerTypes.length - 1)
        .chain((randomIndex) => {
            if (variantDefinition.innerTypes.length === 0) {
                return fc.constant({
                    valueLiteral: '{}',
                    agentArgumentValue: {},
                    agentResponseValue: {}
                });
            }

            const [name, innerType] = variantDefinition.innerTypes[randomIndex];

            const fieldValues = CandidValueArb(
                {
                    ...context,
                    constraints: {
                        ...context.constraints,
                        depthLevel: depthLevel - 1
                    }
                },
                innerType,
                recursiveShapes
            ).map((values): Field => {
                return [name, values];
            });

            return fieldValues.map((fieldValue) => {
                const valueLiteral = generateValueLiteral(fieldValue);
                const agentArgumentValue = generateValue(fieldValue);
                const agentResponseValue = generateValue(fieldValue, true);

                return {
                    valueLiteral,
                    agentArgumentValue,
                    agentResponseValue
                };
            });
        });
}

function generateValue(field: Field, returned: boolean = false): Variant {
    const [fieldName, { agentArgumentValue, agentResponseValue }] = field;

    return {
        [fieldName]: returned ? agentResponseValue : agentArgumentValue
    };
}

function generateValueLiteral(field: Field): string {
    const [fieldName, fieldValue] = field;

    return `{
        ${fieldName}: ${fieldValue.valueLiteral}
    }`;
}
