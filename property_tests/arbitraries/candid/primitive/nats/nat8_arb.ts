import { numberToSrcLiteral } from '../../to_src_literal/number';
import { CandidMetaArb } from '../../candid_arb';
import { UNumberArb } from './index';

export const Nat8Arb = CandidMetaArb(
    UNumberArb(8),
    'nat8',
    'nat8',
    numberToSrcLiteral
);
