import { spawnSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';
import {
    GLOBAL_AZLE_BIN_DIR,
    GLOBAL_AZLE_RUST_DIR,
    GLOBAL_AZLE_TARGET_DIR
} from '../utils';
import { Err, ok, Ok, Result } from '../utils/result';
import { AzleError, Plugin, RunOptions, Rust } from '../utils/types';
import { isVerboseMode } from '../utils';
import { red } from '../utils/colors';

export function generateRustCanister(
    fileNames: string[],
    plugins: Plugin[],
    canisterPath: string,
    { rootPath }: RunOptions
): Result<undefined, AzleError> {
    const compilerInfo = {
        plugins,
        file_names: fileNames
    };

    const compilerInfoPath = join(
        canisterPath,
        rootPath,
        'azle_generate',
        'compiler_info.json'
    );

    writeFileSync(compilerInfoPath, JSON.stringify(compilerInfo));

    const azleGenerateResult = runAzleGenerate(
        'compiler_info.json',
        canisterPath,
        rootPath
    );

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

function runAzleGenerate(
    compilerInfoPath: string,
    canisterPath: string,
    rootPath: string
): Result<Rust, AzleError> {
    if (isVerboseMode()) {
        console.info('running azle_generate');
    }
    const executionResult = spawnSync(
        `${GLOBAL_AZLE_BIN_DIR}/cargo`,
        ['run', '--', compilerInfoPath],
        {
            cwd: `${canisterPath}/${rootPath}/azle_generate`,
            stdio: 'pipe',
            env: {
                ...process.env,
                CARGO_TARGET_DIR: GLOBAL_AZLE_TARGET_DIR,
                CARGO_HOME: GLOBAL_AZLE_RUST_DIR,
                RUSTUP_HOME: GLOBAL_AZLE_RUST_DIR
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
                CARGO_HOME: GLOBAL_AZLE_RUST_DIR,
                RUSTUP_HOME: GLOBAL_AZLE_RUST_DIR
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
