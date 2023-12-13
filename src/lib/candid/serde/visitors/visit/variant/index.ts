import { IDL } from '@dfinity/candid';
import { EncodeVisitor } from '../../encode_visitor';
import { AzleResult } from '../../../../../system_types';
import { DecodeVisitor } from '../../decode_visitor';
import { VisitorData, VisitorResult } from '../../types';
import { visitAzleVariant } from './azle_variant';
import { visitAzleResult } from './azle_result';

export function visitVariant(
    visitor: DecodeVisitor | EncodeVisitor,
    fields: [string, IDL.Type<any>][],
    data: VisitorData
): VisitorResult {
    if (data.candidType instanceof AzleResult) {
        return visitAzleResult(visitor, fields, data);
    }
    return visitAzleVariant(visitor, fields, data);
}
