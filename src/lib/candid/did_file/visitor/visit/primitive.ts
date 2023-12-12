import { IDL } from '@dfinity/candid';
import { VisitorResult } from '../did_visitor';

export function visitPrimitive<T>(t: IDL.PrimitiveType<T>): VisitorResult {
    return [t.display(), {}];
}
