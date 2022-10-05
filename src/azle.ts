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

    if (canisterNames.length > 1) {
        exitWithError({
            error: 'Too many arguments',
            suggestion: `Usage: azle ${dim('[-v|--verbose]')} ${green(
                '<canister_name>'
            )}`,
            exitCode: 1
        });
    }
    const canisterName = canisterNames[0];

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
            suggestion: `Make sure your dfx.json contains an entry for "${canisterName}". For example:\n\n${exampleDfxJson}`,
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
            error: `Missing ${fieldOrFields} ${missingFieldNames} in ./dfx.json`,
            suggestion: `Make sure your dfx.json looks similar to the following:\n\n${exampleDfxJson}`,
            exitCode: 4
        });
    }

    // TODO: Consider a better detection method
    const isInitialCompile = !fs.existsSync(
        `target/wasm32-unknown-unknown/release/${canisterName}.wasm.gz`
    );

    if (isInitialCompile) {
        console.info(
            yellow(
                "\nInitial build takes a few minutes. Don't panic. Subsequent builds will be faster."
            )
        );
    }

    const step1StartTime = process.hrtime();
    const step1Message = '[1/3] 🔨 Compiling TypeScript...';
    console.info(`\n${step1Message}`);
    const [main_js, stable_storage_js] = await compileTypeScriptToJavaScript(
        tsPath
    );

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

    writeCodeToFileSystem(
        rootPath,
        workspaceCargoToml,
        workspaceCargoLock,
        libCargoToml,
        fileNames,
        main_js,
        stable_storage_js
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

    const step1Duration = parseHrTimeToSeconds(process.hrtime(step1StartTime));
    process.stdout.write(
        `\x1b[1A${step1Message} ${dim(`${step1Duration}s`)}\n`
    );

    // Step 2
    const step2StartTime = process.hrtime();
    const compilationTimeEstimate = isInitialCompile
        ? '(this may take awhile)'
        : '';
    const step2Message = `[2/3] 🚧 Building Wasm binary... ${compilationTimeEstimate}`;
    console.info(step2Message);
    compileRustCode(canisterName, stdioType);
    const step2Duration = parseHrTimeToSeconds(process.hrtime(step2StartTime));
    process.stdout.write(
        `\x1b[1A${step2Message} ${dim(`${step2Duration}s`)}\n`
    );

    // Step 3
    const step3StartTime = process.hrtime();
    const step3Message = `[3/3] 📝 Generating Candid file...`;
    console.info(step3Message);
    generateCandidFile(rootPath, candidPath, stdioType);
    const step3Duration = parseHrTimeToSeconds(process.hrtime(step3StartTime));
    process.stdout.write(
        `\x1b[1A${step3Message} ${dim(`${step3Duration}s`)}\n`
    );

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
