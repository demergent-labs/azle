import fc from 'fast-check';
import { Principal } from '@dfinity/principal';
import { CandidArb } from '../candid_arb';
import { principalToSrcLiteral } from '../to_src_literal/principal';

export const PrincipalArb = CandidArb(
    fc
        .uint8Array({
            minLength: 29,
            maxLength: 29
        })
        .map((sample) => Principal.fromUint8Array(sample)),
    'Principal',
    principalToSrcLiteral,
    (a, b) => a.toText() === b.toText()
);
