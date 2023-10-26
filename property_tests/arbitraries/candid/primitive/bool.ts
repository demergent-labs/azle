import fc from 'fast-check';
import { Candid } from '..';

export const BoolArb = fc.boolean().map(
    (value): Candid<boolean> => ({
        value,
        src: { candidType: 'bool', imports: new Set(['bool']) }
    })
);
