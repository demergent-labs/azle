import { IOType } from 'child_process';
import { existsSync } from 'fs';

import { manipulateWasmBinary } from '#commands/build/wasm_binary/manipulate';
import { EXPERIMENTAL_STATIC_CANISTER_TEMPLATE_PATH } from '#experimental/utils/global_paths';
import { WasmData } from '#experimental/utils/types';
import { MethodMeta } from '#utils/types';

import { runCommand as runDevTemplateCommand } from '../../dev/template';

export async function getWasmBinary(
    ioType: IOType,
    js: string,
    wasmData: WasmData,
    methodMeta?: MethodMeta
): Promise<Uint8Array> {
    if (
        process.env.AZLE_TEMPLATE === 'true' ||
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
