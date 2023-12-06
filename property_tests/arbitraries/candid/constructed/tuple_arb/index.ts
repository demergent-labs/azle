import { CorrespondingJSType } from '../../corresponding_js_type';
import { candidDefinitionArb } from '../../candid_definition_arb';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidDefinition } from '../../candid_definition_arb/types';
import { TupleDefinitionArb } from './definition_arb';
import { TupleValuesArb } from './values_arbs';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import fc from 'fast-check';

export type Tuple = CorrespondingJSType[];
export type ReturnTuple = Tuple | {};

export function TupleArb(
    fieldCandidDefinitionArb: fc.Arbitrary<CandidDefinition> = candidDefinitionArb()
): fc.Arbitrary<CandidValueAndMeta<Tuple, ReturnTuple>> {
    return CandidValueAndMetaArbGenerator(
        TupleDefinitionArb(fieldCandidDefinitionArb),
        TupleValuesArb
    );
}
