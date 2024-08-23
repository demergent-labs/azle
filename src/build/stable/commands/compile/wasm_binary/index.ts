import { IOType } from 'child_process';
import { existsSync } from 'fs';

import { CanisterConfig } from '../../../utils/get_canister_config';
import { STABLE_STATIC_CANISTER_TEMPLATE_PATH } from '../../../utils/global_paths';
import { logGlobalDependencies } from '../../../utils/log_global_dependencies';
import { EnvVars } from '../../../utils/types';
import { MethodMeta } from '../candid_and_method_meta';
import { compile } from './compile';
import { manipulateWasmBinary } from './manipulate';
import { prepareRustStagingArea } from './prepare_rust_staging_area';

export async function getWasmBinary(
    canisterName: string,
    stdio: IOType,
    js: string,
    canisterConfig: CanisterConfig,
    canisterPath: string,
    methodMeta?: MethodMeta
): Promise<Uint8Array> {
    if (
        process.env.AZLE_GEN_WASM === 'true' ||
        !existsSync(STABLE_STATIC_CANISTER_TEMPLATE_PATH)
    ) {
        await logGlobalDependencies();

        await prepareRustStagingArea(canisterPath);

        compile(
            STABLE_STATIC_CANISTER_TEMPLATE_PATH,
            canisterName,
            false,
            stdio
        );
    }

    return await manipulateWasmBinary(
        js,
        getEnvVars(canisterConfig),
        methodMeta
    );
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
