import '../../../../../experimental';

import { IDL } from '@dfinity/candid';

import { AzleResult } from '../../../../../system_types';
import { DecodeVisitor } from '../../decode_visitor';
import { EncodeVisitor } from '../../encode_visitor';
import { VisitorData, VisitorResult } from '../../types';
import { visitAzleResult } from './azle_result';
import { visitAzleVariant } from './azle_variant';

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
