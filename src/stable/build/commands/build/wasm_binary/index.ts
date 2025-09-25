import { IOType } from 'child_process';
import { existsSync } from 'fs';

import { runCommand as runDevTemplateCommand } from '#build/commands/dev/template/stable';
import { STABLE_STATIC_CANISTER_TEMPLATE_PATH } from '#utils/global_paths';
import { MethodMeta, WasmData } from '#utils/types';

import { manipulateWasmBinary } from './manipulate';

/**
 * Produces a Wasm binary by embedding the bundled JavaScript and `wasmData` into the static template.
 *
 * @remarks
 * - Validates/regenerates the static template when missing or when `AZLE_DEV_TEMPLATE === 'true'`.
 * - Embeds two passive data segments: the bundled JS and serialized `wasmData` (env vars and `mainJsPath`).
 * - When `methodMeta` is provided, injects canister method proxies to produce a deployable binary; when omitted,
 *   the binary is suitable for local introspection (e.g., to derive Candid/method metadata).
 * - Side effects: may regenerate the template on disk; the produced Wasm is returned in-memory.
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
