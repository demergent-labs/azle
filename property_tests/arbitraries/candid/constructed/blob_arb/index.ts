import fc from 'fast-check';

import { Syntax } from '../../../types';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { _VecNat8DefinitionArb, BlobDefinitionArb } from './definition_arb';
import { BlobValuesArb } from './values_arb';

export function BlobArb(
    syntax: Syntax
): fc.Arbitrary<CandidValueAndMeta<Uint8Array>> {
    if (syntax === 'class') {
        return CandidValueAndMetaArbGenerator(
            _VecNat8DefinitionArb(syntax),
            BlobValuesArb
        );
    }
    return fc.oneof(
        CandidValueAndMetaArbGenerator(
            _VecNat8DefinitionArb(syntax),
            BlobValuesArb
        ),
        CandidValueAndMetaArbGenerator(BlobDefinitionArb(syntax), BlobValuesArb)
    );
}
