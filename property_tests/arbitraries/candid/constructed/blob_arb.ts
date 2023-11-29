import fc from 'fast-check';
import {
    CandidValueAndMeta,
    OldPrimitiveCandidValueAndMetaArb,
    PrimitiveCandidValueAndMetaArb
} from '../candid_value_and_meta_arb';
import { blobToSrcLiteral } from '../to_src_literal/blob';
import { CandidClass } from '../candid_class';

export const BlobArb = fc
    .oneof(
        OldPrimitiveCandidValueAndMetaArb(
            fc.uint8Array(),
            'Vec(nat8)',
            blobToSrcLiteral
        ),
        PrimitiveCandidValueAndMetaArb(
            fc.uint8Array(),
            CandidClass.Blob,
            blobToSrcLiteral
        )
    )
    .map(
        (sample): CandidValueAndMeta<Uint8Array> => ({
            ...sample,
            src: { ...sample.src, imports: new Set(['blob', 'nat8', 'Vec']) }
        })
    );
