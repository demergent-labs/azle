import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../simple_type_arbs/value_and_meta_arb';
import { stringToSrcLiteral } from '../to_src_literal/string';
import { CandidType } from '../candid_type';
import { CandidValues, TextCandidMeta } from '../candid_meta_arb';
import { SimpleCandidValueArb } from '../simple_type_arbs/value_arb';
import { SimpleCandidShapeArb } from '../simple_type_arbs/shape_arb';

export const TextArb = SimpleCandidValueAndMetaArb(
    fc.string(),
    CandidType.Text,
    stringToSrcLiteral
);

export const TextTypeArb: fc.Arbitrary<TextCandidMeta> = SimpleCandidShapeArb(
    CandidType.Text
);

export const TextValueArb: fc.Arbitrary<CandidValues<string>> =
    SimpleCandidValueArb(fc.string(), stringToSrcLiteral);
