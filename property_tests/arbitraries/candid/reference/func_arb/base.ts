import fc from 'fast-check';

import { CandidValueAndMeta } from '../../value_and_meta_arb';
import { Func } from './index';
import { CandidDefinition } from '../../definition_arb/types';
import { FuncDefinitionArb } from './definition_arb';
import { FuncValueArb } from './values_arb';
import { CandidArb } from '../../complex_type_arb';

export function FuncArb(
    candidDefinitionArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Func>> {
    return CandidArb(
        FuncDefinitionArb,
        () => FuncValueArb,
        candidDefinitionArb
    );
}
