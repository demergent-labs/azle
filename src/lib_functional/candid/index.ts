export * from './reference';
import { IDL } from '@dfinity/candid';
import { AzleVec, AzleOpt } from '../../lib_new';

export type TypeMapping<T> = T extends IDL.TextClass
    ? string
    : T extends never[]
    ? void
    : T extends AzleVec<infer U>
    ? TypeMapping<U>[]
    : T extends AzleOpt<infer U>
    ? [TypeMapping<U>] | []
    : T;
