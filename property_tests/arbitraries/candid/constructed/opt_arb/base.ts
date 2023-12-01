import fc from 'fast-check';
import { CandidValueAndMeta } from '../../value_and_meta_arb';
import { Opt } from './index';
import { CandidDefinition } from '../../definition_arb/types';
import { OptDefinitionArb } from './definition_arb';
import { OptValuesArb } from './values_arb';
import { CandidArb } from '../../complex_type_arb';

export function OptArb(
    candidDefinitionArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Opt>> {
    return CandidArb(OptDefinitionArb, OptValuesArb, candidDefinitionArb);
}
