import { numberToSrcLiteral } from '../../to_src_literal/number';
import { UNumberArb } from './index';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { ComplexCandidValueAndMetaArb } from '../../complex_value_and_meta_arb';

export const Nat16DefinitionArb = SimpleCandidDefinitionArb('nat16');

export const Nat16ValueArb = SimpleCandidValuesArb(
    UNumberArb(16),
    numberToSrcLiteral
);

export const Nat16Arb = ComplexCandidValueAndMetaArb(
    Nat16DefinitionArb,
    () => Nat16ValueArb
);
