import { numberToSrcLiteral } from '../../to_src_literal/number';
import { CandidValueAndMetaArb } from '../../candid_arb';
import { NumberArb } from './';

export const Int32Arb = CandidValueAndMetaArb(
    NumberArb(32),
    'int32',
    numberToSrcLiteral
);
