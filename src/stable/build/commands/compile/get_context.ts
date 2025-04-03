import { existsSync } from 'fs';
import { dirname, join, parse, relative } from 'path';

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

    const pathRelativeToDfxRoot = relative(getDfxJsonDirPath(), main);
    const pathRelativeToProjectRoot = relative(
        projectRoot,
        pathRelativeToDfxRoot
    );

    return {
        canisterPath,
        candidPath,
        main: {
            pathRelativeToDfxRoot,
            pathRelativeToProjectRoot
        },
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
        'AZLE_VERSION'
    ];

    console.log(
        '>>>>>>>>>>>>>>>>>>>>>>>>>> We are going to start going over the env vars'
    );
    return env
        .filter(
            (envVarName) =>
                envVarName === 'AZLE_VERSION' ||
                process.env[envVarName] !== undefined
        )
        .map((envVarName) => {
            console.log(envVarName);
            if (envVarName === 'AZLE_VERSION') {
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
 * Finds the project root directory (the directory containing the package.json file)
 * by checking common environment variables and searching parent directories.
 * @returns The absolute path to the project root directory.
 * @throws Throws an error if a `package.json` file cannot be found using any of the attempted methods.
 *
 * @remarks
 * The function attempts to locate the project root using the following methods in order:
 * 1. If the `npm_config_prefix` environment variable is set, it searches upwards from that path for the nearest directory containing `package.json`.
 * 2. If the `npm_package_json` environment variable is set and points to an existing `package.json` file, it returns the directory containing that file.
 * 3. It searches upwards from the current working directory (`process.cwd()`) for the nearest directory containing `package.json`.
 *
 * If none of these methods succeed in finding a `package.json` file, the function throws an error indicating that it could not determine the project root.
 */
async function findProjectRoot(): Promise<string> {
    // Method 1: Check if the script was called with an explicit prefix
    if (process.env.npm_config_prefix !== undefined) {
        const prefixPath = process.env.npm_config_prefix;

        const projectRoot = findNearestProjectRoot(prefixPath);

        if (projectRoot !== undefined) {
            return projectRoot;
        }
    }

    // Method 2: Try to use npm_package_json which points to package.json
    if (process.env.npm_package_json !== undefined) {
        if (existsSync(process.env.npm_package_json)) {
            return dirname(process.env.npm_package_json);
        }
    }

    // Method 3: Look for package.json in parent directories
    const projectRoot = findNearestProjectRoot(process.cwd());

    if (projectRoot !== undefined) {
        return projectRoot;
    }

    throw new Error(
        `Could not find a package.json file in the current directory or any parent directory.\nPlease ensure you are running this command from within a valid Azle project.`
    );
}

/**
 * Finds the nearest directory containing a package.json file by traversing up the directory tree.
 * @param startPath - Path to start the search from (file or directory)
 * @returns The directory containing package.json, or undefined if not found
 */
function findNearestProjectRoot(startPath: string): string | undefined {
    if (existsSync(join(startPath, 'package.json'))) {
        return startPath;
    }

    const rootDir = parse(startPath).root;
    if (startPath === rootDir) {
        return undefined;
    }

    return findNearestProjectRoot(dirname(startPath));
}
