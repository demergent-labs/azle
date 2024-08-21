import { IOType } from 'child_process';
import { existsSync } from 'fs';

import { CanisterConfig } from '../../get_canister_config';
import { MethodMeta } from '../candid_and_method_meta';
import { STABLE_STATIC_CANISTER_TEMPLATE_PATH } from '../utils/global_paths';
import { logGlobalDependencies } from '../utils/log_global_dependencies';
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
        canisterConfig.custom?.env ?? [],
        methodMeta
    );
}
