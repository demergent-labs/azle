import { IOType } from 'child_process';

import { logGlobalDependencies } from './log_global_dependencies';
import { manipulateWasmBinary } from './manipulate_wasm_binary';
import { prepareRustStagingArea } from './prepare_rust_staging_area';
import { execSyncPretty } from './utils/exec_sync_pretty';
import {
    EXPERIMENTAL_STATIC_CANISTER_TEMPLATE_PATH,
    STABLE_STATIC_CANISTER_TEMPLATE_PATH
} from './utils/global_paths';
import { CanisterConfig, CompilerInfo } from './utils/types';

export async function generateWasmBinary(
    canisterName: string,
    stdio: IOType,
    js: string,
    compilerInfo: CompilerInfo,
    canisterConfig: CanisterConfig,
    canisterPath: string,
    experimental: boolean
): Promise<void> {
    if (process.env.AZLE_GEN_WASM === 'true') {
        await logGlobalDependencies();

        await prepareRustStagingArea(canisterConfig, canisterPath);

        compileRustCodeNatively(
            STABLE_STATIC_CANISTER_TEMPLATE_PATH,
            canisterName,
            false,
            stdio
        );

        compileRustCodeNatively(
            EXPERIMENTAL_STATIC_CANISTER_TEMPLATE_PATH,
            canisterName,
            true,
            stdio
        );
    }

    await manipulateWasmBinary(
        canisterName,
        js,
        compilerInfo,
        canisterConfig,
        experimental
    );
}

function compileRustCodeNatively(
    wasmDest: string,
    canisterName: string,
    experimental: boolean,
    stdio: IOType
): void {
    execSyncPretty(
        `CARGO_TARGET_DIR=target cargo build --target wasm32-wasi --manifest-path .azle/${canisterName}/canister/Cargo.toml --release${
            experimental === true ? ' --features "experimental"' : ''
        }`,
        stdio
    );

    execSyncPretty(
        `wasi2ic target/wasm32-wasi/release/canister.wasm ${wasmDest}`,
        stdio
    );
}
