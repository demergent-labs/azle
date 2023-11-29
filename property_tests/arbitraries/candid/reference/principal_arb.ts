import fc from 'fast-check';
import { Principal } from '@dfinity/principal';
import { SimpleCandidValueAndMetaArb } from '../simple_type_arbs/value_and_meta_arb';
import { principalToSrcLiteral } from '../to_src_literal/principal';
import { CandidType } from '../candid_type';

export const PrincipalArb = SimpleCandidValueAndMetaArb(
    fc
        .uint8Array({
            minLength: 29,
            maxLength: 29
        })
        .map((sample) => Principal.fromUint8Array(sample)),
    CandidType.Principal,
    principalToSrcLiteral
);
