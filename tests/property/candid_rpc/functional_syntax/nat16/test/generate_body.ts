import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { areParamsCorrectlyOrdered } from 'azle/test/property/are_params_correctly_ordered';

export function generateBody(
    namedParamNat16s: Named<CandidValueAndMeta<number>>[],
    returnNat16: CandidValueAndMeta<number>
): string {
    const paramsAreNumbers = namedParamNat16s
        .map((param) => {
            return `if (typeof ${param.name} !== 'number') throw new Error('${param.name} must be a number');`;
        })
        .join('\n');

    const sum = namedParamNat16s.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnNat16.src.valueLiteral);
    const count = namedParamNat16s.length + 1;
    const average = `Math.floor((${sum}) / ${count})`;

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamNat16s);

    return `
        ${paramsAreNumbers}

        ${paramsCorrectlyOrdered}

        return ${average};
    `;
}
