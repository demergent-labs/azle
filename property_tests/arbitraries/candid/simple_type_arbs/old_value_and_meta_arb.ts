import fc from 'fast-check';
import { CandidValueAndMeta } from '../candid_value_and_meta';
import { CorrespondingJSType } from '../candid_type_arb';

export function OldSimpleCandidValueAndMetaArb<T extends CorrespondingJSType>(
    arb: fc.Arbitrary<T>,
    typeAnnotation: string,
    imports: Set<string>,
    toLiteral: (value: T) => string
): fc.Arbitrary<CandidValueAndMeta<T>> {
    return arb.map(
        (value): CandidValueAndMeta<T> => ({
            src: {
                typeAnnotation,
                imports,
                typeAliasDeclarations: [], // TODO make this random
                valueLiteral: toLiteral(value)
            },
            agentArgumentValue: value,
            agentResponseValue: value
        })
    );
}
