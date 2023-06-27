import * as ts from 'typescript';

export function getSourceFile(node: ts.Node): ts.SourceFile | undefined {
    if (ts.isSourceFile(node)) {
        return node;
    }
    if (!node.parent) {
        return;
    }
    return getSourceFile(node.parent);
}
