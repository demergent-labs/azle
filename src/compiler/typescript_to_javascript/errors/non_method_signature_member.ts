import { TypeElement } from 'typescript';
import { createExampleCanisterDeclaration } from '.';
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
            label: 'Invalid member in Canister type argument.'
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
            label: 'The Canister type requires all members of its enclosed type to be method signatures. For example:'
        },
        source: createExampleCanisterDeclaration()
    };

    return `\n\n${snippetsToDisplayString([errorSnippet, helpSnippet])}`;
}
