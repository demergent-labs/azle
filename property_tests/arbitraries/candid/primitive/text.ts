import fc from 'fast-check';

import { CandidMetaArb } from '../candid_arb';
import { stringToSrcLiteral } from '../to_src_literal/string';

export const TextArb = CandidMetaArb(fc.string(), 'text', stringToSrcLiteral);
