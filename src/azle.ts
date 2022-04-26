import { execSync } from 'child_process';
import { compileTypeScriptToRust } from './compiler/typescript_to_rust';
import {
    generateLibCargoToml,
    generateWorkspaceCargoToml
} from './compiler/typescript_to_rust/generators/cargo_toml_files';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import {
    DfxJson,
    Rust,
    Toml
} from './types';

azle();

async function azle() {
    const canisterName = process.argv[2];
    const dfxJson: DfxJson = JSON.parse(fs.readFileSync('dfx.json').toString());
    const canisterConfig = dfxJson.canisters[canisterName];

    const rootPath = canisterConfig.root;
    const tsPath = canisterConfig.ts;
    const candidPath = canisterConfig.candid;

    installRustDependencies();

    const workspaceCargoToml: Toml = generateWorkspaceCargoToml(rootPath);
    const libCargoToml: Toml = generateLibCargoToml(canisterName);
    const libFile: Rust = await compileTypeScriptToRust(
        tsPath,
        candidPath
    );

    writeCodeToFileSystem(
        rootPath,
        workspaceCargoToml,
        libCargoToml,
        libFile
    );

    compileRustCode(canisterName);
}

function installRustDependencies() {
    if (!fs.existsSync(`./target/azle`)) {
        fs.mkdirSync(`target/azle`, { recursive: true });
    }

    execSync(
        `rustup target add wasm32-unknown-unknown`,
        { stdio: 'inherit' }
    );

    execSync(
        `cd target/azle && cargo install --git https://github.com/dfinity/candid --rev e7abc462fd54e72e3449999169c12e9f5209d091 didc --root ..`,
        { stdio: 'inherit' }
    );

    execSync(
        `cd target/azle && cargo install ic-cdk-optimizer --root ..`,
        { stdio: 'inherit' }
    );
}

function writeCodeToFileSystem(
    rootPath: string,
    workspaceCargoToml: Toml,
    libCargoToml: Toml,
    libFile: Rust
) {
    if (!fs.existsSync(`./target/azle`)) {
        fs.mkdirSync(`target/azle`, { recursive: true });
    }

    fs.writeFileSync('./target/azle/Cargo.toml', workspaceCargoToml);

    if (!fs.existsSync(`./target/azle/${rootPath}`)) {
        fs.mkdirSync(`target/azle/${rootPath}`, { recursive: true });
    }

    fs.writeFileSync(`./target/azle/${rootPath}/Cargo.toml`, libCargoToml);

    if (!fs.existsSync(`./target/azle/${rootPath}/src`)) {
        fs.mkdirSync(`./target/azle/${rootPath}/src`);
    }

    fs.writeFileSync(`./target/azle/${rootPath}/src/lib.rs`, libFile);

    if (!fs.existsSync(`./target/azle/${rootPath}/azle_js_value_derive`)) {
        fs.mkdirSync(`./target/azle/${rootPath}/azle_js_value_derive`);
    }

    fsExtra.copySync(`${__dirname}/compiler/typescript_to_rust/azle_js_value_derive`, `./target/azle/${rootPath}/azle_js_value_derive`);
}

function compileRustCode(canisterName: string) {
    execSync(
        `cd target/azle && CARGO_TARGET_DIR=.. cargo build --target wasm32-unknown-unknown --package ${canisterName} --release`,
        { stdio: 'inherit' }
    );

    // optimization, binary is too big to deploy without this
    execSync(
        `./target/bin/ic-cdk-optimizer ./target/wasm32-unknown-unknown/release/${canisterName}.wasm -o ./target/wasm32-unknown-unknown/release/${canisterName}.wasm`,
        { stdio: 'inherit' }
    );

    execSync(
        `gzip -f -k ./target/wasm32-unknown-unknown/release/${canisterName}.wasm`,
        { stdio: 'inherit' }
    );
}