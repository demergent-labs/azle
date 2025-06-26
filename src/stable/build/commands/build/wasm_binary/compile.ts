import { IOType } from 'child_process';

import { execSyncPretty } from '#utils/exec_sync_pretty';
import { AZLE_CARGO_TARGET_DIR, AZLE_ROOT } from '#utils/global_paths';

export function compile(
    manifestPath: string,
    wasmDest: string,
    ioType: IOType,
    experimental: boolean = false
): void {
    runSecurityChecks(ioType);

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

/**
 * Runs security checks (cargo audit and cargo deny check) before compilation.
 * This helps ensure that dependencies don't have known security vulnerabilities
 * or violate licensing policies.
 */
function runSecurityChecks(ioType: IOType): void {
    execSyncPretty('cargo audit', {
        stdio: ioType,
        cwd: AZLE_ROOT
    });
    execSyncPretty('cargo deny check', {
        stdio: ioType,
        cwd: AZLE_ROOT
    });
}
