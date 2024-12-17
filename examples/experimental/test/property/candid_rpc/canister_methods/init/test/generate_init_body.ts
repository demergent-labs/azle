import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from 'azle/test/property/arbitraries/candid/corresponding_js_type';
import { areParamsCorrectlyOrdered } from 'azle/test/property/are_params_correctly_ordered';

export function generateBody(
    namedParams: Named<CandidValueAndMeta<CorrespondingJSType>>[]
): string {
    const paramsAreCorrectlyOrdered = areParamsCorrectlyOrdered(namedParams);

    const storeVariablesGlobally = namedParams
        .map((param, i) => `initParam${i} = ${param.name};`)
        .join('\n');

    return `
        initialized = true;

        ${paramsAreCorrectlyOrdered}

        ${storeVariablesGlobally}
    `;
}
