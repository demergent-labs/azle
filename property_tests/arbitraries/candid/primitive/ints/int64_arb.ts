import fc from 'fast-check';

import { CandidMetaArb } from '../../candid_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';

export const Int64Arb = CandidMetaArb(
    fc.bigIntN(64),
    'int64',
    bigintToSrcLiteral
);
