import { IOType } from 'child_process';

import { execSyncPretty } from '../../../utils/exec_sync_pretty';

export function compile(
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
