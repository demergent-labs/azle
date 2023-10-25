import fc from 'fast-check';
import { Principal } from '@dfinity/principal';

export const PrincipalArb = fc
    .uint8Array({
        minLength: 29,
        maxLength: 29
    })
    .map((sample) => Principal.fromUint8Array(sample));
