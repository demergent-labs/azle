import fc from 'fast-check';
import { Principal } from '@dfinity/principal';

import { CandidDefinitionArb } from '../../candid_definition_arb';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidDefinition } from '../../candid_definition_arb/types';
import { FuncDefinitionArb } from './definition_arb';
import { FuncValueArb } from './values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';

export type Func = [Principal, string];

export function FuncArb(
    candidDefinitionArb: fc.Arbitrary<CandidDefinition> = CandidDefinitionArb
): fc.Arbitrary<CandidValueAndMeta<Func>> {
    return CandidValueAndMetaArbGenerator(
        FuncDefinitionArb(candidDefinitionArb),
        FuncValueArb
    );
}
