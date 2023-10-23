import { IDL } from '@dfinity/candid';
import { EncodeVisitor } from '../encode_visitor';
import { DecodeVisitor } from '../decode_visitor';
import { VisitorData, VisitorResult } from '../types';

export function visitRec<T>(
    visitor: DecodeVisitor | EncodeVisitor,
    ty: IDL.ConstructType<T>,
    data: VisitorData
): VisitorResult {
    let candidType = data.candidType();
    if (candidType.isCanister) {
        candidType = candidType([]);
    }
    return ty.accept(visitor, {
        ...data,
        candidType
    });
}
