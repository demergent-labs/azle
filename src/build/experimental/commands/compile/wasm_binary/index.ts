import { IOType } from 'child_process';
import { existsSync } from 'fs';

import { WasmData } from '#experimental/utils/types';
import { MethodMeta } from '#utils/types';

import { manipulateWasmBinary } from '../../../../stable/commands/compile/wasm_binary/manipulate';
import { EXPERIMENTAL_STATIC_CANISTER_TEMPLATE_PATH } from '../../../utils/global_paths';
import { runCommand as runTemplateCommand } from '../../template';

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
        await runTemplateCommand(ioType);
    }

    return await manipulateWasmBinary<WasmData>(
        js,
        EXPERIMENTAL_STATIC_CANISTER_TEMPLATE_PATH,
        wasmData,
        false,
        methodMeta
    );
}
