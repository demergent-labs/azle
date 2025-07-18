import '#experimental/build/assert_experimental';

import fc, { StringSharedConstraints } from 'fast-check';

import { Context } from '../../types';
import {
    TextCandidDefinition,
    WithShapesArb
} from '../candid_definition_arb/types';
import { CandidValueAndMeta } from '../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../candid_value_and_meta_arb_generator';
import { CandidValues } from '../candid_values_arb';
import { RecursiveShapes } from '../recursive';
import { SimpleCandidDefinitionArb } from '../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../simple_type_arbs/values_arb';
import { stringToSrcLiteral } from '../to_src_literal/string';

export interface TextConstraints extends StringSharedConstraints {
    canStartWithDigit?: boolean;
}

export function TextArb(
    context: Context<TextConstraints>
): fc.Arbitrary<CandidValueAndMeta<string>> {
    return CandidValueAndMetaArbGenerator(
        context,
        TextDefinitionArb(),
        TextValueArb
    );
}

export function TextDefinitionArb(): WithShapesArb<TextCandidDefinition> {
    return SimpleCandidDefinitionArb('text');
}

export function TextValueArb(
    context: Context<TextConstraints>,
    _?: TextCandidDefinition,
    _recShapes?: RecursiveShapes
): fc.Arbitrary<CandidValues<string>> {
    const constraints = context.constraints;
    const canStartWithDigit = constraints?.canStartWithDigit ?? true;
    const textArb = fc
        .string(constraints)
        .filter((string) => canStartWithDigit || /^\d/.test(string));
    return SimpleCandidValuesArb(textArb, stringToSrcLiteral);
}
