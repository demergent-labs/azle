import { IOType } from 'child_process';
import { existsSync } from 'fs';

import { manipulateWasmBinary } from '../../../../stable/commands/compile/wasm_binary/manipulate';
import { logGlobalDependencies } from '../../../../stable/utils/log_global_dependencies';
import { MethodMeta } from '../../../../stable/utils/types';
import { EXPERIMENTAL_CANISTER_TEMPLATE_PATH } from '../../../utils/global_paths';
import { WasmData } from '../../../utils/types';
import { compile } from './compile';
import { prepareRustStagingArea } from './prepare_rust_staging_area';

export async function getWasmBinary(
    canisterName: string,
    stdio: IOType,
    js: string,
    wasmData: WasmData,
    canisterPath: string,
    methodMeta?: MethodMeta
): Promise<Uint8Array> {
    if (
        process.env.AZLE_GEN_WASM === 'true' ||
        !existsSync(EXPERIMENTAL_CANISTER_TEMPLATE_PATH)
    ) {
        await logGlobalDependencies();

        await prepareRustStagingArea(canisterPath);

        compile(EXPERIMENTAL_CANISTER_TEMPLATE_PATH, canisterName, stdio);
    }

    return await manipulateWasmBinary<WasmData>(
        js,
        EXPERIMENTAL_CANISTER_TEMPLATE_PATH,
        wasmData,
        methodMeta
    );
}
