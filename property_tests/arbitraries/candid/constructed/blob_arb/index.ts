import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { blobToSrcLiteral } from '../../to_src_literal/blob';
import { CandidType } from '../../candid_type';
import { BlobValuesArb } from './values';
import { _VecNat8DefinitionArb } from './definition';
import { CandidArb } from '../../complex_type_arb';

export const BlobArb = fc.oneof(
    CandidArb(_VecNat8DefinitionArb(), () => BlobValuesArb),
    SimpleCandidValueAndMetaArb(
        fc.uint8Array(),
        CandidType.Blob,
        blobToSrcLiteral
    )
);
