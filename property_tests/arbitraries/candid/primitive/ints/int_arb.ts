import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';
import { CandidType } from '../../candid_type';
import { IntCandidDefinition } from '../../definition_arb/types';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValues } from '../../values';

export const IntArb = SimpleCandidValueAndMetaArb(
    fc.bigInt(),
    CandidType.Int,
    bigintToSrcLiteral
);

export const IntDefinitionArb: fc.Arbitrary<IntCandidDefinition> =
    SimpleCandidDefinitionArb(CandidType.Int);

export const IntValueArb: fc.Arbitrary<CandidValues<bigint>> =
    SimpleCandidValuesArb(fc.bigInt(), bigintToSrcLiteral);
