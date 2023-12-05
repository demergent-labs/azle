import fc from 'fast-check';
import { BlobValuesArb } from './values_arb';
import { BlobDefinitionArb, _VecNat8DefinitionArb } from './definition_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';

export function BlobArb(): fc.Arbitrary<CandidValueAndMeta<Uint8Array>> {
    return fc.oneof(
        CandidValueAndMetaArbGenerator(_VecNat8DefinitionArb(), BlobValuesArb),
        CandidValueAndMetaArbGenerator(BlobDefinitionArb(), BlobValuesArb)
    );
}
