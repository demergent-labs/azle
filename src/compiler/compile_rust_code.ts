import { IOType } from 'child_process';

import { manipulateWasmBinary } from './manipulate_wasm_binary';
import { execSyncPretty } from './utils/exec_sync_pretty';
import { STATIC_CANISTER_TEMPLATE_PATH } from './utils/global_paths';

// TODO change this to explain that we are just manipulating the Wasm binary
// TODO rip out all Podman stuff if possible
// TODO make an automatic way to compile the binary and move it to the correct location
// TODO because right now we have to manually grab the binary
export function compileRustCode(
    canisterName: string,
    stdio: IOType,
    nativeCompilation: boolean,
    js: string
) {
    if (nativeCompilation === true) {
        compileRustCodeNatively(
            `.azle/${canisterName}/${canisterName}.wasm`,
            canisterName,
            stdio
        );
        return;
    }

    if (process.env.AZLE_GENERATE_STATIC_CANISTER_TEMPLATE === 'true') {
        compileRustCodeNatively(
            STATIC_CANISTER_TEMPLATE_PATH,
            canisterName,
            stdio
        );
    }

    // TODO do a check to make sure binary exists?
    manipulateWasmBinary(canisterName, ['simpleQuery'], js);
}

function compileRustCodeNatively(
    wasmDest: string,
    canisterName: string,
    stdio: IOType
) {
    execSyncPretty(
        `CARGO_TARGET_DIR=target cargo build --target wasm32-wasi --manifest-path .azle/${canisterName}/canister/Cargo.toml --release`,
        stdio
    );

    execSyncPretty(
        `wasi2ic target/wasm32-wasi/release/canister.wasm ${wasmDest}`,
        stdio
    );
}
