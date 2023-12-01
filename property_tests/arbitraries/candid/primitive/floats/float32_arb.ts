import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { floatToSrcLiteral } from '../../to_src_literal/float';
import { FloatCandidDefinition } from '../../definition_arb/types';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValues } from '../../values';

export const Float32Arb = SimpleCandidValueAndMetaArb(
    fc.float(),
    'float32',
    floatToSrcLiteral
);

export const Float32DefinitionArb: fc.Arbitrary<FloatCandidDefinition> =
    SimpleCandidDefinitionArb('float32');

export const Float32ValueArb: fc.Arbitrary<CandidValues<number>> =
    SimpleCandidValuesArb(fc.float(), floatToSrcLiteral);
