import fc from 'fast-check';

import { CandidValues } from '../../candid_values_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { blobToSrcLiteral } from '../../to_src_literal/blob';
import { _VecNat8DefinitionArb } from './definition_arb';

export function BlobValuesArb(): fc.Arbitrary<CandidValues<Uint8Array>> {
    return SimpleCandidValuesArb(fc.uint8Array(), blobToSrcLiteral);
}
