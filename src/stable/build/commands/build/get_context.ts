import { join } from 'path';

import { getDfxRoot } from '#utils/dfx_root';
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

    const canisterPath = join(getDfxRoot(), '.azle', canisterName);

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

    return {
        canisterPath,
        candidPath,
        main,
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

    return env
        .filter(
            (envVarName) =>
                envVarName === 'AZLE_VERSION' ||
                process.env[envVarName] !== undefined
        )
        .map((envVarName) => {
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
