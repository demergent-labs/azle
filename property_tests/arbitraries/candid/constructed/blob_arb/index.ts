import fc from 'fast-check';

import { Api } from '../../../types';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { _VecNat8DefinitionArb, BlobDefinitionArb } from './definition_arb';
import { BlobValuesArb } from './values_arb';

export function BlobArb(
    api: Api
): fc.Arbitrary<CandidValueAndMeta<Uint8Array>> {
    if (api === 'class') {
        return CandidValueAndMetaArbGenerator(
            _VecNat8DefinitionArb(api),
            BlobValuesArb
        );
    }
    return fc.oneof(
        CandidValueAndMetaArbGenerator(
            _VecNat8DefinitionArb(api),
            BlobValuesArb
        ),
        CandidValueAndMetaArbGenerator(BlobDefinitionArb(api), BlobValuesArb)
    );
}
