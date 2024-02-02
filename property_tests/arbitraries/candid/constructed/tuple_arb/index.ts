import { CorrespondingJSType } from '../../corresponding_js_type';
import { candidDefinitionArb } from '../../candid_definition_arb';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { TupleDefinitionArb } from './definition_arb';
import { TupleValuesArb } from './values_arbs';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import fc from 'fast-check';
import { CandidValueConstraints } from '../../candid_values_arb';

export type Tuple = CorrespondingJSType[];
export type ReturnTuple = Tuple | {};

export function TupleArb(
    constraints?: CandidValueConstraints
): fc.Arbitrary<CandidValueAndMeta<Tuple, ReturnTuple>> {
    return CandidValueAndMetaArbGenerator(
        TupleDefinitionArb(candidDefinitionArb({})),
        TupleValuesArb,
        constraints
    );
}
