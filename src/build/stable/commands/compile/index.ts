import { IOType } from 'child_process';
import { mkdir, rm, writeFile } from 'fs/promises';
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
    const { main, canisterPath, candidPath, envVars, wasmBinaryPath } =
        getContext(canisterName, canisterConfig);

    await createHiddenAzleDirectories(canisterPath);

    const javaScript = await compileJavaScript(main);

    const { candid, methodMeta } = await getCandidAndMethodMeta(
        canisterName,
        canisterConfig.custom?.candid_gen,
        canisterPath,
        candidPath,
        javaScript,
        ioType,
        envVars
    );

    const wasmBinary = await getWasmBinary(
        canisterName,
        ioType,
        javaScript,
        envVars,
        canisterPath,
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

export async function createHiddenAzleDirectories(
    canisterPath: string
): Promise<void> {
    await rm(canisterPath, { recursive: true, force: true });
    await mkdir(canisterPath, { recursive: true });
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
