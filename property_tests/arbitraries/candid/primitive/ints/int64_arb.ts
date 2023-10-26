import fc from 'fast-check';
import { Candid } from '../..';

export const Int64Arb = fc.bigIntN(64).map(
    (value): Candid<bigint> => ({
        value,
        src: { candidType: 'int64' }
    })
);
