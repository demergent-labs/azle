import { numberToSrcLiteral } from '../../to_src_literal/number';
import { NumberArb } from './';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import fc from 'fast-check';
import {
    IntCandidDefinition,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { CandidValues } from '../../candid_values_arb';

export function Int16Arb(): fc.Arbitrary<CandidValueAndMeta<number>> {
    return CandidValueAndMetaArbGenerator(Int16DefinitionArb(), Int16ValueArb);
}

export function Int16DefinitionArb(): WithShapesArb<IntCandidDefinition> {
    return SimpleCandidDefinitionArb('int16');
}

export function Int16ValueArb(): fc.Arbitrary<CandidValues<number>> {
    return SimpleCandidValuesArb(NumberArb(16), numberToSrcLiteral);
}
