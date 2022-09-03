import { execSync } from 'child_process';
import {
    generateLibCargoToml,
    generateWorkspaceCargoLock,
    generateWorkspaceCargoToml
} from './compiler/typescript_to_rust/generators/cargo_toml_files';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import { DfxJson, Toml } from './types';
import * as tsc from 'typescript';

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
        fileNames
    );

    compileRustCode(canisterName, rootPath, candidPath);
}

function installRustDependencies() {
    if (!fs.existsSync(`./target/azle`)) {
        fs.mkdirSync(`target/azle`, { recursive: true });
    }

    execSync(`rustup target add wasm32-unknown-unknown`, { stdio: 'inherit' });

    execSync(`cargo install ic-cdk-optimizer --version 0.3.4 || true`, {
        stdio: 'inherit'
    });
}

function writeCodeToFileSystem(
    rootPath: string,
    workspaceCargoToml: Toml,
    workspaceCargoLock: Toml,
    libCargoToml: Toml,
    fileNames: string[]
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
        `${__dirname}/compiler/typescript_to_rust_redesign/azle_generate`,
        `./target/azle/${rootPath}/azle_generate`
    );

    // TODO we may not need the macro concept at all
    // if (!fs.existsSync(`./target/azle/${rootPath}/azle_generate_macro`)) {
    //     fs.mkdirSync(`./target/azle/${rootPath}/azle_generate_macro`);
    // }

    // fsExtra.copySync(
    //     `${__dirname}/compiler/typescript_to_rust_redesign/azle_generate_macro`,
    //     `./target/azle/${rootPath}/azle_generate_macro`
    // );

    execSync(
        `cd target/azle/${rootPath}/azle_generate && cargo run -- ${fileNames.join(
            ','
        )} | rustfmt > ../src/lib.rs`,
        { stdio: 'inherit' }
    );
}

function compileRustCode(
    canisterName: string,
    rootPath: string,
    candidPath: string
) {
    execSync(
        `cd target/azle && CARGO_TARGET_DIR=.. cargo build --target wasm32-unknown-unknown --package ${canisterName} --release`,
        { stdio: 'inherit' }
    );

    const cargo_bin_root =
        process.env.CARGO_INSTALL_ROOT ??
        process.env.CARGO_HOME ??
        `$HOME/.cargo`;

    // optimization, binary is too big to deploy without this
    execSync(
        `${cargo_bin_root}/bin/ic-cdk-optimizer ./target/wasm32-unknown-unknown/release/${canisterName}.wasm -o ./target/wasm32-unknown-unknown/release/${canisterName}.wasm`,
        { stdio: 'inherit' }
    );

    execSync(
        `gzip -f -k ./target/wasm32-unknown-unknown/release/${canisterName}.wasm`,
        { stdio: 'inherit' }
    );

    execSync(
        `
        cd target/azle/${rootPath} && cargo test
    `,
        { stdio: 'inherit' } // TODO probably don't need to sdtio: inherit here so people don't see the test case running
    );

    execSync(
        `
        cp target/azle/${rootPath}/index.did ${candidPath}
    `,
        { stdio: 'inherit' }
    );
}
