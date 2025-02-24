import { Named } from 'azle/_internal/test/property';
import { CandidValueAndMeta } from 'azle/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from 'azle/_internal/test/property/arbitraries/candid/corresponding_js_type';

export function generateBody(
    _namedParams: Named<CandidValueAndMeta<CorrespondingJSType>>[],
    returnType: CandidValueAndMeta<CorrespondingJSType>
): string {
    return `return ${returnType.src.valueLiteral}`;
}
