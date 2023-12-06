import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Recursive } from 'azle/property_tests/arbitraries/candid/recursive';
import { Named } from 'azle/property_tests';
import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';

export function generateBody(
    namedParamRecursive: Named<CandidValueAndMeta<Recursive>>[],
    returnRecursive: CandidValueAndMeta<Recursive>
): string {
    // const paramsAreRecords = namedParamRecursive
    //     .map((param) => {
    //         const fieldsCount = Object.keys(param.el.agentArgumentValue).length;

    //         const paramIsObject = `typeof ${param.name} === 'object'`;
    //         const paramHasCorrectNumberOfFields = `Object.keys(${param.name}).length === ${fieldsCount}`;
    //         const throwError = `throw new Error('${param.name} must be a Record');`;

    //         return `if (!(${paramIsObject} && ${paramHasCorrectNumberOfFields})) ${throwError}`;
    //     })
    //     .join('\n');

    const paramsCorrectlyOrdered =
        areParamsCorrectlyOrdered(namedParamRecursive);

    const returnStatement = returnRecursive.src.valueLiteral;

    return `
        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}
