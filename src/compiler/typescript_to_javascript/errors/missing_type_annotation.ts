import * as tsc from 'typescript';
import { Range, Snippet, snippetsToDisplayString } from '../annotations';

export function createMissingTypeArgumentErrorMessage(
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
            label: 'Generic type "Canister" requires one type argument'
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
            label: 'Specify a type literal as a type argument to "Canister"'
        }
    };

    return `Azle requirement violation.\n\n${snippetsToDisplayString([
        errorSnippet,
        helpSnippet
    ])}`;
}

function getLineNumber(sourceFile: tsc.SourceFile, range: Range): number {
    const codePrecedingRange = sourceFile.text.substring(0, range[0]);
    const numberOfNewlinesBeforeRange = (codePrecedingRange.match(/\n/g) ?? [])
        .length;
    return numberOfNewlinesBeforeRange + 1;
}

function convertFileRangeToLineRange(
    sourceFile: tsc.SourceFile,
    range: Range
): Range {
    const codePrecedingRange = sourceFile.text.substring(0, range[0]);
    const lastNewlineIndex = codePrecedingRange.lastIndexOf('\n');
    return [range[0] - lastNewlineIndex, range[1] - lastNewlineIndex];
}
