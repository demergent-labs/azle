import { IDL } from '@dfinity/candid';
import { extractCandid } from '../extract_candid';
import { DidVisitor, VisitorData, VisitorResult } from '../did_visitor';

export function visitFunc(
    t: IDL.FuncClass,
    didVisitor: DidVisitor,
    data: VisitorData
): VisitorResult {
    const argsTypes = t.argTypes.map((value) =>
        value.accept(didVisitor, { ...data, isOnService: false })
    );
    const candidArgs = extractCandid(argsTypes);
    const retsTypes = t.retTypes.map((value) =>
        value.accept(didVisitor, { ...data, isOnService: false })
    );
    const candidRets = extractCandid(retsTypes);
    const args = candidArgs[0].join(', ');
    const rets = candidRets[0].join(', ');
    const annon =
        t.annotations.length === 0 ? '' : ' ' + t.annotations.join(' ');
    return [
        `${data.isOnService ? '' : 'func '}(${args}) -> (${rets})${annon}`,
        { ...candidArgs[1], ...candidRets[1] }
    ];
}
