import { Named } from '.';
import { CandidValueAndMeta } from './arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from './arbitraries/candid/corresponding_js_type';

export function areParamsCorrectlyOrdered<T extends CorrespondingJSType>(
    params: Named<CandidValueAndMeta<T>>[]
): string {
    return params
        .map(({ name, value }) => {
            const areEqual = `deepEqual(
                ${name},
                ${value.src.valueLiteral}
            )`;
            return `if (!${areEqual}) {console.info('value', ${name}, 'expected', ${value.src.valueLiteral}); throw new Error('${name} is incorrectly ordered');}`;
        })
        .join('\n');
}
