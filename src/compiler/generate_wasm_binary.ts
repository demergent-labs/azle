import { IOType } from 'child_process';
import { writeFile } from 'fs/promises';
import { join } from 'path';

import { manipulateWasmBinary } from './manipulate_wasm_binary';
import { prepareRustStagingArea } from './prepare_rust_staging_area';
import { execSyncPretty } from './utils/exec_sync_pretty';
import {
    AZLE_PACKAGE_PATH,
    STATIC_CANISTER_TEMPLATE_PATH
} from './utils/global_paths';
import { CanisterConfig, CompilerInfo } from './utils/types';

export async function generateWasmBinary(
    canisterName: string,
    stdio: IOType,
    js: string,
    compilerInfo: CompilerInfo,
    canisterConfig: CanisterConfig,
    canisterPath: string
): Promise<void> {
    if (process.env.AZLE_GEN_WASM === 'true') {
        await logGlobalDependencies();

        await prepareRustStagingArea(canisterConfig, canisterPath);

        compileRustCodeNatively(
            STATIC_CANISTER_TEMPLATE_PATH,
            canisterName,
            stdio
        );
    }

    await manipulateWasmBinary(canisterName, js, compilerInfo, canisterConfig);
}

function compileRustCodeNatively(
    wasmDest: string,
    canisterName: string,
    stdio: IOType
): void {
    execSyncPretty(
        `CARGO_TARGET_DIR=target cargo build --target wasm32-wasi --manifest-path .azle/${canisterName}/canister/Cargo.toml --release`,
        stdio
    );

    execSyncPretty(
        `wasi2ic target/wasm32-wasi/release/canister.wasm ${wasmDest}`,
        stdio
    );
}

async function logGlobalDependencies(): Promise<void> {
    const wasiVersion = execSyncPretty('cargo install --list | grep wasi2ic');
    const nodeVersion = execSyncPretty('node --version');
    const rustVersion = execSyncPretty('rustc --version');

    const globalDependencies = `WASI2IC Version: ${wasiVersion}
Node Version: ${nodeVersion}
Rust Version: ${rustVersion}`;

    await writeFile(
        join(AZLE_PACKAGE_PATH, 'global_dependencies'),
        globalDependencies,
        'utf-8'
    );
    console.log('Global dependencies written to global_dependencies file.');
}
