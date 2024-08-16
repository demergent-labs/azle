import { IOType } from 'child_process';

import { logGlobalDependencies } from './log_global_dependencies';
import { manipulateWasmBinary } from './manipulate_wasm_binary';
import { prepareRustStagingArea } from './prepare_rust_staging_area';
import { execSyncPretty } from './utils/exec_sync_pretty';
import { STATIC_CANISTER_TEMPLATE_PATH } from './utils/global_paths';
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
