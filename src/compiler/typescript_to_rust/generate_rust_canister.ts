import { spawnSync } from 'child_process';
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import {
    GLOBAL_AZLE_BIN_DIR,
    GLOBAL_AZLE_CONFIG_DIR,
    GLOBAL_AZLE_RUST_DIR,
    GLOBAL_AZLE_TARGET_DIR
} from '../utils';
import { Result } from '../../lib';
import { JSCanisterConfig, Plugin, SpawnSyncError } from '../utils/types';
import { isVerboseMode } from '../utils';
import { version as azleVersion } from '../../../package.json';

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
    const azleGenerateBinPath = join(
        GLOBAL_AZLE_CONFIG_DIR,
        'azle_generate',
        azleVersion,
        'azle_generate'
    );
    const azleGenerateBinPathDebug = join(
        GLOBAL_AZLE_TARGET_DIR,
        'debug',
        'azle_generate'
    );
    const azleGenerateDir = join(
        canisterPath,
        canisterConfig.root,
        'azle_generate'
    );

    const shouldRebuild =
        !existsSync(azleGenerateBinPath) || process.env.AZLE_REBUILD === 'true';

    if (shouldRebuild) {
        const buildResult = buildBinary(
            azleGenerateBinPath,
            azleGenerateBinPathDebug,
            azleGenerateDir
        );

        if (buildResult.Err !== undefined) {
            return Result.Err(buildResult.Err);
        }
    }

    return runBinary(
        azleGenerateBinPath,
        azleGenerateDir,
        compilerInfoPath,
        canisterConfig
    );
}

function buildBinary(
    azleGenerateBinPath: string,
    azleGenerateBinPathDebug: string,
    azleGenerateDir: string
): Result<null, SpawnSyncError> {
    mkdirSync(join(GLOBAL_AZLE_CONFIG_DIR, 'azle_generate', azleVersion), {
        recursive: true
    });

    const buildResult = spawnSync(`${GLOBAL_AZLE_BIN_DIR}/cargo`, ['build'], {
        cwd: azleGenerateDir,
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

    copyFileSync(azleGenerateBinPathDebug, azleGenerateBinPath);

    return Result.Ok(null);
}

function runBinary(
    azleGenerateBinPath: string,
    azleGenerateDir: string,
    compilerInfoPath: string,
    canisterConfig: JSCanisterConfig
): Result<null, SpawnSyncError> {
    const runResult = spawnSync(
        azleGenerateBinPath,
        [compilerInfoPath, (canisterConfig.env ?? []).join(',')],
        {
            cwd: azleGenerateDir,
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
