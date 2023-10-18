import { IDL } from '@dfinity/candid';
import { EncodeVisitor } from '../encode_visitor';
import { DecodeVisitor } from '../decode_visitor';
import { VisitorData, VisitorResult } from '../types';

export function visitTuple(
    visitor: DecodeVisitor | EncodeVisitor,
    components: IDL.Type<any>[],
    data: VisitorData
): VisitorResult {
    const fields = components.map((value, index) =>
        value.accept(visitor, {
            js_data: data.js_data[index],
            candidType: data.candidType.innerTypes[index]
        })
    );
    return [...fields];
}
