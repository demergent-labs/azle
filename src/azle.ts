import { execSync, IOType, spawnSync } from 'child_process';
import { compileTypeScriptToJavaScript } from './compiler/typescript_to_javascript';
import {
    generateLibCargoToml,
    generateWorkspaceCargoLock,
    generateWorkspaceCargoToml
} from './compiler/typescript_to_javascript/cargo_toml_files';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import {
    AzleError,
    DfxJson,
    JavaScript,
    JSCanisterConfig,
    RunOptions,
    Rust,
    Toml,
    TsCompilationError,
    TsSyntaxErrorLocation
} from './types';
import { Err, ok, Ok, Result, unwrap } from './result';
import { red, yellow, green, blue, purple, dim } from './colors';
import * as tsc from 'typescript';
import * as path from 'path';
import { version } from '../package.json';

azle();

function azle() {
    const stdioType = getStdIoType();
    const canisterName = unwrap(getCanisterName(process.argv));

    time(`\nBuilding canister ${green(canisterName)}`, 'default', () => {
        const canisterConfig = unwrap(getCanisterConfig(canisterName));

        printFirstBuildWarning(canisterName);
        compileTypeScriptToRust(canisterName, canisterConfig, stdioType);
        generateCandidFile(
            canisterConfig.root,
            canisterConfig.candid,
            stdioType
        );
        compileRustCode(canisterName, canisterConfig.candid, stdioType);
    });

    logSuccess(canisterName);
}

function addCandidToWasmMetaData(candidPath: string, wasmPath: string): void {
    execSync(
        `ic-wasm ${wasmPath} -o ${wasmPath} metadata candid:service -f ${candidPath} -v public`
    );

    execSync(
        `ic-wasm ${wasmPath} -o ${wasmPath} metadata cdk -d "azle ${version}" -v public`
    );
}

function colorFormattedDfxJsonExample(canisterName: string): string {
    return `    ${yellow('{')}
        ${red('"canisters"')}: ${purple('{')}
            ${red(`"${canisterName}"`)}: ${blue('{')}
                ${red('"type"')}: ${green('"custom"')},
                ${red('"build"')}: ${green(`"npx azle ${canisterName}"`)},
                ${red('"root"')}: ${green('"src"')},
                ${red('"ts"')}: ${green('"src/index.ts"')},
                ${red('"candid"')}: ${green('"src/index.did"')},
                ${red('"wasm"')}: ${green(
        `"target/wasm32-unknown-unknown/release/${canisterName}.wasm"`
    )},
            ${blue('}')}
        ${purple('}')}
    ${yellow('}')}`;
}

function compileRustCode(
    canisterName: string,
    candidPath: string,
    stdio: IOType
) {
    time(
        `[3/3] 🚧 Building Wasm binary...${getBuildWarning(canisterName)}`,
        'inline',
        () => {
            execSync(
                `cd target/azle && CARGO_TARGET_DIR=.. cargo build --target wasm32-unknown-unknown --package ${canisterName} --release`,
                { stdio }
            );

            const wasmFileRelativePath = `./target/wasm32-unknown-unknown/release/${canisterName}.wasm`;

            const cargo_bin_root =
                process.env.CARGO_INSTALL_ROOT ??
                process.env.CARGO_HOME ??
                `$HOME/.cargo`;

            // optimization, binary is too big to deploy without this
            execSync(
                `${cargo_bin_root}/bin/ic-cdk-optimizer ${wasmFileRelativePath} -o ${wasmFileRelativePath}`,
                { stdio }
            );

            addCandidToWasmMetaData(candidPath, wasmFileRelativePath);

            execSync(`gzip -f -k ${wasmFileRelativePath}`, { stdio });
        }
    );
}

function compileTypeScriptToRust(
    canisterName: string,
    { root: rootPath, ts: tsPath }: JSCanisterConfig,
    stdioType: IOType
): void | never {
    time('\n[1/3] 🔨 Compiling TypeScript...', 'inline', () => {
        const compilationResult = compileTypeScriptToJavaScript(tsPath);

        if (!ok(compilationResult)) {
            const azleErrorResult = compilationErrorToAzleErrorResult(
                compilationResult.err
            );
            unwrap(azleErrorResult);
        }

        const main_js = compilationResult.ok;
        const workspaceCargoToml: Toml = generateWorkspaceCargoToml(rootPath);
        const workspaceCargoLock: Toml = generateWorkspaceCargoLock();
        const libCargoToml: Toml = generateLibCargoToml(canisterName);
        const fileNames = getFileNames(tsPath);

        writeCodeToFileSystem(
            rootPath,
            workspaceCargoToml,
            workspaceCargoLock,
            libCargoToml,
            main_js
        );

        // TODO: If our rust dependencies never change, maybe we shouldn't be
        // reinstalling them every time we build.
        installRustDependencies(stdioType);

        unwrap(generateRustCanister(fileNames, { rootPath }));
    });
}

function generateCandidFile(
    rootPath: string,
    candidPath: string,
    stdio: IOType
) {
    time(`[2/3] 📝 Generating Candid file...`, 'inline', () => {
        execSync(`cd target/azle/${rootPath} && cargo test`, { stdio });

        execSync(`cp target/azle/${rootPath}/index.did ${candidPath}`, {
            stdio
        });
    });
}

function generateRustCanister(
    fileNames: string[],
    { rootPath }: RunOptions
): Result<undefined, AzleError> {
    const azleGenerateResult = runAzleGenerate(fileNames, {
        rootPath
    });

    if (!ok(azleGenerateResult)) {
        return Err(azleGenerateResult.err);
    }

    const unformattedLibFile = azleGenerateResult.ok;

    fs.writeFileSync(`target/azle/${rootPath}/src/lib.rs`, unformattedLibFile);

    const runRustFmtResult = runRustFmt(unformattedLibFile, {
        rootPath
    });

    if (!ok(runRustFmtResult)) {
        return Err(runRustFmtResult.err);
    }

    const formattedLibFile = runRustFmtResult.ok;

    fs.writeFileSync(`target/azle/${rootPath}/src/lib.rs`, formattedLibFile);

    if (isVerboseMode()) {
        console.info(
            `Wrote formatted lib.rs file to target/azle/${rootPath}/src/lib.rs\n`
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

function getCanisterConfig(
    canisterName: string
): Result<JSCanisterConfig, AzleError> {
    const exampleDfxJson = colorFormattedDfxJsonExample(canisterName);

    if (!fs.existsSync(`dfx.json`)) {
        return Err({
            error: 'Missing dfx.json',
            suggestion: `Create a dfx.json file in the current directory with the following format:\n\n${exampleDfxJson}`,
            exitCode: 2
        });
    }

    const dfxJson: DfxJson = JSON.parse(fs.readFileSync('dfx.json').toString());
    const canisterConfig = dfxJson.canisters[canisterName];

    if (!canisterConfig) {
        return Err({
            error: `Unable to find canister "${canisterName}" in ./dfx.json`,
            suggestion: `Make sure your dfx.json contains an entry for "${canisterName}". For example:\n\n${exampleDfxJson}`,
            exitCode: 3
        });
    }

    const { root, ts, candid } = canisterConfig;

    if (!root || !ts || !candid) {
        const missingFields = [
            ['"root"', root],
            ['"ts"', ts],
            ['"candid"', candid]
        ]
            .filter(([_, value]) => !value)
            .map(([field, _]) => field);
        const fieldOrFields = missingFields.length == 1 ? 'field' : 'fields';
        const missingFieldNames = missingFields.join(', ');
        return Err({
            error: `Missing ${fieldOrFields} ${missingFieldNames} in ./dfx.json`,
            suggestion: `Make sure your dfx.json looks similar to the following:\n\n${exampleDfxJson}`,
            exitCode: 4
        });
    }

    return Ok(canisterConfig);
}

function getCanisterName(args: string[]): Result<string, AzleError> {
    const canisterNames = args.slice(2).filter((arg) => !isCliFlag(arg));

    if (canisterNames.length === 0) {
        return Err({ suggestion: `azle v${version}\n\n${getUsageInfo()}` });
    }

    if (canisterNames.length > 1) {
        return Err({
            error: 'Too many arguments',
            suggestion: getUsageInfo(),
            exitCode: 1
        });
    }
    const canisterName = canisterNames[0];

    return Ok(canisterName);
}

function getUsageInfo(): string {
    return `Usage: azle ${dim('[-v|--verbose]')} ${green('<canister_name>')}`;
}

function getBuildWarning(canisterName: string): string {
    return isInitialCompile(canisterName)
        ? ' (be patient, this will take a while)'
        : '';
}

function getFileNames(tsPath: string): string[] {
    const program = tsc.createProgram([tsPath], {});
    const sourceFiles = program.getSourceFiles();

    const fileNames = sourceFiles.map((sourceFile) => {
        if (!sourceFile.fileName.startsWith('/')) {
            return path.join(process.cwd(), sourceFile.fileName);
        } else {
            return sourceFile.fileName;
        }
    });
    return fileNames;
}

function getStdIoType() {
    return isVerboseMode() ? 'inherit' : 'pipe';
}

function installRustDependencies(stdio: IOType) {
    if (!fs.existsSync(`./target/azle`)) {
        fs.mkdirSync(`target/azle`, { recursive: true });
    }

    execSync(`rustup target add wasm32-unknown-unknown`, { stdio });

    execSync(`cargo install ic-cdk-optimizer --version 0.3.4 || true`, {
        stdio: 'ignore'
    });

    execSync(`cargo install ic-wasm --version 0.3.0 || true`, {
        stdio: 'ignore'
    });
}

function isCliFlag(arg: string): boolean {
    return arg.startsWith('--') || arg.startsWith('-');
}

function isInitialCompile(canisterName: string): boolean {
    // TODO: Consider a better detection method
    return !fs.existsSync(
        `target/wasm32-unknown-unknown/release/${canisterName}.wasm.gz`
    );
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

function isVerboseMode(): boolean {
    return process.argv.includes('--verbose') || process.argv.includes('-v');
}

function logSuccess(canisterName: string): void {
    console.info(
        `\n🎉 Built canister ${green(canisterName)} ${dim(
            `at ./target/wasm32-unknown-unknown/release/${canisterName}.wasm.gz`
        )}`
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

function parseHrTimeToSeconds(
    hrTime: [number, number],
    precision: number = 2
): string {
    let seconds = (hrTime[0] + hrTime[1] / 1_000_000_000).toFixed(precision);
    return seconds;
}

function printFirstBuildWarning(canisterName: string): void {
    if (isInitialCompile(canisterName)) {
        console.info(
            yellow(
                "\nInitial build takes a few minutes. Don't panic. Subsequent builds will be faster."
            )
        );
    }
}

function runAzleGenerate(
    fileNames: string[],
    { rootPath }: RunOptions
): Result<Rust, AzleError> {
    if (isVerboseMode()) {
        console.info('running azle_generate');
    }
    const executionResult = spawnSync(
        `cargo`,
        ['run', '--', fileNames.join(',')],
        {
            cwd: `target/azle/${rootPath}/azle_generate`,
            stdio: 'pipe'
        }
    );

    const suggestion =
        'If you are unable to decipher the error above, reach out in the #typescript\nchannel of the DFINITY DEV OFFICIAL discord:\nhttps://discord.com/channels/748416164832608337/956466775380336680';

    if (executionResult.error) {
        const exitCode = executionResult.error.errno ?? 13;
        return Err({
            error: `Azle encountered an error: ${executionResult.error.message}`,
            suggestion,
            exitCode
        });
    }

    if (executionResult.status !== 0) {
        const generalErrorMessage =
            "Something about your TypeScript violates Azle's requirements";
        const stdErr = executionResult.stderr.toString();
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
        const starts_with_quote_comma_and_contains_a_path_and_ends_with_line_and_column_number =
            /',\s.*\/.*\.rs:\d*:\d*/;
        const lineWhereErrorMessageEnds = stdErrLines.findIndex((line) => {
            return starts_with_quote_comma_and_contains_a_path_and_ends_with_line_and_column_number.test(
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
            starts_with_quote_comma_and_contains_a_path_and_ends_with_line_and_column_number,
            ''
        );

        return Err({
            error: `${generalErrorMessage}\n\n${errorLines.join('\n')}`,
            suggestion,
            exitCode: 12
        });
    }

    if (isVerboseMode()) {
        console.info('Generated unformatted lib.rs file');
    }
    return Ok(executionResult.stdout.toString());
}

function runRustFmt(
    input: Rust,
    { rootPath }: RunOptions
): Result<Rust, AzleError> {
    const executionResult = spawnSync(`rustfmt`, ['--edition=2018'], {
        cwd: `target/azle/${rootPath}/azle_generate`,
        input,
        stdio: 'pipe'
    });
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

function time(
    label: string,
    mode: 'inline' | 'default',
    callback: () => void | never
): void | never {
    const startTime = process.hrtime();
    console.info(label);
    callback();
    const endTime = process.hrtime(startTime);
    const duration = parseHrTimeToSeconds(endTime);

    if (mode === 'inline') {
        const leadingNewLinesCount = (label.match(/^[\n]+/g) || [''])[0].length;
        const cursorUp = `\x1b[${1 + leadingNewLinesCount}A`;
        process.stdout.write(`${cursorUp}${label} ${dim(`${duration}s`)}\n`);
    } else {
        console.info(`\nDone in ${duration}s.`);
    }
}

function writeCodeToFileSystem(
    rootPath: string,
    workspaceCargoToml: Toml,
    workspaceCargoLock: Toml,
    libCargoToml: Toml,
    main_js: JavaScript
) {
    if (!fs.existsSync(`./target/azle`)) {
        fs.mkdirSync(`target/azle`, { recursive: true });
    }

    fs.writeFileSync('./target/azle/Cargo.toml', workspaceCargoToml);
    fs.writeFileSync('./target/azle/Cargo.lock', workspaceCargoLock);

    if (!fs.existsSync(`./target/azle/${rootPath}`)) {
        fs.mkdirSync(`target/azle/${rootPath}`, { recursive: true });
    }

    fs.writeFileSync(`./target/azle/${rootPath}/Cargo.toml`, libCargoToml);

    if (!fs.existsSync(`./target/azle/${rootPath}/src`)) {
        fs.mkdirSync(`./target/azle/${rootPath}/src`);
    }

    if (!fs.existsSync(`./target/azle/${rootPath}/src/lib.rs`)) {
        fs.writeFileSync(`./target/azle/${rootPath}/src/lib.rs`, '');
    }

    if (!fs.existsSync(`./target/azle/${rootPath}/azle_vm_value_derive`)) {
        fs.mkdirSync(`./target/azle/${rootPath}/azle_vm_value_derive`);
    }

    fsExtra.copySync(
        `${__dirname}/compiler/typescript_to_rust/azle_vm_value_derive`,
        `./target/azle/${rootPath}/azle_vm_value_derive`
    );

    if (!fs.existsSync(`./target/azle/${rootPath}/azle_generate`)) {
        fs.mkdirSync(`./target/azle/${rootPath}/azle_generate`);
    }

    fsExtra.copySync(
        `${__dirname}/compiler/typescript_to_rust/azle_generate`,
        `./target/azle/${rootPath}/azle_generate`
    );

    fs.writeFileSync(
        `./target/azle/${rootPath}/azle_generate/src/main.js`,
        main_js
    );
}
