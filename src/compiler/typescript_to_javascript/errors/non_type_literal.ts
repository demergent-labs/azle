import * as tsc from 'typescript';
import {
    convertFileRangeToLineRange,
    getLineNumber,
    Snippet,
    snippetsToDisplayString
} from '../annotations';

export function createNonTypeLiteralErrorMessage(
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
            label: 'Generic type "Canister" currently requires an inline object literal as a type argument'
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
            label: 'Define your canister shape inline. E.g. Canister<{method(): CanisterResult<string>}>'
        }
    };

    return `Azle requirement violation.\n\n${snippetsToDisplayString([
        errorSnippet,
        helpSnippet
    ])}`;
}
