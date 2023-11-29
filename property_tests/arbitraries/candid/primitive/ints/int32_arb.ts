import { numberToSrcLiteral } from '../../to_src_literal/number';
import { PrimitiveCandidValueAndMetaArb } from '../../candid_value_and_meta_arb';
import { NumberArb } from './';

export const Int32Arb = PrimitiveCandidValueAndMetaArb(
    NumberArb(32),
    'int32',
    numberToSrcLiteral
);
