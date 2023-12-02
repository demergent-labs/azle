import { numberToSrcLiteral } from '../../to_src_literal/number';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { NumberArb } from './';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import fc from 'fast-check';

export function Int16Arb(): fc.Arbitrary<CandidValueAndMeta<number>> {
    return CandidValueAndMetaArbGenerator(
        Int16DefinitionArb,
        () => Int16ValueArb
    );
}

export const Int16DefinitionArb = SimpleCandidDefinitionArb('int16');

export const Int16ValueArb = SimpleCandidValuesArb(
    NumberArb(16),
    numberToSrcLiteral
);
