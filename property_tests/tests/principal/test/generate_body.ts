import { Principal } from '@dfinity/principal';

import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Named } from 'azle/property_tests';
import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';

export function generateBody(
    namedParamPrincipals: Named<CandidValueAndMeta<Principal>>[],
    returnPrincipal: CandidValueAndMeta<Principal>
): string {
    const paramsArePrincipals = namedParamPrincipals
        .map((param) => {
            return `if (${param.name}._isPrincipal !== true) throw new Error('${param.name} must be a Principal');`;
        })
        .join('\n');

    const returnStatement =
        namedParamPrincipals.length > 0
            ? namedParamPrincipals[0].name
            : returnPrincipal.src.valueLiteral;

    const paramsCorrectlyOrdered =
        areParamsCorrectlyOrdered(namedParamPrincipals);

    return `
        ${paramsArePrincipals}

        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}
