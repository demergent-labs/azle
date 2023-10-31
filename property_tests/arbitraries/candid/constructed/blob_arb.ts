import fc from 'fast-check';
import { CandidArb } from '../candid_arb';
import { blobToSrcLiteral } from '../../../utils/to_src_literal/blob';

export const BlobArb = fc.oneof(
    CandidArb(fc.uint8Array(), 'Vec(nat8)', blobToSrcLiteral),
    CandidArb(fc.uint8Array(), 'blob', blobToSrcLiteral)
);
