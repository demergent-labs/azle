import { numberToSrcLiteral } from '../../to_src_literal/number';
import { NumberArb } from './';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';

export function Int32DefinitionArb() {
    return SimpleCandidDefinitionArb('int32');
}

export function Int32ValueArb() {
    return SimpleCandidValuesArb(NumberArb(32), numberToSrcLiteral);
}

export function Int32Arb() {
    return CandidValueAndMetaArbGenerator(Int32DefinitionArb(), Int32ValueArb);
}
