import { IOType } from 'child_process';
import { readFile } from 'fs/promises';

import { CandidAndMethodMeta, CandidGen, WasmData } from '#utils/types';

import { getWasmBinary } from '../wasm_binary';
import { execute } from './execute';

/**
 * Produces the canister's Candid definition and method metadata by executing
 * a locally-prepared Wasm in a Node.js WebAssembly environment.
 *
 * Why this step exists:
 * - Azle needs the generated Candid and rich method metadata (queries/updates,
 *   indices, visibility, etc.) before deployment in order to finalize the
 *   manipulated Wasm and to write the `.did` file.
 * - The metadata is derived at runtime from the decorated canister code, so we
 *   instantiate a temporary Wasm (built with the provided `js` and `wasmData`)
 *   and ask it to emit the Candid string and method metadata.
 *
 * Behavior:
 * - Builds an instrumented Wasm via `getWasmBinary(ioType, js, wasmData)`.
 * - Executes that Wasm in-process to obtain `{ candid, methodMeta }`.
 * - If `candidGen` is `custom`, reads the Candid from `candidPath` instead of
 *   using the generated one.
 * - Returns both the Candid string and the method metadata; it does not write to
 *   disk.
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
