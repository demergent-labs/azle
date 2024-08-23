import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import {
    ReturnTuple,
    Tuple
} from 'azle/test/property/arbitraries/candid/constructed/tuple_arb';
import { areParamsCorrectlyOrdered } from 'azle/test/property/are_params_correctly_ordered';

export function generateBody(
    namedParamTuples: Named<CandidValueAndMeta<Tuple, ReturnTuple>>[],
    returnTuple: CandidValueAndMeta<Tuple, ReturnTuple>
): string {
    const paramsAreTuples = namedParamTuples
        .map((param) => {
            const fieldsCount = param.value.value.agentArgumentValue.length;

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
