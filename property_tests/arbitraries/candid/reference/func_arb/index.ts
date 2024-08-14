import { Principal } from '@dfinity/principal';
import fc from 'fast-check';

import { Syntax } from '../../../types';
import { candidDefinitionArb } from '../../candid_definition_arb';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { FuncDefinitionArb } from './definition_arb';
import { FuncValueArb } from './values_arb';

export type Func = [Principal, string];

export function FuncArb(
    syntax: Syntax
): fc.Arbitrary<CandidValueAndMeta<Func>> {
    return CandidValueAndMetaArbGenerator(
        FuncDefinitionArb(candidDefinitionArb({}, undefined, syntax), syntax),
        FuncValueArb
    );
}
