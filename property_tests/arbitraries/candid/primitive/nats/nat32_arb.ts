import { numberToSrcLiteral } from '../../to_src_literal/number';
import { UNumberArb } from './index';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { ComplexCandidValueAndMetaArb } from '../../complex_value_and_meta_arb';

export const Nat32DefinitionArb = SimpleCandidDefinitionArb('nat32');

export const Nat32ValueArb = SimpleCandidValuesArb(
    UNumberArb(32),
    numberToSrcLiteral
);

export const Nat32Arb = ComplexCandidValueAndMetaArb(
    Nat32DefinitionArb,
    () => Nat32ValueArb
);
