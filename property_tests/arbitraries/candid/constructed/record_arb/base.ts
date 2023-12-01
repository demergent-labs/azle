import fc from 'fast-check';

import { CandidValueAndMeta } from '../../value_and_meta_arb';
import { Record } from './index';
import { CandidDefinition } from '../../definition_arb/types';
import { RecordDefinitionArb } from './definition_arb';
import { RecordValuesArb } from './values_arb';
import { ComplexCandidValueAndMetaArb } from '../../complex_type_arb';

export function RecordArb(
    candidDefinitionArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Record>> {
    return ComplexCandidValueAndMetaArb(
        RecordDefinitionArb(candidDefinitionArb),
        RecordValuesArb
    );
}
