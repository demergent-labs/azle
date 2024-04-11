import fc from 'fast-check';

import { candidDefinitionArb } from '../../candid_definition_arb';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValueConstraints } from '../../candid_values_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { RecordDefinitionArb } from './definition_arb';
import { RecordValuesArb } from './values_arb';

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
