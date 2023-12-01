import fc from 'fast-check';

import { CandidMetaArb } from '../candid_arb';
import { nullToSrcLiteral } from '../to_src_literal/null';

export const NullArb = CandidMetaArb(
    fc.constant(null),
    'Null',
    nullToSrcLiteral
);
