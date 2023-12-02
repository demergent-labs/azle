import fc from 'fast-check';
import { voidToSrcLiteral } from '../to_src_literal/void';
import { SimpleCandidDefinitionArb } from '../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../simple_type_arbs/values_arb';
import { CandidValueAndMetaArbGenerator } from '../candid_value_and_meta_arb_generator';

export const VoidDefinitionArb = SimpleCandidDefinitionArb('Void');

export const VoidValueArb = SimpleCandidValuesArb(
    fc.constant(undefined),
    voidToSrcLiteral
);

export const VoidArb = CandidValueAndMetaArbGenerator(
    VoidDefinitionArb,
    () => VoidValueArb
);
