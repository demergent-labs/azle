import fc from 'fast-check';
import { PrimitiveCandidValueAndMetaArb } from '../../candid_value_and_meta_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';
import { CandidClass } from '../../candid_class';

export const NatArb = PrimitiveCandidValueAndMetaArb(
    fc.bigUint(),
    CandidClass.Nat,
    bigintToSrcLiteral
);
