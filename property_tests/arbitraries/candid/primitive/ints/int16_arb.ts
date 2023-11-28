import { numberToSrcLiteral } from '../../to_src_literal/number';
import { CandidValueAndMetaArb } from '../../candid_arb';
import { NumberArb } from './';

export const Int16Arb = CandidValueAndMetaArb(
    NumberArb(16),
    'int16',
    numberToSrcLiteral
);
