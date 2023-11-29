import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../simple_type_arbs/value_and_meta_arb';
import { blobToSrcLiteral } from '../to_src_literal/blob';
import { CandidType } from '../candid_type';
import { OldSimpleCandidValueAndMetaArb } from '../simple_type_arbs/old_value_and_meta_arb';

export const BlobArb = fc.oneof(
    OldSimpleCandidValueAndMetaArb(
        fc.uint8Array(),
        'Vec(nat8)',
        new Set(['Vec', 'nat8']),
        blobToSrcLiteral
    ),
    SimpleCandidValueAndMetaArb(
        fc.uint8Array(),
        CandidType.Blob,
        blobToSrcLiteral
    )
);
