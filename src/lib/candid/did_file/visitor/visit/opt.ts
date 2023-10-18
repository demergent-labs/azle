import { IDL } from '@dfinity/candid';
import { DidVisitor, VisitorData, VisitorResult } from '../did_visitor';

export function visitOpt<T>(
    ty: IDL.Type<T>,
    didVisitor: DidVisitor,
    data: VisitorData
): VisitorResult {
    const candid = ty.accept(didVisitor, { ...data, isOnService: false });
    return [`opt ${candid[0]}`, candid[1]];
}
