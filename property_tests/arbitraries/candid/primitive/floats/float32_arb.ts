import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { floatToSrcLiteral } from '../../to_src_literal/float';
import { CandidType } from '../../candid_type';

export const Float32Arb = SimpleCandidValueAndMetaArb(
    fc.float(),
    CandidType.Float32,
    floatToSrcLiteral
);
