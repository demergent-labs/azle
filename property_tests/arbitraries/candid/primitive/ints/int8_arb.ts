import { numberToSrcLiteral } from '../../to_src_literal/number';
import { NumberArb } from './';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import fc from 'fast-check';
import { CandidValues } from '../../candid_values_arb';
import {
    IntCandidDefinition,
    WithShapesArb
} from '../../candid_definition_arb/types';

export function Int8Arb(): fc.Arbitrary<CandidValueAndMeta<number>> {
    return CandidValueAndMetaArbGenerator(Int8DefinitionArb(), Int8ValueArb);
}

export function Int8DefinitionArb(): WithShapesArb<IntCandidDefinition> {
    return SimpleCandidDefinitionArb('int8');
}

export function Int8ValueArb(): fc.Arbitrary<CandidValues<number>> {
    return SimpleCandidValuesArb(NumberArb(8), numberToSrcLiteral);
}
