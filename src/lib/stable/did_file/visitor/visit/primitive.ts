import { IDL } from '@dfinity/candid';

import { VisitorResult } from '../did_visitor';

/**
 * @internal
 * Visitor for primitive types in Candid generation.
 */
export function visitPrimitive<T>(t: IDL.PrimitiveType<T>): VisitorResult {
    return [t.display(), {}];
}
