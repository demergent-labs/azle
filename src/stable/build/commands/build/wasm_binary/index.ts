import { IOType } from 'child_process';
import { existsSync } from 'fs';

import { runCommand as runDevTemplateCommand } from '#build/commands/dev/template/stable';
import { STABLE_STATIC_CANISTER_TEMPLATE_PATH } from '#utils/global_paths';
import { MethodMeta, WasmData } from '#utils/types';

import { manipulateWasmBinary } from './manipulate';

/**
 * Produces a Wasm binary by injecting the bundled JavaScript and `wasmData`
 * into the static canister template, optionally wiring in method proxies.
 *
 * Behavior:
 * - Ensures the stable static canister template exists; if not (or when
 *   `AZLE_DEV_TEMPLATE === 'true'`), regenerates it via the dev template command.
 * - Calls the Wasm manipulation step which embeds:
 *   - The bundled JavaScript as a passive data segment.
 *   - The serialized `wasmData` (env vars and `mainJsPath`) as a passive segment.
 * - If `methodMeta` is provided, injects canister method proxies into the module
 *   so the resulting binary is suitable for deployment; otherwise, the binary is
 *   suitable for local introspection (e.g., to derive Candid/method metadata).
 *
 * Side effects:
 * - May regenerate the template on disk; otherwise returns a binary in-memory.
 *
 * @param ioType - Controls the I/O mode when running the dev template command.
 * @param js - The bundled JavaScript source string to embed into the Wasm.
 * @param wasmData - Auxiliary data (env vars and `mainJsPath`) to embed.
 * @param methodMeta - Optional metadata used to inject method proxies for the final binary.
 * @returns A `Uint8Array` containing the constructed Wasm binary.
 */
export async function getWasmBinary(
    ioType: IOType,
    js: string,
    wasmData: WasmData,
    methodMeta?: MethodMeta
): Promise<Uint8Array> {
    if (
        process.env.AZLE_DEV_TEMPLATE === 'true' ||
        !existsSync(STABLE_STATIC_CANISTER_TEMPLATE_PATH)
    ) {
        await runDevTemplateCommand(ioType);
    }

    return await manipulateWasmBinary<WasmData>(
        js,
        STABLE_STATIC_CANISTER_TEMPLATE_PATH,
        wasmData,
        false,
        methodMeta
    );
}
