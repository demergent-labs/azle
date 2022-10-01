import { execSync, IOType } from 'child_process';
import { compileTypeScriptToJavaScript } from './compiler/typescript_to_javascript';
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

    const canisterNames = process.argv.filter((arg, i) => {
        return i > 1 && !(arg.startsWith('--') || arg.startsWith('-'));
    });

    if (canisterNames.length === 0) {
        console.info('azle v0.7.0');
        console.info(
            `\nUsage: azle \x1b[2m[-v|--verbose]\x1b[0m \x1b[32m<canister_name>\x1b[0m`
        );
        process.exit(1);
    }

    const canisterName = canisterNames[0];

    if (canisterNames.length > 1) {
        console.error(
            '\n💣 \x1b[31mBuilding multiple canisters is unsupported at this time.\x1b[0m'
        );
        console.error(
            'Try running azle again, providing only one canister name.'
        );
        console.error(`\n💀 Build failed`);
        process.exit(2);
    }

    console.info(`\nBuilding canister \x1b[32m${canisterName}\x1b[0m\n`);

    if (!fs.existsSync(`dfx.json`)) {
        console.error(`💣 \x1b[31mMissing dfx.json\x1b[0m`);
        console.error(
            `Create a dfx.json file in the current directory following the`
        );
        console.error(
            `schema at https://internetcomputer.org/docs/current/references/dfx-json-reference`
        );
        console.error(`\n💀 Build failed`);
        process.exit(3);
    }

    const dfxJson: DfxJson = JSON.parse(fs.readFileSync('dfx.json').toString());
    const canisterConfig = dfxJson.canisters[canisterName];

    if (!canisterConfig) {
        console.error(
            `💣 \x1b[31mUnable to find canister "${canisterName}" in dfx.json.\x1b[0m`
        );
        console.error(
            `Make sure your dfx.json contains an entry for "${canisterName}".`
        );
        console.error(`\n💀 Build failed`);
        process.exit(4);
    }

    const rootPath = canisterConfig.root;
    const tsPath = canisterConfig.ts;
    const candidPath = canisterConfig.candid;

    if (!rootPath || !tsPath || !candidPath) {
        console.error(`💣 \x1b[31mMissing field in dfx.json.\x1b[0m`);
        console.error(
            `Make sure your dfx.json looks something like the following:`
        );
        console.error(`\x1b[2m
            {
                "canisters": {
                    "${canisterName}": {
                        "type": "custom",
                        "build": "npx azle ${canisterName}",
                        "root": "src",
                        "ts": "src/index.ts",
                        "candid": "src/index.did",
                        "wasm": "target/wasm32-unknown-unknown/release/${canisterName}.wasm"
                    }
                }
            }
        \x1b[0m`);
        console.error(`💀 Build failed`);
        process.exit(5);
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

    console.info(
        `\n🎉 Built canister \x1b[32m${canisterName}\x1b[0m \x1b[2mat ./target/wasm32-unknown-unknown/release/${canisterName}.wasm.gz`
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
