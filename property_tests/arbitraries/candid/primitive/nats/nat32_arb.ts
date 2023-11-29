import { numberToSrcLiteral } from '../../to_src_literal/number';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { UNumberArb } from './index';
import { CandidType } from '../../candid_type';

export const Nat32Arb = SimpleCandidValueAndMetaArb(
    UNumberArb(32),
    CandidType.Nat32,
    numberToSrcLiteral
);
