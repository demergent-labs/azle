import * as tsc from 'typescript';
import { Candid } from '../../types';

// TODO seems like what I need to do
// TODO get all Query functions
// TODO get the parameters and return type
// TODO then go find all of the parameters and return type and turn them into Candid

export function compileTypeScriptToCandid(tsPath: string): Candid {
    const program = tsc.createProgram(
        [tsPath],
        {}
    );
    const sourceFiles = program.getSourceFiles();

    const candid = generateCandidFromSourceFiles(sourceFiles);

    return candid;
}

function generateCandidFromSourceFiles(sourceFiles: readonly tsc.SourceFile[]): Candid {
    const candids = sourceFiles.reduce((result: readonly string[], sourceFile) => {
        return [
            ...result,
            generateCandidFromNodes(
                sourceFile,
                sourceFile.getChildren()
            )
        ];
    }, []);

    return candids.join('\n');
}

function generateCandidFromNodes(
    sourceFile: tsc.SourceFile,
    nodes: readonly tsc.Node[]
): Candid {
    if (nodes.length === 0) {
        return '';
    }

    return '';
}

function generateCandidFromNode(node: tsc.Node): Candid {
    return '';
}