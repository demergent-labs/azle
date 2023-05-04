import { spawnSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';
import {
    GLOBAL_AZLE_BIN_DIR,
    GLOBAL_AZLE_RUST_DIR,
    GLOBAL_AZLE_TARGET_DIR
} from '../utils';
import { Result } from '../../lib';
import { JSCanisterConfig, Plugin, SpawnSyncError } from '../utils/types';
import { isVerboseMode } from '../utils';

// TODO I think we should use the official Azle Result and match everywhere
// TODO we should get rid of the custom ones created here
export function generateRustCanister(
    fileNames: string[],
    plugins: Plugin[],
    canisterPath: string,
    canisterConfig: JSCanisterConfig
): Result<null, SpawnSyncError> {
    const compilerInfo = {
        plugins,
        file_names: fileNames
    };

    const compilerInfoPath = join(
        canisterPath,
        canisterConfig.root,
        'azle_generate',
        'compiler_info.json'
    );

    // TODO why not just write the dfx.json file here as well?
    writeFileSync(compilerInfoPath, JSON.stringify(compilerInfo));

    const result = runAzleGenerate(
        'compiler_info.json',
        canisterPath,
        canisterConfig
    );

    return result;
}

function runAzleGenerate(
    compilerInfoPath: string,
    canisterPath: string,
    canisterConfig: JSCanisterConfig
): Result<null, SpawnSyncError> {
    // TODO to cut the time in half here, if we can just generate the binary
    // TODO and then after that use the binary, that could work
    // TODO the problem is that this binary is stored in a global target dir
    // TODO we might need to have an azle-version-specific dir for the azle_generate binary
    // TODO maybe that's fine and easy though
    const buildResult = spawnSync(`${GLOBAL_AZLE_BIN_DIR}/cargo`, ['build'], {
        cwd: `${canisterPath}/${canisterConfig.root}/azle_generate`,
        stdio: [
            'inherit',
            isVerboseMode() ? 'inherit' : 'pipe',
            isVerboseMode() ? 'inherit' : 'pipe'
        ],
        env: {
            ...process.env,
            CARGO_TARGET_DIR: GLOBAL_AZLE_TARGET_DIR,
            CARGO_HOME: GLOBAL_AZLE_RUST_DIR,
            RUSTUP_HOME: GLOBAL_AZLE_RUST_DIR
        }
    });

    if (buildResult.error) {
        return Result.Err({
            Error: buildResult.error.message
        });
    }

    if (buildResult.signal) {
        return Result.Err({
            Signal: buildResult.signal
        });
    }

    if (buildResult.status !== null && buildResult.status !== 0) {
        return Result.Err({
            Status: buildResult.status
        });
    }

    // TODO right here let's copy the binary over to a special location in ~/.config/azle/azle_version
    // TODO if it isn't there, then we build and store it there
    // TODO if it is there, then we just leave it there
    // TODO but what about during development? We'll never get the binary to change if developing

    const runResult = spawnSync(
        `${GLOBAL_AZLE_TARGET_DIR}/debug/azle_generate`,
        [compilerInfoPath, (canisterConfig.env ?? []).join(',')],
        {
            cwd: `${canisterPath}/${canisterConfig.root}/azle_generate`,
            stdio: ['inherit', isVerboseMode() ? 'inherit' : 'pipe', 'inherit'],
            env: {
                ...process.env,
                CARGO_TARGET_DIR: GLOBAL_AZLE_TARGET_DIR,
                CARGO_HOME: GLOBAL_AZLE_RUST_DIR,
                RUSTUP_HOME: GLOBAL_AZLE_RUST_DIR
            }
        }
    );

    if (runResult.error) {
        return Result.Err({
            Error: runResult.error.message
        });
    }

    if (runResult.signal) {
        return Result.Err({
            Signal: runResult.signal
        });
    }

    if (runResult.status !== null && runResult.status !== 0) {
        return Result.Err({
            Status: runResult.status
        });
    }

    return Result.Ok(null);
}
