import * as ts from 'typescript';

export function getSourceFile(node: ts.Node): ts.SourceFile | undefined {
    if (!node.parent) {
        return;
    }
    if (ts.isSourceFile(node.parent)) {
        return node.parent;
    }
    return getSourceFile(node.parent);
}
