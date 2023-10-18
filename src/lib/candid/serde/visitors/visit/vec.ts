import { IDL } from '@dfinity/candid';
import { EncodeVisitor } from '../encode_visitor';
import { DecodeVisitor } from '../decode_visitor';
import { VisitorData, VisitorResult } from '../types';

export function visitVec(
    visitor: DecodeVisitor | EncodeVisitor,
    ty: IDL.Type<any>,
    data: VisitorData
): VisitorResult {
    if (ty instanceof IDL.PrimitiveType) {
        return data.js_data;
    }
    return data.js_data.map((array_elem: any) => {
        return ty.accept(visitor, {
            js_data: array_elem,
            candidType: data.candidType.innerType
        });
    });
}
