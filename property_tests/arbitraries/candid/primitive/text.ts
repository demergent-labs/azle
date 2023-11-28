import fc from 'fast-check';
import { CandidValueAndMetaArb } from '../candid_arb';
import { stringToSrcLiteral } from '../to_src_literal/string';

export const TextArb = CandidValueAndMetaArb(
    fc.string(),
    'text',
    stringToSrcLiteral
);
