import { IDL } from '@dfinity/candid';
import { DidVisitor, VisitorData, VisitorResult } from '../did_visitor';
import { escapeCandidKeywords } from '../escape_candid_keywords';
import { extractCandid } from '../extract_candid';

export function visitVariant(
    fields: [string, IDL.Type<any>][],
    didVisitor: DidVisitor,
    data: VisitorData
): VisitorResult {
    const candidFields = fields.map(([key, value]) =>
        value.accept(didVisitor, { ...data, isOnService: false })
    );
    const candid = extractCandid(candidFields);
    const fields_string = fields.map(
        ([key, value], index) =>
            escapeCandidKeywords(key) +
            (value.name === 'null' ? '' : ':' + candid[0][index])
    );
    return [`variant {${fields_string.join('; ')}}`, candid[1]];
}
