import { IDL } from '@dfinity/candid';
import { EncodeVisitor } from '../../encode_visitor';
import { DecodeVisitor } from '../../decode_visitor';
import { VisitorData } from '../../types';

export function visitAzleVariant(
    visitor: DecodeVisitor | EncodeVisitor,
    fields: [string, IDL.Type<any>][],
    data: VisitorData
) {
    const candidFields = fields.reduce((acc, [memberName, memberIdl]) => {
        const fieldData = data.js_data[memberName];
        const fieldClass = data.candidType[memberName];
        if (fieldData === undefined) {
            // If the field data is undefined then it is not the variant that was used
            return acc;
        }
        return {
            ...acc,
            [memberName]: memberIdl.accept(visitor, {
                candidType: fieldClass,
                js_data: fieldData
            })
        };
    }, {});

    return candidFields;
}
