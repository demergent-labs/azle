import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';
import { CandidType } from '../../candid_type';
import { IntCandidDefinition } from '../../definition_arb/types';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValues } from '../../values';

export const Int64Arb = SimpleCandidValueAndMetaArb(
    fc.bigIntN(64),
    CandidType.Int64,
    bigintToSrcLiteral
);

export const Int64DefinitionArb: fc.Arbitrary<IntCandidDefinition> =
    SimpleCandidDefinitionArb(CandidType.Int64);

export const Int64ValueArb: fc.Arbitrary<CandidValues<bigint>> =
    SimpleCandidValuesArb(fc.bigIntN(64), bigintToSrcLiteral);
