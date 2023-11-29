import fc from 'fast-check';
import { PrimitiveCandidValueAndMetaArb } from '../../candid_value_and_meta_arb';
import { floatToSrcLiteral } from '../../to_src_literal/float';

export const Float64Arb = PrimitiveCandidValueAndMetaArb(
    fc.float64Array({ maxLength: 1, minLength: 1 }).map((sample) => sample[0]),
    'float64',
    floatToSrcLiteral
);
