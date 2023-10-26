import fc from 'fast-check';
import { Candid } from '..';

export const TextArb = fc.string().map(
    (value): Candid<string> => ({
        value,
        meta: { candidType: 'text' }
    })
);
