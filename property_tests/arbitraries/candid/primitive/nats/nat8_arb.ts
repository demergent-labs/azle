import fc from 'fast-check';

import {
    NatCandidDefinition,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValues } from '../../candid_values_arb';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { numberToSrcLiteral } from '../../to_src_literal/number';
import { UNumberArb } from './index';

export function Nat8Arb(): fc.Arbitrary<CandidValueAndMeta<number>> {
    return CandidValueAndMetaArbGenerator(Nat8DefinitionArb(), Nat8ValueArb);
}

export function Nat8DefinitionArb(): WithShapesArb<NatCandidDefinition> {
    return SimpleCandidDefinitionArb('nat8');
}

export function Nat8ValueArb(): fc.Arbitrary<CandidValues<number>> {
    return SimpleCandidValuesArb(UNumberArb(8), numberToSrcLiteral);
}
