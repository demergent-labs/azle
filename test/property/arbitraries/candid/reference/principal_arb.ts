import { Principal } from '@dfinity/principal';
import fc from 'fast-check';

import { Context } from '../../types';
import {
    PrincipalCandidDefinition,
    WithShapesArb
} from '../candid_definition_arb/types';
import { CandidValueAndMeta } from '../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../candid_value_and_meta_arb_generator';
import { CandidValues } from '../candid_values_arb';
import { SimpleCandidDefinitionArb } from '../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../simple_type_arbs/values_arb';
import { principalToSrcLiteral } from '../to_src_literal/principal';

export function PrincipalArb(
    context: Context
): fc.Arbitrary<CandidValueAndMeta<Principal>> {
    return CandidValueAndMetaArbGenerator(
        context,
        PrincipalDefinitionArb(context),
        PrincipalValueArb
    );
}

export function PrincipalDefinitionArb(
    context: Context
): WithShapesArb<PrincipalCandidDefinition> {
    return SimpleCandidDefinitionArb(context, 'Principal');
}

export function PrincipalValueArb(): fc.Arbitrary<CandidValues<Principal>> {
    return SimpleCandidValuesArb(principal(), principalToSrcLiteral);
}

function principal(): fc.Arbitrary<Principal> {
    return fc
        .uint8Array({
            minLength: 29,
            maxLength: 29
        })
        .map((sample) => Principal.fromUint8Array(sample));
}
