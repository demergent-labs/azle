import fc from 'fast-check';

import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { Func } from './index';
import { CandidDefinition } from '../../candid_definition_arb/types';
import { FuncDefinitionArb } from './definition_arb';
import { FuncValueArb } from './values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';

export function FuncArb(
    candidDefinitionArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Func>> {
    return CandidValueAndMetaArbGenerator(
        FuncDefinitionArb(candidDefinitionArb),
        () => FuncValueArb
    );
}
