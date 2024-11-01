import { IOType } from 'child_process';
import { rm } from 'fs/promises';
import { outputFile } from 'fs-extra';
import { join } from 'path';

import { CanisterConfig } from '../../utils/types';
import { getCandidAndMethodMeta } from './candid_and_method_meta';
import { getContext } from './get_context';
import { compile as compileJavaScript } from './javascript';
import { getWasmBinary } from './wasm_binary';

export async function runCommand(
    canisterName: string,
    canisterConfig: CanisterConfig,
    ioType: IOType
): Promise<void> {
    const { main, canisterPath, candidPath, wasmBinaryPath, wasmData } =
        getContext(canisterName, canisterConfig);

    await rm(canisterPath, { recursive: true, force: true });

    const javaScript = await compileJavaScript(main);

    await outputFile(join(canisterPath, 'main.js'), javaScript);

    const { candid, methodMeta } = await getCandidAndMethodMeta(
        canisterConfig.custom?.candid_gen,
        candidPath,
        javaScript,
        ioType,
        wasmData
    );

    await outputFile(candidPath, candid);

    const wasmBinary = await getWasmBinary(
        ioType,
        javaScript,
        wasmData,
        methodMeta
    );

    await outputFile(wasmBinaryPath, wasmBinary);
}
