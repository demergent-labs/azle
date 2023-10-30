import fc from 'fast-check';
import { CandidArb } from '../candid_arb';

export const BlobArb = fc.oneof(
    CandidArb(fc.uint8Array(), 'Vec(nat8)'),
    CandidArb(fc.uint8Array(), 'blob')
);
