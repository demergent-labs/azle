import fc from 'fast-check';

import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { Record } from './index';
import { CandidDefinition } from '../../candid_definition_arb/types';
import { RecordDefinitionArb } from './definition_arb';
import { RecordValuesArb } from './values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';

export function RecordArb(
    candidDefinitionArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Record>> {
    return CandidValueAndMetaArbGenerator(
        RecordDefinitionArb(candidDefinitionArb),
        RecordValuesArb
    );
}
