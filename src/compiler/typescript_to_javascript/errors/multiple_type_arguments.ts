import * as tsc from 'typescript';
import { createExampleCanisterDeclaration } from '.';
import {
    convertFileRangeToLineRange,
    getLineNumber,
    Snippet,
    snippetsToDisplayString
} from '../annotations';

export function createMultipleTypeArgumentsErrorMessage(
    typeAliasDeclaration: tsc.TypeAliasDeclaration
): string {
    const sourceFile = typeAliasDeclaration.getSourceFile();

    const typeAliasDeclarationSourceCode = sourceFile.text.substring(
        typeAliasDeclaration.pos,
        typeAliasDeclaration.end
    );

    const typeReferenceNode =
        typeAliasDeclaration.type as tsc.TypeReferenceNode;
    const typeReferenceNodeLineNumber = getLineNumber(sourceFile, [
        typeReferenceNode.pos,
        typeReferenceNode.end
    ]);

    const errorSnippet: Snippet = {
        title: {
            annotationType: 'Error',
            label: 'Too many type arguments passed to Canister type'
        },
        location: {
            path: sourceFile.fileName,
            line: typeReferenceNodeLineNumber,
            column: convertFileRangeToLineRange(sourceFile, [
                typeReferenceNode.pos,
                typeReferenceNode.end
            ])[0]
        },
        source: typeAliasDeclarationSourceCode
    };

    const helpSnippet: Snippet = {
        title: {
            annotationType: 'Help',
            label: 'The Canister type accepts only one type argument, which must be a type literal. For example:'
        },
        source: createExampleCanisterDeclaration()
    };

    return `\n\n${snippetsToDisplayString([errorSnippet, helpSnippet])}`;
}
