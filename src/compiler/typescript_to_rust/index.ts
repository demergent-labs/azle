import { join } from 'path';
import { createProgram } from 'typescript';

import { compileTypeScriptToJavaScript } from './typescript_to_javascript';
import {
    generateLibCargoToml,
    generateWorkspaceCargoLock,
    generateWorkspaceCargoToml
} from './typescript_to_javascript/cargo_toml_files';
import { writeCodeToFileSystem } from './write_code_to_file_system';
import { generateRustCanister } from './generate_rust_canister';
import { Err, ok, unwrap } from '../utils/result';
import {
    AzleError,
    Toml,
    TsCompilationError,
    TsSyntaxErrorLocation
} from '../utils/types';
import { time } from '../utils';
import { red, dim } from '../utils/colors';

export function compileTypeScriptToRust(
    canisterName: string,
    canisterPath: string,
    rootPath: string,
    tsPath: string
): void | never {
    time('\n[1/3] 🔨 Compiling TypeScript...', 'inline', () => {
        const compilationResult = compileTypeScriptToJavaScript(tsPath);

        if (!ok(compilationResult)) {
            const azleErrorResult = compilationErrorToAzleErrorResult(
                compilationResult.err
            );
            unwrap(azleErrorResult);
        }

        const mainJs = compilationResult.ok;
        const workspaceCargoToml: Toml = generateWorkspaceCargoToml(rootPath);
        const workspaceCargoLock: Toml = generateWorkspaceCargoLock();
        const libCargoToml: Toml = generateLibCargoToml(canisterName);
        const fileNames = getFileNames(tsPath);

        writeCodeToFileSystem(
            rootPath,
            canisterPath,
            workspaceCargoToml,
            workspaceCargoLock,
            libCargoToml,
            mainJs as any
        );

        unwrap(generateRustCanister(fileNames, canisterPath, { rootPath }));

        if (isCompileOnlyMode()) {
            console.log('Compilation complete!');
            process.exit(0);
        }
    });
}

function isCompileOnlyMode(): boolean {
    return (
        process.argv.includes('--compile-only') || process.argv.includes('-c')
    );
}

function compilationErrorToAzleErrorResult(error: unknown): Err<AzleError> {
    if (isTsCompilationError(error)) {
        const firstError = error.errors[0];
        const codeSnippet = generateVisualDisplayOfErrorLocation(
            firstError.location
        );
        return Err({
            error: `There's something wrong in your TypeScript: ${firstError.text}`,
            suggestion: codeSnippet,
            exitCode: 5
        });
    } else {
        return Err({
            error: `Unable to compile TS to JS: ${error}`,
            exitCode: 6
        });
    }
}

function isTsCompilationError(error: unknown): error is TsCompilationError {
    if (
        error &&
        typeof error === 'object' &&
        'stack' in error &&
        'message' in error &&
        'errors' in error &&
        'warnings' in error
    ) {
        return true;
    }
    return false;
}

function generateVisualDisplayOfErrorLocation(
    location: TsSyntaxErrorLocation
): string {
    const { file, line, column, lineText } = location;
    const marker = red('^'.padStart(column + 1));
    const preciseLocation = dim(`${file}:${line}:${column}`);
    const previousLine =
        line > 1
            ? dim(`${(line - 1).toString().padStart(line.toString().length)}| `)
            : '';
    const offendingLine = `${dim(`${line}| `)}${lineText}`;
    const subsequentLine = `${dim(
        `${(line + 1).toString().padStart(line.toString().length)}| `
    )}${marker}`;
    return `${preciseLocation}\n${previousLine}\n${offendingLine}\n${subsequentLine}`;
}

function getFileNames(tsPath: string): string[] {
    const program = createProgram([tsPath], {});
    const sourceFiles = program.getSourceFiles();

    const fileNames = sourceFiles.map((sourceFile) => {
        if (!sourceFile.fileName.startsWith('/')) {
            return join(process.cwd(), sourceFile.fileName);
        } else {
            return sourceFile.fileName;
        }
    });
    return fileNames;
}
