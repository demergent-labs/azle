import fc from 'fast-check';
import { CandidValueAndMetaArb } from '../../candid_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';

export const IntArb = CandidValueAndMetaArb(
    fc.bigInt(),
    'int',
    bigintToSrcLiteral
);
