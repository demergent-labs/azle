import * as ts from 'typescript';
import { Opt } from '../../../lib';

export function getSourceFile(node: ts.Node): Opt<ts.SourceFile> {
    if (!node.parent) {
        return Opt.None;
    }
    if (ts.isSourceFile(node.parent)) {
        return Opt.Some(node.parent);
    }
    return getSourceFile(node.parent);
}
