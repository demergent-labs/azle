import { numberToSrcLiteral } from '../../to_src_literal/number';
import { CandidValueAndMetaArb } from '../../candid_value_and_meta_arb';
import { UNumberArb } from './index';

export const Nat16Arb = CandidValueAndMetaArb(
    UNumberArb(16),
    'nat16',
    numberToSrcLiteral
);
