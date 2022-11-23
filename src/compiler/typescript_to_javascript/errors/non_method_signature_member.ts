import { TypeElement } from 'typescript';
import {
    convertFileRangeToLineRange,
    getLineNumber,
    Range,
    Snippet,
    snippetsToDisplayString
} from '../annotations';

export function createNonMethodSignatureMemberErrorMessage(
    typeElement: TypeElement
): string {
    const sourceFile = typeElement.getSourceFile();

    const typeAliasDeclarationSourceCode = sourceFile.text.substring(
        typeElement.pos,
        typeElement.end
    );

    const range: Range = [typeElement.pos, typeElement.end];

    const line = getLineNumber(sourceFile, range);

    const errorSnippet: Snippet = {
        title: {
            annotationType: 'Error',
            label: 'Invalid member. Generic type "Canister" requires all members of it\'s enclosed type to be method signatures.'
        },
        location: {
            path: sourceFile.fileName,
            line,
            column: convertFileRangeToLineRange(sourceFile, [
                typeElement.pos,
                typeElement.end
            ])[0]
        },
        source: typeAliasDeclarationSourceCode
    };

    const helpSnippet: Snippet = {
        title: {
            annotationType: 'Help',
            label: 'Remove this member or make it a method signature'
        }
    };

    return `Azle requirement violation.\n\n${snippetsToDisplayString([
        errorSnippet,
        helpSnippet
    ])}`;
}
