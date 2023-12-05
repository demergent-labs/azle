import fc from 'fast-check';
import { Variant } from '.';
import { VariantCandidDefinition } from '../../candid_definition_arb/types';
import { CandidValues, CandidValueArb } from '../../candid_values_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';

type Field = [string, CandidValues<CorrespondingJSType>];

export function VariantValuesArb(
    variantDefinition: VariantCandidDefinition
): fc.Arbitrary<CandidValues<Variant>> {
    if (variantDefinition.innerTypes.length === 0) {
        return fc.constant({
            valueLiteral: '{}',
            agentArgumentValue: {},
            agentResponseValue: {}
        });
    }
    const randomIndex = Math.floor(
        Math.random() * variantDefinition.innerTypes.length
    );

    const [name, innerType] = variantDefinition.innerTypes[randomIndex];

    const fieldValue = CandidValueArb(innerType).map((values): Field => {
        return [name, values];
    });

    return fieldValue.map((fieldValues) => {
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
