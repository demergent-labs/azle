import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Named } from 'azle/property_tests/arbitraries/query_method_arb';

export function generateBody(
    namedParamNulls: Named<CandidMeta<null>>[],
    returnNull: CandidMeta<null>
): string {
    const areAllNull = namedParamNulls.reduce((acc, { name }) => {
        return `${acc} && ${name} === null`;
    }, 'true');

    const allNullCheck = `if (!(${areAllNull})) throw new Error("Not all of the values were null")`;

    return `
        ${allNullCheck}

        return ${returnNull.src.valueLiteral};
    `;
}
