import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../simple_type_arbs/value_and_meta_arb';
import { stringToSrcLiteral } from '../to_src_literal/string';
import { CandidType } from '../candid_type';

export const TextArb = SimpleCandidValueAndMetaArb(
    fc.string(),
    CandidType.Text,
    stringToSrcLiteral
);
