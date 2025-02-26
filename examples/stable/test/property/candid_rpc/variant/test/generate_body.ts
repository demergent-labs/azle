import { Named } from 'azle/_internal/test/property';
import { CandidValueAndMeta } from 'azle/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { areParamsCorrectlyOrdered } from 'azle/_internal/test/property/are_params_correctly_ordered';
import { Variant } from 'azle/_internal/test/property/variant_arb';

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
