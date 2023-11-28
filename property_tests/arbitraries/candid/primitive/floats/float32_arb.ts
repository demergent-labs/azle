import fc from 'fast-check';
import { CandidValueAndMetaArb } from '../../candid_arb';
import { floatToSrcLiteral } from '../../to_src_literal/float';

export const Float32Arb = CandidValueAndMetaArb(
    fc.float(),
    'float32',
    floatToSrcLiteral
);
