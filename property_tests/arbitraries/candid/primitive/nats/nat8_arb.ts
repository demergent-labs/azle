import { numberToSrcLiteral } from '../../to_src_literal/number';
import { CandidValueAndMetaArb } from '../../candid_arb';
import { UNumberArb } from './index';

export const Nat8Arb = CandidValueAndMetaArb(
    UNumberArb(8),
    'nat8',
    numberToSrcLiteral
);
