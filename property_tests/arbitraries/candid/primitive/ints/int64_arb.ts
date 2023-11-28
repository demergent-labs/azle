import fc from 'fast-check';
import { CandidValueAndMetaArb } from '../../candid_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';

export const Int64Arb = CandidValueAndMetaArb(
    fc.bigIntN(64),
    'int64',
    bigintToSrcLiteral
);
