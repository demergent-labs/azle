import { execSync, IOType } from 'child_process';
import { compileTypeScriptToJavaScript } from './compiler/typescript_to_javascript';
import {
    generateLibCargoToml,
    generateWorkspaceCargoLock,
    generateWorkspaceCargoToml
} from './compiler/typescript_to_javascript/cargo_toml_files';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import { AzleError, DfxJson, JavaScript, Toml } from './types';
import { red, yellow, green, blue, purple, dim } from './colors';
import * as tsc from 'typescript';

azle();

async function azle() {
    const startTime = process.hrtime();
    const isVerboseMode =
        process.argv.includes('--verbose') || process.argv.includes('-v');
    const stdioType = isVerboseMode ? 'inherit' : 'pipe';

    const canisterNames = process.argv.filter((arg, i) => {
        return i > 1 && !(arg.startsWith('--') || arg.startsWith('-'));
    });

    if (canisterNames.length === 0) {
        console.info('\nazle v0.7.0');
        console.info(
            `\nUsage: azle ${dim('[-v|--verbose]')} ${green('<canister_name>')}`
        );
        process.exit(0);
    }

    const canisterName = canisterNames[0];

    if (canisterNames.length > 1) {
        exitWithError({
            error: 'Building multiple canisters is unsupported at this time.',
            suggestion:
                'Try running azle again, providing only one canister name.',
            exitCode: 1
        });
    }

    console.info(`\nBuilding canister ${green(canisterName)}`);

    const exampleDfxJson = colorFormattedDfxJsonExample(canisterName);

    if (!fs.existsSync(`dfx.json`)) {
        exitWithError({
            error: 'Missing dfx.json',
            suggestion: `Create a dfx.json file in the current directory with the following format:\n\n${exampleDfxJson}`,
            exitCode: 2
        });
    }

    const dfxJson: DfxJson = JSON.parse(fs.readFileSync('dfx.json').toString());
    const canisterConfig = dfxJson.canisters[canisterName];

    if (!canisterConfig) {
        exitWithError({
            error: `Unable to find canister "${canisterName}" in ./dfx.json`,
            suggestion: `Make sure your dfx.json contains an entry for "${canisterName}".`,
            exitCode: 3
        });
    }

    const rootPath = canisterConfig.root;
    const tsPath = canisterConfig.ts;
    const candidPath = canisterConfig.candid;

    if (!rootPath || !tsPath || !candidPath) {
        const missingFields = [
            ['"root"', rootPath],
            ['"ts"', tsPath],
            ['"candid"', candidPath]
        ]
            .filter(([_, value]) => !value)
            .map(([field, _]) => field);
        const fieldOrFields = missingFields.length == 1 ? 'field' : 'fields';
        const missingFieldNames = missingFields.join(', ');
        exitWithError({
            error: `Missing ${fieldOrFields} ${missingFieldNames} in dfx.json.`,
            suggestion: `Make sure your dfx.json looks similar to the following:\n\n${exampleDfxJson}`,
            exitCode: 4
        });
    }

    const workspaceCargoToml: Toml = generateWorkspaceCargoToml(rootPath);
    const workspaceCargoLock: Toml = generateWorkspaceCargoLock();
    const libCargoToml: Toml = generateLibCargoToml(canisterName);

    const program = tsc.createProgram([tsPath], {});
    const sourceFiles = program.getSourceFiles();

    const root_absolute_path = require('path').join(__dirname, '..');

    const fileNames = sourceFiles.map((sourceFile) => {
        if (sourceFile.fileName.startsWith(root_absolute_path) === false) {
            return `${process.cwd()}/${sourceFile.fileName}`;
        } else {
            return sourceFile.fileName;
        }
    });

    // TODO: Consider a better detection method
    const isAzleGenerateCompiled = !fs.existsSync(`./target/azle/target`);

    if (isAzleGenerateCompiled) {
        console.info(
            yellow("\nWarn: Initial build can take up to 4 mins. Don't panic.")
        );
        console.info(yellow('Subsequent builds will be faster (~30 seconds)'));
    }

    console.info('\n[1/4] 🔁 Compiling typescript to javascript...');
    const [main_js, stable_storage_js] = await compileTypeScriptToJavaScript(
        tsPath
    );

    writeCodeToFileSystem(
        rootPath,
        workspaceCargoToml,
        workspaceCargoLock,
        libCargoToml,
        fileNames,
        main_js,
        stable_storage_js
    );

    const azleGenerateTimeEstimate = isAzleGenerateCompiled
        ? '(~45s)'
        : '(~5s)';
    console.info(
        `[2/4] 🔍 Checking IC specific syntax... ${azleGenerateTimeEstimate}`
    );

    // TODO: If our rust dependencies never change, maybe we shouldn't be
    // reinstalling them every time we build.
    installRustDependencies(stdioType);

    execSync(
        `cd target/azle/${rootPath}/azle_generate && cargo run -- ${fileNames.join(
            ','
        )} | rustfmt --edition 2018 > ../src/lib.rs`,
        { stdio: stdioType }
    );

    // TODO: Consider a better detection method
    const isInitialCompile = !fs.existsSync(
        'target/wasm32-unknown-unknown/release/primitive_types.wasm'
    );
    const compilationTimeEstimate = isInitialCompile ? '(~2m)' : '(~30s)';
    console.info(`[3/4] 🚧 Building wasm binary... ${compilationTimeEstimate}`);
    compileRustCode(canisterName, stdioType);

    // TODO: Consider a better detection method
    const isFirstCandidGeneration = !fs.existsSync(candidPath);
    const candidGenerationTimeEstimate = isFirstCandidGeneration
        ? '(~1m)'
        : '(~5s)';
    console.info(
        `[4/4] 📝 Generating candid file... ${candidGenerationTimeEstimate}`
    );
    generateCandidFile(rootPath, candidPath, stdioType);

    const elapsedSeconds = parseHrTimeToSeconds(process.hrtime(startTime));
    console.info(`\nDone in ${elapsedSeconds}s.`);

    console.info(
        `\n🎉 Built canister ${green(canisterName)} ${dim(
            `at ./target/wasm32-unknown-unknown/release/${canisterName}.wasm.gz`
        )}`
    );
}

function installRustDependencies(stdio: IOType) {
    if (!fs.existsSync(`./target/azle`)) {
        fs.mkdirSync(`target/azle`, { recursive: true });
    }

    execSync(`rustup target add wasm32-unknown-unknown`, { stdio });

    execSync(`cargo install ic-cdk-optimizer --version 0.3.4 || true`, {
        stdio: 'ignore'
    });
}

function writeCodeToFileSystem(
    rootPath: string,
    workspaceCargoToml: Toml,
    workspaceCargoLock: Toml,
    libCargoToml: Toml,
    fileNames: string[],
    main_js: JavaScript,
    stable_storage_js: JavaScript
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

    if (!fs.existsSync(`./target/azle/${rootPath}/azle_js_value_derive`)) {
        fs.mkdirSync(`./target/azle/${rootPath}/azle_js_value_derive`);
    }

    fsExtra.copySync(
        `${__dirname}/compiler/typescript_to_rust/azle_js_value_derive`,
        `./target/azle/${rootPath}/azle_js_value_derive`
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

    fs.writeFileSync(
        `./target/azle/${rootPath}/azle_generate/src/stable_storage.js`,
        stable_storage_js
    );
}

function compileRustCode(canisterName: string, stdio: IOType) {
    execSync(
        `cd target/azle && CARGO_TARGET_DIR=.. cargo build --target wasm32-unknown-unknown --package ${canisterName} --release`,
        { stdio }
    );

    const cargo_bin_root =
        process.env.CARGO_INSTALL_ROOT ??
        process.env.CARGO_HOME ??
        `$HOME/.cargo`;

    // optimization, binary is too big to deploy without this
    execSync(
        `${cargo_bin_root}/bin/ic-cdk-optimizer ./target/wasm32-unknown-unknown/release/${canisterName}.wasm -o ./target/wasm32-unknown-unknown/release/${canisterName}.wasm`,
        { stdio }
    );

    execSync(
        `gzip -f -k ./target/wasm32-unknown-unknown/release/${canisterName}.wasm`,
        { stdio }
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

function exitWithError(payload: AzleError): never {
    console.error(`\n💣 ${red(payload.error)}`);
    console.error(`\n${payload.suggestion}`);
    console.error(`\n💀 Build failed`);
    process.exit(payload.exitCode);
}

function generateCandidFile(
    rootPath: string,
    candidPath: string,
    stdio: IOType
) {
    execSync(
        `
        cd target/azle/${rootPath} && cargo test
    `,
        { stdio }
    );

    execSync(
        `
        cp target/azle/${rootPath}/index.did ${candidPath}
    `,
        { stdio }
    );
}

function parseHrTimeToSeconds(
    hrTime: [number, number],
    precision: number = 2
): string {
    let seconds = (hrTime[0] + hrTime[1] / 1_000_000_000).toFixed(precision);
    return seconds;
}
