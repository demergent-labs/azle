import * as tsc from 'typescript';
import { Range, Snippet, snippetsToDisplayString } from '../annotations';

export function createMissingTypeArgumentErrorMessage(
    typeAliasDeclaration: tsc.TypeAliasDeclaration
): string {
    const sourceFile = typeAliasDeclaration.getSourceFile();

    const typeReferenceNode =
        typeAliasDeclaration.type as tsc.TypeReferenceNode;

    const typeAliasDeclRange: Range = [
        typeAliasDeclaration.pos,
        typeAliasDeclaration.end
    ];
    const adjustedTypeAliasDeclRange = adjustRange(
        sourceFile,
        typeAliasDeclRange
    );
    const source = getSourceCode(sourceFile, adjustedTypeAliasDeclRange);
    const adjustedTypeAliasDeclRangeInLine = getRangeInLine(
        sourceFile,
        adjustRange(sourceFile, [typeReferenceNode.pos, typeReferenceNode.end])
    );

    const errorSnippet: Snippet = {
        title: {
            annotationType: 'Error',
            label: 'Generic type "Canister" requires one type argument'
        },
        slice: {
            source,
            lineStart: getLineStart(sourceFile, adjustedTypeAliasDeclRange),
            origin: sourceFile.fileName,
            annotation: {
                label: 'missing type argument here',
                annotationType: 'Error',
                range: adjustedTypeAliasDeclRangeInLine
            }
        }
    };

    let exampleCanisterTypeLiteral = '<{method(): CanisterResult<void>}>';
    let typeRefRange: Range = [typeReferenceNode.pos, typeReferenceNode.end];
    let adjustedTypeRefRange = adjustRange(sourceFile, typeRefRange);
    let typeReferenceNodeRangeInLine = getRangeInLine(
        sourceFile,
        adjustedTypeRefRange
    );
    let exampleTypeLiteralRange: Range = [
        typeReferenceNodeRangeInLine[1],
        typeReferenceNodeRangeInLine[1] + exampleCanisterTypeLiteral.length
    ];
    const helpSnippet: Snippet = {
        title: {
            annotationType: 'Help',
            label: 'Specify a type literal as a type argument to "Canister"'
        },
        slice: {
            source: buildCorrectedSource(
                source,
                adjustedTypeAliasDeclRangeInLine[1] - 1
            ),
            lineStart: getLineStart(sourceFile, adjustedTypeAliasDeclRange),
            annotation: {
                annotationType: 'Help',
                range: exampleTypeLiteralRange
            }
        }
    };

    return `Azle requirement violation.\n\n${snippetsToDisplayString([
        errorSnippet,
        helpSnippet
    ])}`;
}

function getSourceCode(sourceFile: tsc.SourceFile, range: Range): string {
    return sourceFile.text.substring(range[0], range[1]);
}

function getLineStart(sourceFile: tsc.SourceFile, range: Range): number {
    const codePrecedingRange = sourceFile.text.substring(0, range[0]);
    const numberOfNewlinesBeforeRange = (codePrecedingRange.match(/\n/g) ?? [])
        .length;
    return numberOfNewlinesBeforeRange + 1;
}

function buildCorrectedSource(source: string, index: number): string {
    return `${source.slice(
        0,
        index - 1
    )}<{method(): CanisterResult<void>}>${source.slice(index - 1)}`;
}

/** Adjusts the range to not include any leading newlines
 *
 * Sometimes TSC will break nodes right where the last node ended. The node
 * doesn't really start until after the leading newlines, but TSC doesn't
 * realize that for some reason. So it sticks the leading newlines into that
 * node. As a result we need to remove them so that the snippet displays
 * correctly.
 */
function adjustRange(sourceFile: tsc.SourceFile, range: Range): Range {
    const rawSourceCode = sourceFile.text.substring(range[0], range[1]);
    const leadingNewlineCount = (rawSourceCode.match(/^\n*/) ?? [''])[0].length;
    const actualRangeStart = range[0] + leadingNewlineCount;
    return [actualRangeStart, range[1]];
}

function getRangeInLine(sourceFile: tsc.SourceFile, range: Range): Range {
    const codePrecedingRange = sourceFile.text.substring(0, range[0]);
    const lastNewlineIndex = codePrecedingRange.lastIndexOf('\n') - 1;
    return [range[0] - lastNewlineIndex, range[1] - lastNewlineIndex];
}
