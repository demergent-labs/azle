import fc from 'fast-check';
import { Candid } from '..';

export const NullArb = fc.constant(null).map(
    (value): Candid<null> => ({
        value,
        src: { candidType: 'Null' }
    })
);
