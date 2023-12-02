import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Func } from 'azle/property_tests/arbitraries/candid/reference/func_arb';
import { Named } from 'azle/property_tests';
import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';

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
