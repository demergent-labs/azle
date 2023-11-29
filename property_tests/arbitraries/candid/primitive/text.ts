import fc from 'fast-check';
import { PrimitiveCandidValueAndMetaArb } from '../candid_value_and_meta_arb';
import { stringToSrcLiteral } from '../to_src_literal/string';

export const TextArb = PrimitiveCandidValueAndMetaArb(
    fc.string(),
    'text',
    stringToSrcLiteral
);
