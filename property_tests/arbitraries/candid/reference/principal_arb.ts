import fc from 'fast-check';
import { Principal } from '@dfinity/principal';
import { PrimitiveCandidValueAndMetaArb } from '../candid_value_and_meta_arb';
import { principalToSrcLiteral } from '../to_src_literal/principal';

export const PrincipalArb = PrimitiveCandidValueAndMetaArb(
    fc
        .uint8Array({
            minLength: 29,
            maxLength: 29
        })
        .map((sample) => Principal.fromUint8Array(sample)),
    'Principal',
    principalToSrcLiteral
);
