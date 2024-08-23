import fc from 'fast-check';

import { Context } from '../../../types';
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
    context: Context
): fc.Arbitrary<CandidValueAndMeta<number>> {
    return CandidValueAndMetaArbGenerator(
        context,
        Nat16DefinitionArb(context),
        Nat16ValueArb
    );
}

export function Nat16DefinitionArb(
    context: Context
): WithShapesArb<NatCandidDefinition> {
    return SimpleCandidDefinitionArb(context, 'nat16');
}

export function Nat16ValueArb(): fc.Arbitrary<CandidValues<number>> {
    return SimpleCandidValuesArb(UNumberArb(16), numberToSrcLiteral);
}
