import { TypeAliasDeclaration, TypeReferenceNode } from 'typescript';
import {
    convertFileRangeToLineRange,
    getLineNumber,
    Snippet,
    snippetsToDisplayString
} from '../annotations';
import { createExampleCanisterDeclaration } from '.';

export function createMissingTypeArgumentErrorMessage(
    typeAliasDeclaration: TypeAliasDeclaration
): string {
    const sourceFile = typeAliasDeclaration.getSourceFile();

    const typeAliasDeclarationSourceCode = sourceFile.text.substring(
        typeAliasDeclaration.pos,
        typeAliasDeclaration.end
    );

    const typeReferenceNode = typeAliasDeclaration.type as TypeReferenceNode;
    const typeReferenceNodeLineNumber = getLineNumber(sourceFile, [
        typeReferenceNode.pos,
        typeReferenceNode.end
    ]);

    const errorSnippet: Snippet = {
        title: {
            annotationType: 'Error',
            label: 'Canister type missing type literal.'
        },
        location: {
            path: sourceFile.fileName,
            line: typeReferenceNodeLineNumber,
            column: convertFileRangeToLineRange(sourceFile, [
                typeReferenceNode.pos,
                typeReferenceNode.end
            ])[1]
        },
        source: typeAliasDeclarationSourceCode
    };

    const helpSnippet: Snippet = {
        title: {
            annotationType: 'Help',
            label: 'Specify a type literal as a type argument to Canister. For example:'
        },
        source: createExampleCanisterDeclaration()
    };

    return `\n\n${snippetsToDisplayString([errorSnippet, helpSnippet])}`;
}
