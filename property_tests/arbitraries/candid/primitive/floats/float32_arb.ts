import fc from 'fast-check';
import { CandidMetaArb } from '../../candid_arb';
import { floatToSrcLiteral } from '../../to_src_literal/float';

export const Float32Arb = CandidMetaArb(
    fc.float(),
    'float32',
    floatToSrcLiteral
);
