import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Record } from 'azle/property_tests/arbitraries/candid/constructed/record_arb';
import { Named } from 'azle/property_tests';
import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';

export function generateBody(
    namedParamRecords: Named<CandidMeta<Record>>[],
    returnRecord: CandidMeta<Record>
): string {
    const paramsAreRecords = namedParamRecords
        .map((param) => {
            const fieldsCount = Object.keys(param.el.agentArgumentValue).length;

            const paramIsObject = `typeof ${param.name} === 'object'`;
            const paramHasCorrectNumberOfFields = `Object.keys(${param.name}).length === ${fieldsCount}`;
            const throwError = `throw new Error('${param.name} must be a Record');`;

            return `if (!(${paramIsObject} && ${paramHasCorrectNumberOfFields})) ${throwError}`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamRecords);

    const returnStatement = returnRecord.src.valueLiteral;

    return `
        ${paramsAreRecords}

        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}
