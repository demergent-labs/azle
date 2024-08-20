import fc from 'fast-check';

import { Api } from '../../../types';
import { candidDefinitionArb } from '../../candid_definition_arb';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValueConstraints } from '../../candid_values_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { TupleDefinitionArb } from './definition_arb';
import { TupleValuesArb } from './values_arbs';

export type Tuple = CorrespondingJSType[];
export type ReturnTuple = Tuple | Record<string, never>;

export function TupleArb(
    api: Api,
    constraints?: CandidValueConstraints
): fc.Arbitrary<CandidValueAndMeta<Tuple, ReturnTuple>> {
    return CandidValueAndMetaArbGenerator(
        TupleDefinitionArb(candidDefinitionArb({}, undefined, api), api),
        TupleValuesArb,
        constraints
    );
}
