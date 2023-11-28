import fc from 'fast-check';
import { CandidValueAndMetaArb } from '../../candid_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';

export const NatArb = CandidValueAndMetaArb(
    fc.bigUint(),
    'nat',
    bigintToSrcLiteral
);
