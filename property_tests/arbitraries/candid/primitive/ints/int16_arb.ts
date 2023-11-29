import { numberToSrcLiteral } from '../../to_src_literal/number';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { NumberArb } from './';
import { CandidType } from '../../candid_type';

export const Int16Arb = SimpleCandidValueAndMetaArb(
    NumberArb(16),
    CandidType.Int16,
    numberToSrcLiteral
);
