import { execSync, IOType } from 'child_process';
import {
    GLOBAL_AZLE_RUST_DIR,
    GLOBAL_AZLE_RUST_BIN_DIR,
    GLOBAL_AZLE_TARGET_DIR,
    time
} from './utils';

export function compileRustCode(
    canisterName: string,
    canisterPath: string,
    stdio: IOType
) {
    execSync(
        `cd ${canisterPath} && ${GLOBAL_AZLE_RUST_BIN_DIR}/cargo build --target wasm32-wasi --manifest-path canister/Cargo.toml --release`,
        {
            stdio,
            env: {
                ...process.env,
                CARGO_TARGET_DIR: GLOBAL_AZLE_TARGET_DIR,
                CARGO_HOME: GLOBAL_AZLE_RUST_DIR,
                RUSTUP_HOME: GLOBAL_AZLE_RUST_DIR,
                CARGO_REGISTRIES_CRATES_IO_PROTOCOL: 'sparse'
                // TODO this allows changing the stack size, could be useful for stack overflow or heap out of bounds errors
                // RUSTFLAGS: '-C link-args=-zstack-size=2000000000'
            }
        }
    );

    const wasmTargetFilePath = `${GLOBAL_AZLE_TARGET_DIR}/wasm32-wasi/release/canister.wasm`;

    execSync(`cp ${wasmTargetFilePath} ${canisterPath}`);

    execSync(
        `cd ${canisterPath} && ${GLOBAL_AZLE_RUST_BIN_DIR}/wasi2ic canister.wasm ${canisterName}.wasm`,
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
}
