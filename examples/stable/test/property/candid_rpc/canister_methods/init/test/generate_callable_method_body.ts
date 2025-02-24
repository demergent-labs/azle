import { Named } from 'azle/_internal/test/property';
import { CandidValueAndMeta } from 'azle/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from 'azle/_internal/test/property/arbitraries/candid/corresponding_js_type';

export function generateBody(
    namedParams: Named<CandidValueAndMeta<CorrespondingJSType>>[],
    returnType: CandidValueAndMeta<CorrespondingJSType>
): string {
    // Print out params to avoid unused parameter warnings
    const printParams = namedParams.map(
        (param) => `console.info(${param.name})`
    );
    return /*TS*/ `
        ${printParams.join('\n')}
        return ${returnType.src.valueLiteral}
    `;
}
