import { numberToSrcLiteral } from '../../to_src_literal/number';
import { CandidMetaArb } from '../../candid_arb';
import { UNumberArb } from './index';

export const Nat32Arb = CandidMetaArb(
    UNumberArb(32),
    'nat32',
    numberToSrcLiteral
);
