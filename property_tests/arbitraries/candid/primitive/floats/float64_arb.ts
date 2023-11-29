import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { floatToSrcLiteral } from '../../to_src_literal/float';
import { CandidType } from '../../candid_type';

export const Float64Arb = SimpleCandidValueAndMetaArb(
    fc.float64Array({ maxLength: 1, minLength: 1 }).map((sample) => sample[0]),
    CandidType.Float64,
    floatToSrcLiteral
);
