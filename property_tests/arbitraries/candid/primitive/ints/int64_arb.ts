import fc from 'fast-check';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';

export const Int64DefinitionArb = SimpleCandidDefinitionArb('int64');

export const Int64ValueArb = SimpleCandidValuesArb(
    fc.bigIntN(64),
    bigintToSrcLiteral
);

export const Int64Arb = CandidValueAndMetaArbGenerator(
    Int64DefinitionArb,
    () => Int64ValueArb
);
