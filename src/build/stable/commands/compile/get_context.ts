import { join } from 'path';

import { CanisterConfig, Context, EnvVars } from '../../utils/types';

export function getContext(
    canisterName: string,
    canisterConfig: CanisterConfig
): Context {
    const main = canisterConfig?.main;

    if (main === undefined) {
        throw new Error(
            `Your dfx.json canister configuration object must have a "main" property pointing to your canister's entrypoint .ts or .js file`
        );
    }

    const canisterPath = join('.azle', canisterName);

    const candidPath = process.env.CANISTER_CANDID_PATH;

    if (candidPath === undefined) {
        throw new Error(`Azle: CANISTER_CANDID_PATH is not defined`);
    }

    const wasmBinaryPath = join(canisterPath, `${canisterName}.wasm`);

    const envVars = getEnvVars(canisterConfig);
    const wasmData = {
        envVars
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
    const env = canisterConfig.custom?.env ?? [];

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
