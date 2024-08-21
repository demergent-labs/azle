import { IOType } from 'child_process';

import { execSyncPretty } from '../utils/exec_sync_pretty';

export function compile(
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
