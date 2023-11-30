import fc from 'fast-check';
import { Principal } from '@dfinity/principal';
import { SimpleCandidValueAndMetaArb } from '../simple_type_arbs/value_and_meta_arb';
import { principalToSrcLiteral } from '../to_src_literal/principal';
import { CandidType } from '../candid_type';
import { SimpleCandidShapeArb } from '../simple_type_arbs/shape_arb';
import { SimpleCandidValueArb } from '../simple_type_arbs/value_arb';
import { CandidValues, PrincipalCandidDefinition } from '../candid_meta_arb';

export const PrincipalArb = SimpleCandidValueAndMetaArb(
    principal(),
    CandidType.Principal,
    principalToSrcLiteral
);

export const PrincipalDefinitionArb: fc.Arbitrary<PrincipalCandidDefinition> =
    SimpleCandidShapeArb(CandidType.Principal);

export const PrincipalValueArb: fc.Arbitrary<CandidValues<Principal>> =
    SimpleCandidValueArb(principal(), principalToSrcLiteral);

function principal() {
    return fc
        .uint8Array({
            minLength: 29,
            maxLength: 29
        })
        .map((sample) => Principal.fromUint8Array(sample));
}
