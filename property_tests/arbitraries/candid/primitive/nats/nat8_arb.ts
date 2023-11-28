import { numberToSrcLiteral } from '../../to_src_literal/number';
import { CandidValueAndMetaArb } from '../../candid_value_and_meta_arb';
import { UNumberArb } from './index';

export const Nat8Arb = CandidValueAndMetaArb(
    UNumberArb(8),
    'nat8',
    numberToSrcLiteral
);
