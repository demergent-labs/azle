import fc from 'fast-check';
import { PrimitiveCandidValueAndMetaArb } from '../candid_value_and_meta_arb';
import { stringToSrcLiteral } from '../to_src_literal/string';
import { CandidClass } from '../candid_meta_arb';

export const TextArb = PrimitiveCandidValueAndMetaArb(
    fc.string(),
    CandidClass.Text,
    stringToSrcLiteral
);
