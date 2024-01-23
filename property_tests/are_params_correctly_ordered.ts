import { CandidValueAndMeta } from './arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from './arbitraries/candid/corresponding_js_type';
import { Named } from '.';

export function areParamsCorrectlyOrdered<T extends CorrespondingJSType>(
    params: Named<CandidValueAndMeta<T>>[]
) {
    return params
        .map(({ name, value }) => {
            const areEqual = `deepEqual(
                ${name},
                ${value.src.valueLiteral}
            )`;
            return `if (!${areEqual}) {console.log('value', ${name}, 'expected', ${value.src.valueLiteral}); throw new Error('${name} is incorrectly ordered');}`;
        })
        .join('\n');
}
