import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Named } from 'azle/property_tests';

export function generateBody(
    namedParamNulls: Named<CandidValueAndMeta<null>>[],
    returnNull: CandidValueAndMeta<null>
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
