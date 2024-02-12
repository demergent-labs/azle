import fc from 'fast-check';
import { Principal } from '@dfinity/principal';

import { candidDefinitionArb } from '../../candid_definition_arb';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { FuncDefinitionArb } from './definition_arb';
import { FuncValueArb } from './values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValueConstraints } from '../../candid_values_arb';

export type Func = [Principal, string];

export function FuncArb(
    constraints?: CandidValueConstraints
): fc.Arbitrary<CandidValueAndMeta<Func>> {
    return CandidValueAndMetaArbGenerator(
        FuncDefinitionArb(candidDefinitionArb({})),
        FuncValueArb
    );
}
