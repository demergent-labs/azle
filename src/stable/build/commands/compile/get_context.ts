import { existsSync } from 'fs';
import { stat } from 'fs/promises';
import { dirname, join, parse } from 'path';

import { getDfxJsonDirPath } from '#utils/global_paths';
import { CanisterConfig, Context, EnvVars, WasmData } from '#utils/types';

import { version } from '../../../../../package.json';

export async function getContext(
    canisterName: string,
    canisterConfig: CanisterConfig
): Promise<Context> {
    const main = canisterConfig?.main;

    if (main === undefined) {
        throw new Error(
            `Your dfx.json canister configuration object must have a "main" property pointing to your canister's entrypoint .ts or .js file`
        );
    }

    const canisterPath = join(getDfxJsonDirPath(), '.azle', canisterName);

    const candidPath = process.env.CANISTER_CANDID_PATH;

    if (candidPath === undefined) {
        throw new Error(`CANISTER_CANDID_PATH is not defined`);
    }

    const wasmBinaryPath = join(canisterPath, `${canisterName}.wasm`);

    const envVars = getEnvVars(canisterConfig);
    const wasmData: WasmData = {
        envVars,
        mainJsPath: join(canisterPath, `main.js`)
    };

    const projectRoot = await findProjectRoot();

    // Get absolute path of main
    const absoluteMainPath = join(getDfxJsonDirPath(), main);

    return {
        canisterPath,
        candidPath,
        main: absoluteMainPath,
        projectRoot,
        wasmBinaryPath,
        wasmData
    };
}

function getEnvVars(canisterConfig: CanisterConfig): EnvVars {
    const devEnv = canisterConfig.custom?.env ?? [];

    // We add our own environment variables that we don't want to force
    // the developer to define in their dfx.json
    const env = [
        ...devEnv,
        'AZLE_LOG_ACTIONS',
        'AZLE_RECORD_ACTIONS',
        'AZLE_RECORD_BENCHMARKS',
        'AZLE_AZLE_VERSION'
    ];

    return env
        .filter(
            (envVarName) =>
                envVarName === 'AZLE_AZLE_VERSION' ||
                process.env[envVarName] !== undefined
        )
        .map((envVarName) => {
            if (envVarName === 'AZLE_AZLE_VERSION') {
                return [envVarName, version];
            }

            const envVarValue = process.env[envVarName];

            if (envVarValue === undefined) {
                throw new Error(
                    `Environment variable ${envVarName} must be undefined`
                );
            }

            return [envVarName, envVarValue];
        });
}

/**
 * Finds the project root directory through multiple fallback methods.
 * @returns The determined project root directory path
 *
 * @remarks
 * First tries using npm_config_prefix (if script called with --prefix),
 * then attempts to use npm_package_json environment variable,
 * then searches for package.json in parent directories,
 * and finally falls back to the current working directory if all else fails.
 */
async function findProjectRoot(): Promise<string> {
    // Method 1: Check if the script was called with an explicit prefix
    if (process.env.npm_config_prefix) {
        let prefixPath = process.env.npm_config_prefix;

        // Check if the prefix is a file rather than a directory
        try {
            const stats = await stat(prefixPath);

            // If it's a file, use its parent directory
            if (!stats.isDirectory()) {
                return dirname(prefixPath);
            } else {
                return prefixPath;
            }
        } catch {
            // If path doesn't exist, just keep the original path
            // This will be handled by other methods
        }
    }

    // Method 2: Try to use npm_package_json which points to package.json
    if (process.env.npm_package_json) {
        return dirname(process.env.npm_package_json);
    }

    // Method 3: Check for presence of expected files/directories in ancestor directories
    // Look for package.json in parent directories
    let currentDir = process.cwd();
    const rootDir = parse(currentDir).root;

    while (currentDir !== rootDir) {
        if (existsSync(join(currentDir, 'package.json'))) {
            return currentDir;
        }
        currentDir = dirname(currentDir);
    }

    // Fall back to current working directory
    return process.cwd();
}
