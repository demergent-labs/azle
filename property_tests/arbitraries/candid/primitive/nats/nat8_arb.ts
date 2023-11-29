import { numberToSrcLiteral } from '../../to_src_literal/number';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { UNumberArb } from './index';
import { CandidType } from '../../candid_type';

export const Nat8Arb = SimpleCandidValueAndMetaArb(
    UNumberArb(8),
    CandidType.Nat8,
    numberToSrcLiteral
);
