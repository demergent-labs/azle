import { Named } from 'azle/_internal/test/property';
import { CandidValueAndMeta } from 'azle/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { Record } from 'azle/_internal/test/property/arbitraries/candid/constructed/record_arb';
import { areParamsCorrectlyOrdered } from 'azle/_internal/test/property/are_params_correctly_ordered';

export function generateBody(
    namedParamRecords: Named<CandidValueAndMeta<Record>>[],
    returnRecord: CandidValueAndMeta<Record>
): string {
    const paramsAreRecords = namedParamRecords
        .map((param) => {
            const fieldsCount = Object.keys(
                param.value.value.agentArgumentValue
            ).length;

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
