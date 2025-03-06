import fc from 'fast-check';

import { Context } from '../../../types';
import {
    IntCandidDefinition,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValues } from '../../candid_values_arb';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { numberToSrcLiteral } from '../../to_src_literal/number';
import { NumberArb } from '.';

export function Int8Arb(
    context: Context
): fc.Arbitrary<CandidValueAndMeta<number>> {
    return CandidValueAndMetaArbGenerator(
        context,
        Int8DefinitionArb(context),
        Int8ValueArb
    );
}

export function Int8DefinitionArb(
    context: Context
): WithShapesArb<IntCandidDefinition> {
    return SimpleCandidDefinitionArb(context, 'int8');
}

export function Int8ValueArb(): fc.Arbitrary<CandidValues<number>> {
    return SimpleCandidValuesArb(NumberArb(8), numberToSrcLiteral);
}
