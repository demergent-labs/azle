import fc from 'fast-check';

import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidDefinition } from '../../candid_definition_arb/types';
import { RecordDefinitionArb } from './definition_arb';
import { RecordValuesArb } from './values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { CandidDefinitionArb } from '../../candid_definition_arb';

export type Record = {
    [x: string]: CorrespondingJSType;
};

export function RecordArb(
    candidDefinitionArb: fc.Arbitrary<CandidDefinition> = CandidDefinitionArb
): fc.Arbitrary<CandidValueAndMeta<Record>> {
    return CandidValueAndMetaArbGenerator(
        RecordDefinitionArb(candidDefinitionArb),
        RecordValuesArb
    );
}
