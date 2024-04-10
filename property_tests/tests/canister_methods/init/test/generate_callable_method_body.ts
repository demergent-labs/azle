import { Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from 'azle/property_tests/arbitraries/candid/corresponding_js_type';

export function generateBody(
    _namedParams: Named<CandidValueAndMeta<CorrespondingJSType>>[],
    returnType: CandidValueAndMeta<CorrespondingJSType>
) {
    return `return ${returnType.src.valueLiteral}`;
}
