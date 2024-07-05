import { IOType } from 'child_process';

import { manipulateWasmBinary } from './manipulate_wasm_binary';
import { execSyncPretty } from './utils/exec_sync_pretty';

// TODO change this to explain that we are just manipulating the Wasm binary
// TODO rip out all Podman stuff if possible
// TODO make an automatic way to compile the binary and move it to the correct location
// TODO because right now we have to manually grab the binary
export function compileRustCode(
    dockerContainerName: string,
    canisterName: string,
    stdio: IOType,
    nativeCompilation: boolean,
    js: string
) {
    if (nativeCompilation === true) {
        compileRustCodeNatively(canisterName, stdio);
    } else {
        if (process.env.AZLE_USE_PODMAN === 'true') {
            _compileRustCodeWithPodman(
                dockerContainerName,
                canisterName,
                stdio
            );
        } else {
            manipulateWasmBinary(canisterName, ['simpleQuery'], js);
        }
    }
}

function _compileRustCodeWithPodman(
    dockerContainerName: string,
    canisterName: string,
    stdio: IOType
) {
    execSyncPretty(
        `podman exec ${dockerContainerName} rm -rf /.azle/${canisterName}`,
        stdio
    );

    execSyncPretty(`podman exec ${dockerContainerName} mkdir -p /.azle`, stdio);

    execSyncPretty(
        `podman exec ${dockerContainerName} mkdir -p /global_target_dir`,
        stdio
    );

    execSyncPretty(
        `podman cp .azle/${canisterName} ${dockerContainerName}:/.azle`,
        stdio
    );

    execSyncPretty(
        `podman exec -w /.azle/${canisterName} ${dockerContainerName} env CARGO_TARGET_DIR=/global_target_dir cargo build --target wasm32-wasi --manifest-path canister/Cargo.toml --release`,
        stdio
    );

    execSyncPretty(
        `podman exec -w /.azle/${canisterName} ${dockerContainerName} wasi2ic /global_target_dir/wasm32-wasi/release/canister.wasm /global_target_dir/wasm32-wasi/release/canister.wasm`,
        stdio
    );

    const wasmDest =
        process.env.AZLE_WASM_DEST ??
        `.azle/${canisterName}/${canisterName}.wasm`;

    execSyncPretty(
        `podman cp ${dockerContainerName}:/global_target_dir/wasm32-wasi/release/canister.wasm ${wasmDest}`,
        stdio
    );
}

function compileRustCodeNatively(canisterName: string, stdio: IOType) {
    execSyncPretty(
        `CARGO_TARGET_DIR=target cargo build --target wasm32-wasi --manifest-path .azle/${canisterName}/canister/Cargo.toml --release`,
        stdio
    );

    execSyncPretty(
        `wasi2ic target/wasm32-wasi/release/canister.wasm .azle/${canisterName}/${canisterName}.wasm`,
        stdio
    );
}
