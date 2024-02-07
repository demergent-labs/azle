import { execSync, IOType } from 'child_process';

export function compileRustCode(
    azleVersion: string,
    canisterName: string,
    stdio: IOType
) {
    execSync(
        `docker exec azle_${azleVersion}_container rm -rf /.azle/${canisterName}`,
        { stdio }
    );

    execSync(`docker exec azle_${azleVersion}_container mkdir -p /.azle`, {
        stdio
    });

    execSync(
        `docker exec azle_${azleVersion}_container mkdir -p /global_target_dir`,
        {
            stdio
        }
    );

    execSync(
        `docker cp .azle/${canisterName} azle_${azleVersion}_container:/.azle`,
        { stdio }
    );

    execSync(
        `docker exec -w /.azle/${canisterName} azle_${azleVersion}_container env CARGO_TARGET_DIR=/global_target_dir cargo build --target wasm32-wasi --manifest-path canister/Cargo.toml --release`,
        { stdio }
    );

    execSync(
        `docker exec -w /.azle/${canisterName} azle_${azleVersion}_container wasi2ic /global_target_dir/wasm32-wasi/release/canister.wasm /global_target_dir/wasm32-wasi/release/canister.wasm`,
        { stdio }
    );

    execSync(
        `docker cp azle_${azleVersion}_container:/global_target_dir/wasm32-wasi/release/canister.wasm .azle/${canisterName}/${canisterName}.wasm`,
        { stdio }
    );
}
