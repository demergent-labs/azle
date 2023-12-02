import fc from 'fast-check';

import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { ReturnTuple, Tuple } from './index';
import { CandidDefinition } from '../../candid_definition_arb/types';
import { TupleDefinitionArb } from './definition_arb';
import { TupleValuesArb } from './values_arbs';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';

export function TupleArb(
    candidDefinitionArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Tuple, ReturnTuple>> {
    return CandidValueAndMetaArbGenerator(
        TupleDefinitionArb(candidDefinitionArb),
        TupleValuesArb
    );
}
