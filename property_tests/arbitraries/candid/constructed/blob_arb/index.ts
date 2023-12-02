import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { blobToSrcLiteral } from '../../to_src_literal/blob';
import { BlobValuesArb } from './values_arb';
import { _VecNat8DefinitionArb } from './definition_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';

export const BlobArb = fc.oneof(
    CandidValueAndMetaArbGenerator(_VecNat8DefinitionArb(), BlobValuesArb),
    SimpleCandidValueAndMetaArb(fc.uint8Array(), 'blob', blobToSrcLiteral)
);
