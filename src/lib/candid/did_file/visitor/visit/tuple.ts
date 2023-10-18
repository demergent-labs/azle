import { IDL } from '@dfinity/candid';
import { DidVisitor, VisitorData, VisitorResult } from '../did_visitor';
import { extractCandid } from '../extract_candid';

export function visitTuple(
    components: IDL.Type<any>[],
    didVisitor: DidVisitor,
    data: VisitorData
): VisitorResult {
    const fields = components.map((value) =>
        value.accept(didVisitor, { ...data, isOnService: false })
    );
    const candid = extractCandid(fields);
    return [`record {${candid[0].join('; ')}}`, candid[1]];
}
