import { numberToSrcLiteral } from '../../to_src_literal/number';
import { CandidValueAndMetaArb } from '../../candid_arb';
import { UNumberArb } from './index';

export const Nat32Arb = CandidValueAndMetaArb(
    UNumberArb(32),
    'nat32',
    numberToSrcLiteral
);
