import { spawnSync } from 'child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { copySync } from 'fs-extra';
import { join } from 'path';
import { createProgram } from 'typescript';

import { compileTypeScriptToJavaScript } from '../typescript_to_javascript';
import {
    generateLibCargoToml,
    generateWorkspaceCargoLock,
    generateWorkspaceCargoToml
} from '../typescript_to_javascript/cargo_toml_files';
import {
    GLOBAL_AZLE_CONFIG_DIR,
    GLOBAL_AZLE_BIN_DIR,
    GLOBAL_AZLE_TARGET_DIR
} from '../utils';
import { Err, ok, Ok, Result, unwrap } from '../utils/result';
import {
    AzleError,
    JavaScript,
    RunOptions,
    Toml,
    TsCompilationError,
    TsSyntaxErrorLocation,
    Rust
} from '../utils/types';
import { time, isVerboseMode } from '../utils';
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

function generateRustCanister(
    fileNames: string[],
    canisterPath: string,
    { rootPath }: RunOptions
): Result<undefined, AzleError> {
    const azleGenerateResult = runAzleGenerate(fileNames, canisterPath, {
        rootPath
    });

    if (!ok(azleGenerateResult)) {
        return Err(azleGenerateResult.err);
    }

    const unformattedLibFile = azleGenerateResult.ok;

    writeFileSync(`${canisterPath}/${rootPath}/src/lib.rs`, unformattedLibFile);

    const runRustFmtResult = runRustFmt(unformattedLibFile, canisterPath, {
        rootPath
    });

    if (!ok(runRustFmtResult)) {
        return Err(runRustFmtResult.err);
    }

    const formattedLibFile = runRustFmtResult.ok;

    writeFileSync(`${canisterPath}/${rootPath}/src/lib.rs`, formattedLibFile);

    if (isVerboseMode()) {
        console.info(
            `Wrote formatted lib.rs file to ${canisterPath}/${rootPath}/src/lib.rs\n`
        );
    }
    return Ok(undefined);
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

function writeCodeToFileSystem(
    rootPath: string,
    canisterPath: string,
    workspaceCargoToml: Toml,
    workspaceCargoLock: Toml,
    libCargoToml: Toml,
    mainJs: JavaScript
) {
    rmSync(canisterPath, { recursive: true, force: true });
    mkdirSync(canisterPath, { recursive: true });

    writeFileSync(`${canisterPath}/Cargo.toml`, workspaceCargoToml);
    writeFileSync(`${canisterPath}/Cargo.lock`, workspaceCargoLock);

    if (!existsSync(`${canisterPath}/${rootPath}`)) {
        mkdirSync(`${canisterPath}/${rootPath}`, { recursive: true });
    }

    writeFileSync(`${canisterPath}/${rootPath}/Cargo.toml`, libCargoToml);

    if (!existsSync(`${canisterPath}/${rootPath}/src`)) {
        mkdirSync(`${canisterPath}/${rootPath}/src`);
    }

    if (!existsSync(`${canisterPath}/${rootPath}/src/lib.rs`)) {
        writeFileSync(`${canisterPath}/${rootPath}/src/lib.rs`, '');
    }

    if (!existsSync(`${canisterPath}/${rootPath}/azle_vm_value_derive`)) {
        mkdirSync(`${canisterPath}/${rootPath}/azle_vm_value_derive`);
    }

    copySync(
        `${__dirname}/azle_vm_value_derive`,
        `${canisterPath}/${rootPath}/azle_vm_value_derive`
    );

    if (!existsSync(`${canisterPath}/${rootPath}/azle_generate`)) {
        mkdirSync(`${canisterPath}/${rootPath}/azle_generate`);
    }

    copySync(
        `${__dirname}/azle_generate`,
        `${canisterPath}/${rootPath}/azle_generate`
    );

    writeFileSync(
        `${canisterPath}/${rootPath}/azle_generate/src/main.js`,
        mainJs
    );
}

function runAzleGenerate(
    fileNames: string[],
    canisterPath: string,
    { rootPath }: RunOptions
): Result<Rust, AzleError> {
    if (isVerboseMode()) {
        console.info('running azle_generate');
    }
    const executionResult = spawnSync(
        `${GLOBAL_AZLE_BIN_DIR}/cargo`,
        ['run', '--', fileNames.join(',')],
        {
            cwd: `${canisterPath}/${rootPath}/azle_generate`,
            stdio: 'pipe',
            env: {
                ...process.env,
                CARGO_TARGET_DIR: GLOBAL_AZLE_TARGET_DIR,
                CARGO_HOME: GLOBAL_AZLE_CONFIG_DIR,
                RUSTUP_HOME: GLOBAL_AZLE_CONFIG_DIR
            }
        }
    );

    const suggestion =
        'If you are unable to decipher the error above, reach out in the #typescript\nchannel of the IC Developer Community discord:\nhttps://discord.gg/5Hb6rM2QUM';

    if (executionResult.error) {
        const exitCode = (executionResult.error as any).errno ?? 13;
        return Err({
            error: `Azle encountered an error: ${executionResult.error.message}`,
            suggestion,
            exitCode
        });
    }

    if (executionResult.status !== 0) {
        const generalErrorMessage =
            "Something about your TypeScript violates Azle's requirements";
        const stdErr: string = executionResult.stderr.toString();
        const longErrorMessage = `The underlying cause is likely at the bottom of the following output:\n\n${stdErr}`;
        if (isVerboseMode()) {
            return Err({
                error: generalErrorMessage,
                suggestion: `${longErrorMessage}\n${suggestion}`,
                exitCode: 12
            });
        }

        const stdErrLines = stdErr.split('\n');
        const lineWhereErrorMessageStarts = stdErrLines.findIndex((line) =>
            line.startsWith("thread 'main' panicked")
        );
        const startsWithQuoteCommaAndContainsAPathAndEndsWithLineAndColumnNumber =
            /',\s.*\/.*\.rs:\d*:\d*/;
        const lineWhereErrorMessageEnds = stdErrLines.findIndex((line) => {
            return startsWithQuoteCommaAndContainsAPathAndEndsWithLineAndColumnNumber.test(
                line
            );
        });
        if (
            lineWhereErrorMessageStarts === -1 ||
            lineWhereErrorMessageEnds === -1
        ) {
            return Err({
                error: generalErrorMessage,
                suggestion: `${longErrorMessage}\n${suggestion}`,
                exitCode: 11
            });
        }
        let errorLines = stdErrLines.slice(
            lineWhereErrorMessageStarts,
            lineWhereErrorMessageEnds + 1
        );
        errorLines[0] = errorLines[0].replace(
            "thread 'main' panicked at '",
            ''
        );
        errorLines[errorLines.length - 1] = errorLines[
            errorLines.length - 1
        ].replace(
            startsWithQuoteCommaAndContainsAPathAndEndsWithLineAndColumnNumber,
            ''
        );

        return Err({
            error: errorLines.join('\n'),
            suggestion,
            exitCode: 12
        });
    }

    if (isVerboseMode()) {
        const rawStdErr = executionResult.stderr.toString();

        const startOfFileNamesMarker = '     Running `';
        const fileNamesStartIndex = rawStdErr.indexOf(startOfFileNamesMarker);
        const stdErrBeforeFileNames = rawStdErr.substring(
            0,
            fileNamesStartIndex
        );

        const endOfFileNamesMarker = '#AZLE_GENERATE_START';
        const fileNamesEndIndex = rawStdErr.indexOf(endOfFileNamesMarker);
        const stdErrAfterFileNames = rawStdErr.substring(
            fileNamesEndIndex + endOfFileNamesMarker.length
        );

        const stdErrWithoutFileNames =
            stdErrBeforeFileNames + stdErrAfterFileNames;
        console.log(stdErrWithoutFileNames);
        console.info('Generated unformatted lib.rs file');
    }
    return Ok(executionResult.stdout.toString());
}

function runRustFmt(
    input: Rust,
    canisterPath: string,
    { rootPath }: RunOptions
): Result<Rust, AzleError> {
    const executionResult = spawnSync(
        `${GLOBAL_AZLE_BIN_DIR}/rustfmt`,
        ['--edition=2018'],
        {
            cwd: `${canisterPath}/${rootPath}/azle_generate`,
            input,
            stdio: 'pipe',
            env: {
                ...process.env,
                CARGO_TARGET_DIR: GLOBAL_AZLE_TARGET_DIR,
                CARGO_HOME: GLOBAL_AZLE_CONFIG_DIR,
                RUSTUP_HOME: GLOBAL_AZLE_CONFIG_DIR
            }
        }
    );
    if (executionResult.status !== 0) {
        const error = executionResult.stderr.toString();
        return Err({
            error: 'Azle has experienced an internal error while trying to\n   format your generated rust canister',
            suggestion: `Please open an issue at https://github.com/demergent-labs/azle/issues/new\nincluding this message and the following error:\n\n${red(
                error
            )}`,
            exitCode: 12
        });
    }

    if (isVerboseMode()) {
        console.info('Formatted lib.rs file');
    }
    return Ok(executionResult.stdout.toString());
}
