import { Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from 'azle/property_tests/arbitraries/candid/corresponding_js_type';

export function generateBody(
    namedParams: Named<CandidValueAndMeta<CorrespondingJSType>>[],
    returnType: CandidValueAndMeta<CorrespondingJSType>
): string {
    // Print out params to avoid unused parameter warnings
    const printParams = namedParams.map(
        (param) => `console.log(${param.name})`
    );
    return /*TS*/ `
        ${printParams.join('\n')}
        return ${returnType.src.valueLiteral}
    `;
}
