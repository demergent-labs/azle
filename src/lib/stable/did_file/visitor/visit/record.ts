import { IDL } from '@dfinity/candid';

import { DidVisitor, VisitorData, VisitorResult } from '../did_visitor';
import { extractCandid } from '../extract_candid';
import { quoteCandidName } from '../quote_candid_name';

/**
 * @internal
 * Visitor for record types in Candid generation.
 */
export function visitRecord(
    fields: [string, IDL.Type<any>][],
    didVisitor: DidVisitor,
    data: VisitorData
): VisitorResult {
    const candidFields = fields.map(([_key, value]) =>
        value.accept(didVisitor, { ...data, isOnService: false })
    );
    const candid = extractCandid(candidFields);
    const field_strings = fields.map(
        ([key, _value], index) => `${quoteCandidName(key)}:${candid[0][index]}`
    );
    return [`record {${field_strings.join('; ')}}`, candid[1]];
}
