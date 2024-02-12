import fc from 'fast-check';

import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { RecordDefinitionArb } from './definition_arb';
import { RecordValuesArb } from './values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { candidDefinitionArb } from '../../candid_definition_arb';
import { CandidValueConstraints } from '../../candid_values_arb';

export type Record = {
    [x: string]: CorrespondingJSType;
};

export function RecordArb(
    constraints?: CandidValueConstraints
): fc.Arbitrary<CandidValueAndMeta<Record>> {
    return CandidValueAndMetaArbGenerator(
        RecordDefinitionArb(candidDefinitionArb({})),
        RecordValuesArb,
        constraints
    );
}
