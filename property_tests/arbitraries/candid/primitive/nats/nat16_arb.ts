import fc from 'fast-check';

import { Syntax } from '../../../types';
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

export function Nat16Arb(
    syntax: Syntax
): fc.Arbitrary<CandidValueAndMeta<number>> {
    return CandidValueAndMetaArbGenerator(
        Nat16DefinitionArb(syntax),
        Nat16ValueArb
    );
}

export function Nat16DefinitionArb(
    syntax: Syntax
): WithShapesArb<NatCandidDefinition> {
    return SimpleCandidDefinitionArb('nat16', syntax);
}

export function Nat16ValueArb(): fc.Arbitrary<CandidValues<number>> {
    return SimpleCandidValuesArb(UNumberArb(16), numberToSrcLiteral);
}
