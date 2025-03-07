import { IDL } from '@dfinity/candid';

import { DidVisitor, VisitorData, VisitorResult } from '../did_visitor';
import { extractCandid } from '../extract_candid';
import { quoteCandidName } from '../quote_candid_name';

/**
 * @internal
 * Visitor for variant types in Candid generation.
 */
export function visitVariant(
    fields: [string, IDL.Type<any>][],
    didVisitor: DidVisitor,
    data: VisitorData
): VisitorResult {
    const candidFields = fields.map(([_key, value]) =>
        value.accept(didVisitor, { ...data, isOnService: false })
    );
    const candid = extractCandid(candidFields);
    const fields_string = fields.map(
        ([key, value], index) =>
            quoteCandidName(key) +
            (value.name === 'null' ? '' : `:${candid[0][index]}`)
    );
    return [`variant {${fields_string.join('; ')}}`, candid[1]];
}
