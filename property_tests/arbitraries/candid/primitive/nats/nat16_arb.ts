import { numberToSrcLiteral } from '../../to_src_literal/number';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { UNumberArb } from './index';
import { CandidType } from '../../candid_type';

export const Nat16Arb = SimpleCandidValueAndMetaArb(
    UNumberArb(16),
    CandidType.Nat16,
    numberToSrcLiteral
);
