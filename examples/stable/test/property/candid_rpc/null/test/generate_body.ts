import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';

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
