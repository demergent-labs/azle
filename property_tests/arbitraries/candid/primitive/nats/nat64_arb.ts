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
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';

export function Nat64Arb(
    context: Context
): fc.Arbitrary<CandidValueAndMeta<bigint>> {
    return CandidValueAndMetaArbGenerator(
        context,
        Nat64DefinitionArb(context),
        Nat64ValueArb
    );
}

export function Nat64DefinitionArb(
    context: Context
): WithShapesArb<NatCandidDefinition> {
    return SimpleCandidDefinitionArb(context, 'nat64');
}

export function Nat64ValueArb(): fc.Arbitrary<CandidValues<bigint>> {
    return SimpleCandidValuesArb(fc.bigUintN(60), bigintToSrcLiteral); // TODO set back to 64 once https://github.com/second-state/wasmedge-quickjs/issues/125
}
