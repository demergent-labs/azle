import { Principal } from '@icp-sdk/core/principal';
import { Named } from 'azle/experimental/_internal/test/property';
import { CandidValueAndMeta } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { areParamsCorrectlyOrdered } from 'azle/experimental/_internal/test/property/are_params_correctly_ordered';

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
