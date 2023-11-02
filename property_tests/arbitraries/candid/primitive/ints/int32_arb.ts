import { numberToSrcLiteral } from '../../to_src_literal/number';
import { CandidMetaArb } from '../../candid_arb';
import { NumberArb } from './';

export const Int32Arb = CandidMetaArb(
    NumberArb(32),
    'int32',
    numberToSrcLiteral
);
