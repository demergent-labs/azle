// TODO I might be doing this in a difficult way, tsc might provide convenience methods for this
// TODO perhaps using the visitor pattern, I should study up on other compilers more

import * as tsc from 'typescript';

export function getTypeAliasDeclarationsFromSourceFiles(sourceFiles: readonly tsc.SourceFile[]): tsc.TypeAliasDeclaration[] {
    return sourceFiles.reduce((result: tsc.TypeAliasDeclaration[], sourceFile) => {
        return [
            ...result,
            ...getTypeAliasDeclarationsFromNodes(
                sourceFile,
                sourceFile.getChildren()
            )
        ];
    }, []);
}

function getTypeAliasDeclarationsFromNodes(
    sourceFile: tsc.SourceFile,
    nodes: tsc.Node[]
): tsc.TypeAliasDeclaration[] {
    return nodes.reduce((result: tsc.TypeAliasDeclaration[], node) => {
        const typeAliasDeclarations = getTypeAliasDeclarationsFromNode(node);

        return [
            ...result,
            ...typeAliasDeclarations,
            ...getTypeAliasDeclarationsFromNodes(
                sourceFile,
                node.getChildren(sourceFile)
            )
        ];
    }, []);
}

function getTypeAliasDeclarationsFromNode(node: tsc.Node): tsc.TypeAliasDeclaration[] {
    if (node.kind === tsc.SyntaxKind.TypeAliasDeclaration) {
        const typeAliasDeclaration = node as tsc.TypeAliasDeclaration;
        return [typeAliasDeclaration];
    }
    else {
        return [];
    }
}

export function getTypeAliasDeclaration(
    sourceFiles: readonly tsc.SourceFile[],
    typeAliasName: string
): tsc.TypeAliasDeclaration | undefined {
    const typeAliasDeclarations = getTypeAliasDeclarationsFromSourceFiles(sourceFiles);

    return typeAliasDeclarations.find((typeAliasDeclaration) => {
        return typeAliasDeclaration.name.escapedText.toString() === typeAliasName;
    });
}