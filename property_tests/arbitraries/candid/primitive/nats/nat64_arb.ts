import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';
import { NatCandidDefinition } from '../../definition_arb/types';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValues } from '../../values';

export const Nat64Arb = SimpleCandidValueAndMetaArb(
    fc.bigUintN(64),
    'nat64',
    bigintToSrcLiteral
);

export const Nat64DefinitionArb: fc.Arbitrary<NatCandidDefinition> =
    SimpleCandidDefinitionArb('nat64');

export const Nat64ValueArb: fc.Arbitrary<CandidValues<bigint>> =
    SimpleCandidValuesArb(fc.bigUintN(64), bigintToSrcLiteral);
