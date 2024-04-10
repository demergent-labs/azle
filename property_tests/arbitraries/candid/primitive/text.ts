import fc, { StringSharedConstraints } from 'fast-check';

import { JsFunctionNameArb } from '../../js_function_name_arb';
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
    isJsFunctionName?: boolean;
}

export function TextArb(
    constraints?: TextConstraints
): fc.Arbitrary<CandidValueAndMeta<string>> {
    return CandidValueAndMetaArbGenerator(
        TextDefinitionArb(),
        TextValueArb,
        constraints
    );
}

export function TextDefinitionArb(): WithShapesArb<TextCandidDefinition> {
    return SimpleCandidDefinitionArb('text');
}

export function TextValueArb(
    _?: TextCandidDefinition,
    _recShapes?: RecursiveShapes,
    constraints?: TextConstraints
): fc.Arbitrary<CandidValues<string>> {
    const canStartWithDigit = constraints?.canStartWithDigit ?? true;
    const isJSName = constraints?.isJsFunctionName ?? false;
    const textArb = isJSName
        ? JsFunctionNameArb
        : fc
              .string(constraints)
              .filter((string) => canStartWithDigit || /^\d/.test(string));
    return SimpleCandidValuesArb(textArb, stringToSrcLiteral);
}
