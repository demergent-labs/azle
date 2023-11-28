import fc from 'fast-check';
import {
    CandidValueAndMeta,
    CandidValueAndMetaArb
} from '../candid_value_and_meta_arb';
import { blobToSrcLiteral } from '../to_src_literal/blob';

export const BlobArb = fc
    .oneof(
        CandidValueAndMetaArb(fc.uint8Array(), 'Vec(nat8)', blobToSrcLiteral),
        CandidValueAndMetaArb(fc.uint8Array(), 'blob', blobToSrcLiteral)
    )
    .map(
        (sample): CandidValueAndMeta<Uint8Array> => ({
            ...sample,
            src: { ...sample.src, imports: new Set(['blob', 'nat8', 'Vec']) }
        })
    );
