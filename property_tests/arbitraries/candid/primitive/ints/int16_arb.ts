import fc from 'fast-check';

import { Syntax } from '../../../types';
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

export function Int16Arb(
    syntax: Syntax
): fc.Arbitrary<CandidValueAndMeta<number>> {
    return CandidValueAndMetaArbGenerator(
        Int16DefinitionArb(syntax),
        Int16ValueArb
    );
}

export function Int16DefinitionArb(
    syntax: Syntax
): WithShapesArb<IntCandidDefinition> {
    return SimpleCandidDefinitionArb('int16', syntax);
}

export function Int16ValueArb(): fc.Arbitrary<CandidValues<number>> {
    return SimpleCandidValuesArb(NumberArb(16), numberToSrcLiteral);
}
