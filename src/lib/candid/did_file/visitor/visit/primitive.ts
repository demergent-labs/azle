import { IDL } from '@dfinity/candid';
import { VisitorResult } from '..';

export function visitPrimitive<T>(t: IDL.PrimitiveType<T>): VisitorResult {
    return [t.display(), {}];
}
