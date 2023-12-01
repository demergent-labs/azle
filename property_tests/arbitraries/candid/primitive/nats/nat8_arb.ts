import { numberToSrcLiteral } from '../../to_src_literal/number';
import { UNumberArb } from './index';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { ComplexCandidValueAndMetaArb } from '../../complex_value_and_meta_arb';

export const Nat8DefinitionArb = SimpleCandidDefinitionArb('nat8');

export const Nat8ValueArb = SimpleCandidValuesArb(
    UNumberArb(8),
    numberToSrcLiteral
);

export const Nat8Arb = ComplexCandidValueAndMetaArb(
    Nat8DefinitionArb,
    () => Nat8ValueArb
);
