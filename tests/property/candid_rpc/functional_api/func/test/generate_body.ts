import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { Func } from 'azle/test/property/arbitraries/candid/reference/func_arb';
import { areParamsCorrectlyOrdered } from 'azle/test/property/are_params_correctly_ordered';

export function generateBody(
    namedParamFuncs: Named<CandidValueAndMeta<Func>>[],
    returnFunc: CandidValueAndMeta<Func>
): string {
    const paramsAreFuncs = namedParamFuncs
        .map(({ name }) => {
            const paramIsArray = `Array.isArray(${name})`;
            const paramHas2Fields = `${name}.length === 2`;
            const field0IsAPrincipal = `${name}[0]._isPrincipal === true`;
            const field1IsAString = `typeof ${name}[1] === 'string'`;

            const paramIsAFunc = [
                paramIsArray,
                paramHas2Fields,
                field0IsAPrincipal,
                field1IsAString
            ].join(' && ');

            const throwError = `throw new Error('${name} must be a Func');`;

            return `if (!(${paramIsAFunc})) ${throwError}`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamFuncs);

    const returnStatement = returnFunc.src.valueLiteral;

    return `
        ${paramsAreFuncs}

        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}
