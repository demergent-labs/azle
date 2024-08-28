import '../../../../experimental';

import { IDL } from '@dfinity/candid';

import { DecodeVisitor } from '../decode_visitor';
import { EncodeVisitor } from '../encode_visitor';
import { VisitorData, VisitorResult } from '../types';

export function visitRecord(
    visitor: DecodeVisitor | EncodeVisitor,
    fields: [string, IDL.Type<any>][],
    data: VisitorData
): VisitorResult {
    const candidFields = fields.reduce((acc, [memberName, memberIdlTypes]) => {
        const fieldData = data.js_data[memberName];
        const fieldClass = data.candidType[memberName];

        return {
            ...acc,
            [memberName]: memberIdlTypes.accept(visitor, {
                js_data: fieldData,
                candidType: fieldClass
            })
        };
    }, {});

    return candidFields;
}
