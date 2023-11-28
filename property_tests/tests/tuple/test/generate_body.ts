import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import {
    Tuple,
    ReturnTuple
} from 'azle/property_tests/arbitraries/candid/constructed/tuple_arb';
import { Named } from 'azle/property_tests';
import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';

export function generateBody(
    namedParamTuples: Named<CandidValueAndMeta<Tuple, ReturnTuple>>[],
    returnTuple: CandidValueAndMeta<Tuple, ReturnTuple>
): string {
    const paramsAreTuples = namedParamTuples
        .map((param) => {
            const fieldsCount = param.el.agentArgumentValue.length;

            const paramIsArray = `Array.isArray(${param.name})`;
            const paramHasCorrectNumberOfFields = `${param.name}.length === ${fieldsCount}`;
            const throwError = `throw new Error('${param.name} must be a Tuple');`;

            return `if (!(${paramIsArray} && ${paramHasCorrectNumberOfFields})) ${throwError}`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamTuples);

    const returnStatement = returnTuple.src.valueLiteral;

    return `
        ${paramsAreTuples}

        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}
