import fc from 'fast-check';
import { SimpleCandidDefinitionArb } from '../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../simple_type_arbs/values_arb';
import { nullToSrcLiteral } from '../to_src_literal/null';
import { ComplexCandidValueAndMetaArb } from '../complex_value_and_meta_arb';
import { NullCandidDefinition } from '../definition_arb/types';
import { CandidValues } from '../values';

export const NullArb = ComplexCandidValueAndMetaArb(
    NullDefinitionArb(),
    NullValueArb
);

export function NullDefinitionArb(): fc.Arbitrary<NullCandidDefinition> {
    return SimpleCandidDefinitionArb('Null');
}

export function NullValueArb(): fc.Arbitrary<CandidValues<null>> {
    return SimpleCandidValuesArb(fc.constant(null), nullToSrcLiteral);
}
