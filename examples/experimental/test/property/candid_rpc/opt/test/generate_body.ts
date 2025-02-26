import { Named } from 'azle/_internal/test/property';
import { CandidValueAndMeta } from 'azle/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { areParamsCorrectlyOrdered } from 'azle/_internal/test/property/are_params_correctly_ordered';
import { Opt } from 'azle/_internal/test/property/opt_arb';

export function generateBody(
    namedParamOpts: Named<CandidValueAndMeta<Opt>>[],
    returnOpt: CandidValueAndMeta<Opt>
): string {
    const areParamsOpts = namedParamOpts
        .map((param) => {
            return `if (!${isParamOpt(param.name)}) throw new Error('${
                param.name
            } must be an Opt');`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamOpts);

    const returnStatement = returnOpt.src.valueLiteral;

    return `
        ${areParamsOpts}
        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}

function isParamOpt(paramName: string): string {
    return `(${paramName}.Some !== undefined || ${paramName}.None !== undefined)`;
}
