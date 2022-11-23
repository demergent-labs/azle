import { SourceFile } from 'typescript';

/**
 * Gives an introductory statement about the snippet to follow.
 */
export type Annotation = {
    /** Will be displayed in all lowercase before the label */
    annotationType: AnnotationType;
    /** The text to display to the user */
    label: string;
};

export type AnnotationType = 'Error' | 'Warning' | 'Info' | 'Note' | 'Help';

export type Location = {
    path: string;
    line: number;
    column: number;
};

export type Range = [number, number];

/**
 * Displays a section of source code and accompanying annotations which
 * highlight (underline) specific chunks.
 */
export type Slice = {
    /** The section of source code to display */
    source: string;
    /** The line number the source code slice starts on. This will display as the line number */
    lineStart: number;
    /** The path of the file this is included in. */
    origin?: string;
    /** An annotation for a slice */
    annotation: SourceAnnotation;
};

/**
 * Used for describing a section of code, and pointing out important parts
 */
export type Snippet = {
    title: Annotation;
    location?: Location;
    source?: string;
};

/**
 * Is displayed within the code snippet after the highlighting markers.
 */
export type SourceAnnotation = {
    label?: string;
    range: Range;
    annotationType: AnnotationType;
};

export function snippetsToDisplayString(snippets: Snippet[]): string {
    return snippets
        .map((snippet) => {
            const tag = snippet.title.annotationType.toLowerCase();
            const titleLine = `${tag}: ${snippet.title.label}`;

            const originLine = snippet.location
                ? ` --> ${snippet.location.path}:${snippet.location.line}:${snippet.location.column}`
                : null;

            const gutter = '  | ';
            const blankLine = snippet.source ? gutter : null;
            const sourceCodeWithSimpleGutter = snippet.source
                ? `${gutter}${snippet.source?.replace(/\n/g, `\n${gutter}`)}`
                : null;

            return [
                titleLine,
                originLine,
                blankLine,
                sourceCodeWithSimpleGutter,
                blankLine
            ]
                .filter((l) => l)
                .join('\n');
        })
        .join('\n');
}

export function getLineNumber(sourceFile: SourceFile, range: Range): number {
    const codePrecedingRange = sourceFile.text.substring(0, range[0]);
    const numberOfNewlinesBeforeRange = (codePrecedingRange.match(/\n/g) ?? [])
        .length;
    return numberOfNewlinesBeforeRange + 1;
}

export function convertFileRangeToLineRange(
    sourceFile: SourceFile,
    range: Range
): Range {
    const codePrecedingRange = sourceFile.text.substring(0, range[0]);
    const lastNewlineIndex = codePrecedingRange.lastIndexOf('\n');
    return [range[0] - lastNewlineIndex, range[1] - lastNewlineIndex];
}
