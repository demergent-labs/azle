import { IOType } from 'child_process';
import { mkdir, rm, writeFile } from 'fs/promises';
import { dirname, join } from 'path';

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
    const { candidPath, canisterPath, main, wasmBinaryPath, wasmData } =
        await getContext(canisterName, canisterConfig);

    // Clear out any old build artifacts for this canister
    await rm(canisterPath, { recursive: true, force: true });

    const javaScript = await compileJavaScript(main);

    const mainJsPath = join(canisterPath, 'main.js');
    await mkdir(dirname(mainJsPath), { recursive: true });
    await writeFile(mainJsPath, javaScript);

    const { candid, methodMeta } = await getCandidAndMethodMeta(
        canisterConfig.custom?.candid_gen,
        candidPath,
        javaScript,
        ioType,
        wasmData
    );

    await mkdir(dirname(candidPath), { recursive: true });
    await writeFile(candidPath, candid);

    const wasmBinary = await getWasmBinary(
        ioType,
        javaScript,
        wasmData,
        methodMeta
    );

    await mkdir(dirname(wasmBinaryPath), { recursive: true });
    await writeFile(wasmBinaryPath, wasmBinary);
}
