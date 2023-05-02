import { execSync, IOType } from 'child_process';

import {
    GLOBAL_AZLE_BIN_DIR,
    GLOBAL_AZLE_CONFIG_DIR,
    GLOBAL_AZLE_RUST_DIR,
    GLOBAL_AZLE_TARGET_DIR,
    time
} from './utils';

export function compileRustCode(
    canisterName: string,
    canisterPath: string,
    stdio: IOType
) {
    time(`[2/2] 🚧 Building Wasm binary...`, 'inline', () => {
        execSync(
            `cd ${canisterPath} && ${GLOBAL_AZLE_BIN_DIR}/cargo build --target wasm32-unknown-unknown --package ${canisterName} --release`,
            {
                stdio,
                env: {
                    ...process.env,
                    CARGO_TARGET_DIR: GLOBAL_AZLE_TARGET_DIR,
                    CARGO_HOME: GLOBAL_AZLE_RUST_DIR,
                    RUSTUP_HOME: GLOBAL_AZLE_RUST_DIR
                }
            }
        );

        const wasmTargetFilePath = `${GLOBAL_AZLE_CONFIG_DIR}/target/wasm32-unknown-unknown/release/${canisterName}.wasm`;

        execSync(`cp ${wasmTargetFilePath} ${canisterPath}`);
    });
}
