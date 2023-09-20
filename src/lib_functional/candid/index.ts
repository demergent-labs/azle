export * from './reference';
import { IDL } from '@dfinity/candid';

export type TypeMapping<T> = T extends IDL.TextClass
    ? string
    : T extends never[]
    ? void
    : T;
