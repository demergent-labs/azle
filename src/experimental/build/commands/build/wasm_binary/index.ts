import { IOType } from 'child_process';
import { existsSync } from 'fs';

import { runCommand as runDevTemplateCommand } from '#build/commands/dev/template/experimental';
import { manipulateWasmBinary } from '#commands/build/wasm_binary/manipulate';
import { WasmData } from '#experimental/utils/types';
import { EXPERIMENTAL_STATIC_CANISTER_TEMPLATE_PATH } from '#utils/global_paths';
import { MethodMeta } from '#utils/types';

export async function getWasmBinary(
    ioType: IOType,
    js: string,
    wasmData: WasmData,
    methodMeta?: MethodMeta
): Promise<Uint8Array> {
    if (
        process.env.AZLE_DEV_TEMPLATE === 'true' ||
        !existsSync(EXPERIMENTAL_STATIC_CANISTER_TEMPLATE_PATH)
    ) {
        await runDevTemplateCommand(ioType);
    }

    return await manipulateWasmBinary<WasmData>(
        js,
        EXPERIMENTAL_STATIC_CANISTER_TEMPLATE_PATH,
        wasmData,
        false,
        methodMeta
    );
}
