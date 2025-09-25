import { IOType } from 'child_process';
import { readFile } from 'fs/promises';

import { CandidAndMethodMeta, CandidGen, WasmData } from '#utils/types';

import { getWasmBinary } from '../wasm_binary';
import { execute } from './execute';

/**
 * Derives the canister's Candid definition and method metadata by running a local WebAssembly instance.
 *
 * @remarks
 * - Motivation: Candid and rich method metadata (queries/updates, indices, visibility, etc.) are needed before deployment
 *   to finalize the manipulated Wasm and write the `.did` file. They can only be derived at runtime from the decorated canister code,
 * - How it works:
 *   - Builds an instrumented Wasm via `getWasmBinary(ioType, js, wasmData)`.
 *   - Executes that Wasm in-process to obtain `{ candid, methodMeta }`.
 *   - If `candidGen` is `custom`, reads the Candid from `candidPath` instead of the generated one.
 *
 * @param candidGen - Optional mode that, when set to `custom`, sources Candid from `candidPath`.
 * @param candidPath - Filesystem path to the Candid file used when `candidGen === 'custom'`.
 * @param js - The bundled JavaScript source string produced earlier.
 * @param ioType - Controls I/O behavior of downstream build steps.
 * @param wasmData - Auxiliary data embedded into the Wasm (env vars and `mainJsPath`).
 * @returns The generated or custom Candid string and associated method metadata.
 */
export async function getCandidAndMethodMeta(
    candidGen: CandidGen | undefined,
    candidPath: string,
    js: string,
    ioType: IOType,
    wasmData: WasmData
): Promise<CandidAndMethodMeta> {
    const wasmBinary = await getWasmBinary(ioType, js, wasmData);

    const { candid, methodMeta } = await execute(wasmBinary);

    return {
        candid:
            candidGen === 'custom'
                ? (await readFile(candidPath)).toString()
                : candid,
        methodMeta
    };
}
