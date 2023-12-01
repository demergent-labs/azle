import fc from 'fast-check';

import { CandidValueAndMeta } from '../../value_and_meta_arb';
import { ReturnTuple, Tuple } from './index';
import { CandidDefinition } from '../../definition_arb/types';
import { TupleDefinitionArb } from './definition_arb';
import { TupleValuesArb } from './values_arbs';
import { ComplexCandidValueAndMetaArb } from '../../complex_type_arb';

export function TupleArb(
    candidDefinitionArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Tuple, ReturnTuple>> {
    return ComplexCandidValueAndMetaArb(
        TupleDefinitionArb(candidDefinitionArb),
        TupleValuesArb
    );
}
