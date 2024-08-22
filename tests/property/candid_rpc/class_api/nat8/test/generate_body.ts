import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { areParamsCorrectlyOrdered } from 'azle/test/property/are_params_correctly_ordered';

export function generateBody(
    namedParamNat8s: Named<CandidValueAndMeta<number>>[],
    returnNat8: CandidValueAndMeta<number>
): string {
    const paramsAreNumbers = namedParamNat8s
        .map((param) => {
            return `if (typeof ${param.name} !== 'number') throw new Error('${param.name} must be a number');`;
        })
        .join('\n');

    const sum = namedParamNat8s.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnNat8.src.valueLiteral);
    const count = namedParamNat8s.length + 1;
    const average = `Math.floor((${sum}) / ${count})`;

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamNat8s);

    return `
        ${paramsAreNumbers}

        ${paramsCorrectlyOrdered}

        return ${average};
    `;
}
