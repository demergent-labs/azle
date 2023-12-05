import fc from 'fast-check';
import { Principal } from '@dfinity/principal';
import { principalToSrcLiteral } from '../to_src_literal/principal';
import { SimpleCandidDefinitionArb } from '../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../simple_type_arbs/values_arb';
import { PrincipalCandidDefinition } from '../candid_definition_arb/types';
import { CandidValues } from '../candid_values_arb';
import { CandidValueAndMeta } from '../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../candid_value_and_meta_arb_generator';

export function PrincipalArb(): fc.Arbitrary<CandidValueAndMeta<Principal>> {
    return CandidValueAndMetaArbGenerator(
        PrincipalDefinitionArb(),
        PrincipalValueArb
    );
}

export function PrincipalDefinitionArb(): fc.Arbitrary<PrincipalCandidDefinition> {
    return SimpleCandidDefinitionArb('Principal');
}

export function PrincipalValueArb(): fc.Arbitrary<CandidValues<Principal>> {
    return SimpleCandidValuesArb(principal(), principalToSrcLiteral);
}

function principal() {
    return fc
        .uint8Array({
            minLength: 29,
            maxLength: 29
        })
        .map((sample) => Principal.fromUint8Array(sample));
}
