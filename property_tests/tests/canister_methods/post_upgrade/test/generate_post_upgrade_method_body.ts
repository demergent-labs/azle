import { Named } from 'azle/property_tests';
import { CorrespondingJSType } from 'azle/property_tests/arbitraries/candid/corresponding_js_type';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';
import { globalPostUpgradeVarName } from './global_var_name';

export function generateBody(
    namedParams: Named<CandidValueAndMeta<CorrespondingJSType>>[]
) {
    const paramsAreCorrectlyOrdered = areParamsCorrectlyOrdered(namedParams);

    const storeVariablesGlobally = namedParams
        .map((param, i) => `${globalPostUpgradeVarName(i)} = ${param.name};`)
        .join('\n');

    return `
        postUpgradeExecuted = true;

        ${paramsAreCorrectlyOrdered}

        ${storeVariablesGlobally}
    `;
}
