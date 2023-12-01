import fc from 'fast-check';
import { Principal } from '@dfinity/principal';
import { SimpleCandidValueAndMetaArb } from '../simple_type_arbs/value_and_meta_arb';
import { principalToSrcLiteral } from '../to_src_literal/principal';
import { CandidType } from '../candid_type';
import { SimpleCandidDefinitionArb } from '../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../simple_type_arbs/values_arb';
import { PrincipalCandidDefinition } from '../definition_arb/types';
import { CandidValues } from '../values';

export const PrincipalArb = SimpleCandidValueAndMetaArb(
    principal(),
    CandidType.Principal,
    principalToSrcLiteral
);

export const PrincipalDefinitionArb: fc.Arbitrary<PrincipalCandidDefinition> =
    SimpleCandidDefinitionArb(CandidType.Principal);

export const PrincipalValueArb: fc.Arbitrary<CandidValues<Principal>> =
    SimpleCandidValuesArb(principal(), principalToSrcLiteral);

function principal() {
    return fc
        .uint8Array({
            minLength: 29,
            maxLength: 29
        })
        .map((sample) => Principal.fromUint8Array(sample));
}
