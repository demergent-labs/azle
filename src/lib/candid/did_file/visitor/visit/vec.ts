import { IDL } from '@dfinity/candid';
import { DidVisitor, VisitorData, VisitorResult } from '../did_visitor';

export function visitVec<T>(
    ty: IDL.Type<T>,
    didVisitor: DidVisitor,
    data: VisitorData
): VisitorResult {
    const candid = ty.accept(didVisitor, { ...data, isOnService: false });
    return [`vec ${candid[0]}`, candid[1]];
}
