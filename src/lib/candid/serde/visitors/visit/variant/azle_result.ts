import { IDL } from '@dfinity/candid';
import { EncodeVisitor } from '../../encode_visitor';
import { DecodeVisitor } from '../../decode_visitor';
import { VisitorData } from '../../types';
import { Result } from '../../../../../system_types/result';

export function visitAzleResult(
    visitor: DecodeVisitor | EncodeVisitor,
    fields: [string, IDL.Type<any>][],
    data: VisitorData
) {
    if ('Ok' in data.js_data) {
        const OK_FIELD_INDEX = 0;
        const okField = fields[OK_FIELD_INDEX];
        const okData = data.js_data['Ok'];
        const okClass = data.candidType.Ok;

        return Result.Ok(
            okField[1].accept(visitor, {
                js_data: okData,
                candidType: okClass
            })
        );
    }
    if ('Err' in data.js_data) {
        const ERR_FIELD_INDEX = 1;
        const errField = fields[ERR_FIELD_INDEX];
        const errData = data.js_data['Err'];
        const errClass = data.candidType.Err;
        return Result.Err(
            errField[1].accept(visitor, {
                js_data: errData,
                candidType: errClass
            })
        );
    }
}
