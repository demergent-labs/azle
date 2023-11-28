import fc from 'fast-check';
import { CandidValueAndMetaArb } from '../candid_value_and_meta_arb';
import { stringToSrcLiteral } from '../to_src_literal/string';

export const TextArb = CandidValueAndMetaArb(
    fc.string(),
    'text',
    stringToSrcLiteral
);
