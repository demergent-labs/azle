import fc from 'fast-check';

import { Context } from '../../../types';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { _VecNat8DefinitionArb, BlobDefinitionArb } from './definition_arb';
import { BlobValuesArb } from './values_arb';

export function BlobArb(
    context: Context
): fc.Arbitrary<CandidValueAndMeta<Uint8Array>> {
    if (context.api === 'class') {
        return CandidValueAndMetaArbGenerator(
            context,
            _VecNat8DefinitionArb(context),
            BlobValuesArb
        );
    }
    return fc.oneof(
        CandidValueAndMetaArbGenerator(
            context,
            _VecNat8DefinitionArb(context),
            BlobValuesArb
        ),
        CandidValueAndMetaArbGenerator(
            context,
            BlobDefinitionArb(context),
            BlobValuesArb
        )
    );
}
