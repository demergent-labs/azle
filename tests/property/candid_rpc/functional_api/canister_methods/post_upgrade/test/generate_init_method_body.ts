import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from 'azle/test/property/arbitraries/candid/corresponding_js_type';
import { areParamsCorrectlyOrdered } from 'azle/test/property/are_params_correctly_ordered';

import { globalInitVarName } from './global_var_name';

export function generateBody(
    namedParams: Named<CandidValueAndMeta<CorrespondingJSType>>[]
): string {
    const paramsAreCorrectlyOrdered = areParamsCorrectlyOrdered(namedParams);

    const storeVariablesGlobally = namedParams
        .map((param, i) => `${globalInitVarName(i)} = ${param.name};`)
        .join('\n');

    return `
        initExecuted = true;

        ${paramsAreCorrectlyOrdered}

        ${storeVariablesGlobally}
    `;
}
