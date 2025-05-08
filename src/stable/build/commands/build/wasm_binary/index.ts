import { IOType } from 'child_process';
import { existsSync } from 'fs';

import { runCommand as runDevTemplateCommand } from '#build/commands/dev/template/stable';
import { STABLE_STATIC_CANISTER_TEMPLATE_PATH } from '#utils/global_paths';
import { MethodMeta, WasmData } from '#utils/types';

import { manipulateWasmBinary } from './manipulate';

export async function getWasmBinary(
    ioType: IOType,
    js: string,
    wasmData: WasmData,
    methodMeta?: MethodMeta
): Promise<Uint8Array> {
    if (
        process.env.AZLE_DEV_TEMPLATE === 'true' ||
        !existsSync(STABLE_STATIC_CANISTER_TEMPLATE_PATH)
    ) {
        await runDevTemplateCommand(ioType);
    }

    return await manipulateWasmBinary<WasmData>(
        js,
        STABLE_STATIC_CANISTER_TEMPLATE_PATH,
        wasmData,
        false,
        methodMeta
    );
}
