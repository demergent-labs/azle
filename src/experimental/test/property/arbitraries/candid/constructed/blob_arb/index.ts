import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { Context } from '../../../types';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { BlobDefinitionArb } from './definition_arb';
import { BlobValuesArb } from './values_arb';

export function BlobArb(
    context: Context
): fc.Arbitrary<CandidValueAndMeta<Uint8Array>> {
    return CandidValueAndMetaArbGenerator(
        context,
        BlobDefinitionArb(),
        BlobValuesArb
    );
}
