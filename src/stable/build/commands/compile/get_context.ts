import { existsSync, statSync } from 'fs';
import { dirname, join, relative } from 'path';

import { AZLE_DFX_JSON_DIR } from '#utils/global_paths';
import { CanisterConfig, Context, EnvVars, WasmData } from '#utils/types';

/**
 * Finds the correct working directory that should match where npm is executing the script
 * when running with --prefix option
 * @returns The correct working directory or null if not found
 */
export function findCorrectWorkingDirectory(): string {
    // Try different methods to find the correct directory
    let targetDir: string | null = null;

    // Method 1: Check if the script was called with an explicit prefix
    if (process.env.npm_config_prefix) {
        let prefixPath = process.env.npm_config_prefix;

        // Check if the prefix is a file rather than a directory
        try {
            const stats = statSync(prefixPath);

            // If it's a file, use its parent directory
            if (!stats.isDirectory()) {
                prefixPath = dirname(prefixPath);
            }
        } catch (_error) {
            // If path doesn't exist, just keep the original path
            // This will be handled by other methods
        }

        targetDir = prefixPath;
    }

    // Method 2: Try to use npm_package_json which points to package.json
    if (!targetDir && process.env.npm_package_json) {
        targetDir = dirname(process.env.npm_package_json);
    }

    // Method 3: Check for presence of expected files/directories in ancestor directories
    if (!targetDir) {
        // Look for package.json in parent directories
        let currentDir = process.cwd();
        let prevDir = '';

        while (currentDir !== prevDir) {
            if (existsSync(join(currentDir, 'package.json'))) {
                targetDir = currentDir;
                break;
            }
            prevDir = currentDir;
            currentDir = dirname(currentDir);
        }
    }

    // Return the found directory or fall back to current working directory
    return targetDir || process.cwd();
}

export function getContext(
    canisterName: string,
    canisterConfig: CanisterConfig
): Context {
    // Find the correct working directory that should be used for all path resolutions
    const baseDir = findCorrectWorkingDirectory();

    const main = canisterConfig?.main;

    if (main === undefined) {
        throw new Error(
            `Your dfx.json canister configuration object must have a "main" property pointing to your canister's entrypoint .ts or .js file`
        );
    }

    const canisterPath = join(AZLE_DFX_JSON_DIR, '.azle', canisterName);

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

    // package.json should be in the correct npm prefix directory
    const packageJsonPath = join(baseDir, 'package.json');

    // Transform main path to be relative to package.json location instead of dfx.json location
    // First get the absolute path (relative to cwd where dfx.json is)
    const absoluteMainPath = join(AZLE_DFX_JSON_DIR, main);
    // Then make it relative to baseDir (where package.json is)
    const relativeMainPath = relative(baseDir, absoluteMainPath);

    // Use the transformed main path in the context
    const transformedMain = relativeMainPath;

    console.log(`Original main path (relative to dfx.json): ${main}`);
    console.log(`Absolute main path: ${absoluteMainPath}`);
    console.log(`Base directory (package.json location): ${baseDir}`);
    console.log(
        `Transformed main path (relative to package.json): ${transformedMain}`
    );

    return {
        canisterPath,
        candidPath,
        main: transformedMain,
        packageJsonPath,
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
        'AZLE_RECORD_BENCHMARKS'
    ];

    return env
        .filter((envVarName) => process.env[envVarName] !== undefined)
        .map((envVarName) => {
            const envVarValue = process.env[envVarName];

            if (envVarValue === undefined) {
                throw new Error(
                    `Environment variable ${envVarName} must be undefined`
                );
            }

            return [envVarName, envVarValue];
        });
}
