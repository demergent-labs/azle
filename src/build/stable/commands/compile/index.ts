import { IOType } from 'child_process';
import { writeFile } from 'fs/promises';
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

    const javaScript = await compileJavaScript(main);

    const { candid, methodMeta } = await getCandidAndMethodMeta(
        canisterConfig.custom?.candid_gen,
        candidPath,
        javaScript,
        ioType,
        wasmData
    );

    const wasmBinary = await getWasmBinary(
        ioType,
        javaScript,
        wasmData,
        methodMeta
    );

    await writeGeneratedFiles(
        canisterPath,
        candidPath,
        wasmBinaryPath,
        candid,
        javaScript,
        wasmBinary
    );
}

export async function writeGeneratedFiles(
    canisterPath: string,
    candidPath: string,
    wasmBinaryPath: string,
    candid: string,
    javaScript: string,
    wasmBinary: Uint8Array
): Promise<void> {
    await writeFile(candidPath, candid);
    await writeFile(join(canisterPath, 'main.js'), javaScript);
    await writeFile(wasmBinaryPath, wasmBinary);
}
