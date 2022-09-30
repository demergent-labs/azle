import { execSync, IOType } from 'child_process';
import {
    bundle_and_transpile_ts,
    compileTypeScriptToJavaScript
} from './compiler/typescript_to_javascript';
import {
    generateLibCargoToml,
    generateWorkspaceCargoLock,
    generateWorkspaceCargoToml
} from './compiler/typescript_to_javascript/cargo_toml_files';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import { DfxJson, JavaScript, Toml } from './types';
import * as tsc from 'typescript';

azle();

async function azle() {
    const isVerboseMode =
        process.argv.includes('--verbose') || process.argv.includes('-v');
    const stdioType = isVerboseMode ? 'inherit' : 'pipe';

    const canisterName = process.argv.filter((arg, i) => {
        return i > 1 && !(arg.startsWith('--') || arg.startsWith('-'));
    })[0];
    console.info(`\nBuilding canister \x1b[32m${canisterName}\x1b[0m\n`);

    const dfxJson: DfxJson = JSON.parse(fs.readFileSync('dfx.json').toString());
    const canisterConfig = dfxJson.canisters[canisterName];

    const rootPath = canisterConfig.root;
    const tsPath = canisterConfig.ts;
    const candidPath = canisterConfig.candid;

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

    console.info('[1/4] 🔨 Compiling typescript to javascript...');
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

    console.info('[2/4] 🦀 Generating rust project...');

    // TODO: If our rust dependencies never change, maybe we shouldn't be
    // reinstalling them every time we build.
    installRustDependencies(stdioType);
    execSync(
        `cd target/azle/${rootPath}/azle_generate && cargo run -- ${fileNames.join(
            ','
        )} | rustfmt --edition 2018 > ../src/lib.rs`,
        { stdio: stdioType }
    );

    compileRustCode(canisterName, rootPath, candidPath, stdioType);

    console.info(`\n🎉 Built canister \x1b[32m${canisterName}\x1b[0m\n`);
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

function compileRustCode(
    canisterName: string,
    rootPath: string,
    candidPath: string,
    stdio: IOType
) {
    console.info('[3/4] 🚧 Compiling rust code...');

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

    console.info('[4/4] 📝 Generating candid file...');

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
