import fc from 'fast-check';
import {
    PrimitiveCandidMetaArb,
    PrimitiveCandidValueAndMetaArb,
    PrimitiveCandidValueArb
} from '../candid_value_and_meta_arb';
import { booleanToSrcLiteral } from '../to_src_literal/boolean';
import { BoolCandidMeta, CandidValues } from '../candid_meta_arb';
import { CandidClass } from '../candid_class';

export const BoolArb = PrimitiveCandidValueAndMetaArb(
    fc.boolean(),
    CandidClass.Bool,
    booleanToSrcLiteral
);

export const BoolTypeArb: fc.Arbitrary<BoolCandidMeta> = PrimitiveCandidMetaArb(
    CandidClass.Bool
);

export const BoolValueArb: fc.Arbitrary<CandidValues<boolean>> =
    PrimitiveCandidValueArb(fc.boolean(), booleanToSrcLiteral);
