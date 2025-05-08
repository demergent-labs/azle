import { IOType } from 'child_process';

import { execSyncPretty } from '#utils/exec_sync_pretty';
import { AZLE_CARGO_TARGET_DIR } from '#utils/global_paths';

export function compile(
    manifestPath: string,
    wasmDest: string,
    ioType: IOType,
    experimental: boolean = false
): void {
    execSyncPretty(
        `CARGO_TARGET_DIR=${AZLE_CARGO_TARGET_DIR} cargo build --target wasm32-wasip1 --manifest-path ${manifestPath} --release --locked`,
        {
            stdio: ioType
        }
    );

    execSyncPretty(
        `wasi2ic ${AZLE_CARGO_TARGET_DIR}/wasm32-wasip1/release/${
            experimental === true ? 'experimental' : 'stable'
        }_canister_template.wasm ${wasmDest}`,
        {
            stdio: ioType
        }
    );
}
