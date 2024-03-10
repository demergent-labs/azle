import { execSync, IOType } from 'child_process';

export function compileRustCode(
    dockerContainerName: string,
    canisterName: string,
    stdio: IOType,
    nativeCompilation: boolean
) {
    if (nativeCompilation === true) {
        compileRustCodeNatively(canisterName, stdio);
    } else {
        compileRustCodeWithPodman(dockerContainerName, canisterName, stdio);
    }
}

function compileRustCodeWithPodman(
    dockerContainerName: string,
    canisterName: string,
    stdio: IOType
) {
    execSync(
        `podman exec ${dockerContainerName} rm -rf /.azle/${canisterName}`,
        { stdio }
    );

    execSync(`podman exec ${dockerContainerName} mkdir -p /.azle`, {
        stdio
    });

    execSync(`podman exec ${dockerContainerName} mkdir -p /global_target_dir`, {
        stdio
    });

    execSync(`podman cp .azle/${canisterName} ${dockerContainerName}:/.azle`, {
        stdio
    });

    execSync(
        `podman exec -w /.azle/${canisterName} ${dockerContainerName} env CARGO_TARGET_DIR=/global_target_dir cargo build --target wasm32-wasi --manifest-path canister/Cargo.toml --release`,
        { stdio }
    );

    execSync(
        `podman exec -w /.azle/${canisterName} ${dockerContainerName} wasi2ic /global_target_dir/wasm32-wasi/release/canister.wasm /global_target_dir/wasm32-wasi/release/canister.wasm`,
        { stdio }
    );

    execSync(
        `podman cp ${dockerContainerName}:/global_target_dir/wasm32-wasi/release/canister.wasm .azle/${canisterName}/${canisterName}.wasm`,
        { stdio }
    );
}

function compileRustCodeNatively(canisterName: string, stdio: IOType) {
    execSync(
        `CARGO_TARGET_DIR=target cargo build --target wasm32-wasi --manifest-path .azle/${canisterName}/canister/Cargo.toml --release`,
        { stdio }
    );

    execSync(
        `wasi2ic target/wasm32-wasi/release/canister.wasm .azle/${canisterName}/${canisterName}.wasm`,
        { stdio }
    );
}
