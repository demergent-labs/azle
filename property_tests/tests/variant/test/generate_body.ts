import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Variant } from 'azle/property_tests/arbitraries/candid/constructed/variant_arb';
import { Named } from 'azle/property_tests';
import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';

export function generateBody(
    namedParamVariants: Named<CandidValueAndMeta<Variant>>[],
    returnVariant: CandidValueAndMeta<Variant>
): string {
    const paramsAreVariants = namedParamVariants
        .map((param) => {
            return `if (typeof ${param.name} !== 'object' || Object.keys(${param.name}).length !== 1) throw new Error('${param.name} must be a Variant');`;
        })
        .join('\n');

    const paramsCorrectlyOrdered =
        areParamsCorrectlyOrdered(namedParamVariants);

    const returnStatement = returnVariant.src.valueLiteral;

    return `
        ${paramsCorrectlyOrdered}

        ${paramsAreVariants}

        return ${returnStatement};
    `;
}
