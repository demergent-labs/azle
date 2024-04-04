import fc from 'fast-check';

import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { _VecNat8DefinitionArb, BlobDefinitionArb } from './definition_arb';
import { BlobValuesArb } from './values_arb';

export function BlobArb(): fc.Arbitrary<CandidValueAndMeta<Uint8Array>> {
    return fc.oneof(
        CandidValueAndMetaArbGenerator(_VecNat8DefinitionArb(), BlobValuesArb),
        CandidValueAndMetaArbGenerator(BlobDefinitionArb(), BlobValuesArb)
    );
}
