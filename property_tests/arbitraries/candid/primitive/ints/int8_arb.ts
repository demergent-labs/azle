import { numberToSrcLiteral } from '../../to_src_literal/number';
import { NumberArb } from './';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';

export const Int8DefinitionArb = SimpleCandidDefinitionArb('int8');

export const Int8ValueArb = SimpleCandidValuesArb(
    NumberArb(8),
    numberToSrcLiteral
);

export const Int8Arb = CandidValueAndMetaArbGenerator(
    Int8DefinitionArb,
    () => Int8ValueArb
);
