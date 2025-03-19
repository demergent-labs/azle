import { IOType } from 'child_process';
import { rm } from 'fs/promises';
import { outputFile } from 'fs-extra';
import { join } from 'path';

import { CanisterConfig } from '#utils/types';

import { getCandidAndMethodMeta } from './candid_and_method_meta';
import { getContext } from './get_context';
import { compile as compileJavaScript } from './javascript';
import { getWasmBinary } from './wasm_binary';

export async function runCommand(
    canisterName: string,
    canisterConfig: CanisterConfig,
    ioType: IOType
): Promise<void> {
    console.log('hello from current azle');
    const { main, canisterPath, candidPath, wasmBinaryPath, wasmData } =
        getContext(canisterName, canisterConfig);

    await rm(canisterPath, { recursive: true, force: true });

    console.log('before compileJavaScript');
    const javaScript = await compileJavaScript(main);
    console.log('after compileJavaScript');

    console.log('before outputFile');
    await outputFile(join(canisterPath, 'main.js'), javaScript);
    console.log('after outputFile');

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
