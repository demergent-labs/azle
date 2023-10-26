import fc from 'fast-check';
import { Candid } from '../..';

export const NatArb = fc.bigUint().map(
    (value): Candid<bigint> => ({
        value,
        src: { candidType: 'nat' }
    })
);
