import fc from 'fast-check';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { IntCandidDefinition } from '../../candid_definition_arb/types';
import { CandidValues } from '../../candid_values_arb';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';

export function Int64Arb(): fc.Arbitrary<CandidValueAndMeta<bigint>> {
    return CandidValueAndMetaArbGenerator(Int64DefinitionArb(), Int64ValueArb);
}

export function Int64DefinitionArb(): fc.Arbitrary<IntCandidDefinition> {
    return SimpleCandidDefinitionArb('int64');
}

export function Int64ValueArb(): fc.Arbitrary<CandidValues<bigint>> {
    return SimpleCandidValuesArb(fc.bigIntN(64), bigintToSrcLiteral);
}
