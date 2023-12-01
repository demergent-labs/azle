import fc from 'fast-check';
import { CandidMetaArb } from '../candid_arb';
import { blobToSrcLiteral } from '../to_src_literal/blob';

export const BlobArb = fc
    .oneof(
        CandidMetaArb(
            fc.uint8Array(),
            'Vec(nat8)',
            'Vec<nat8>',
            blobToSrcLiteral
        ),
        CandidMetaArb(fc.uint8Array(), 'blob', 'blob', blobToSrcLiteral)
    )
    .map((sample) => ({
        ...sample,
        src: { ...sample.src, imports: new Set(['blob', 'nat8', 'Vec']) }
    }));
