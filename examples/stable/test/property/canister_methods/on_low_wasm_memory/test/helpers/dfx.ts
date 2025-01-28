import { writeFile } from 'fs/promises';

/**
 * Generates and writes a dfx.json configuration file with specified memory settings.
 * This configuration is used to test the canister's behavior under different memory constraints.
 *
 * @param wasmMemoryThreshold - The to set wasm_memory_threshold in the dfx.json file
 * @param wasmMemoryLimit - The to set wasm_memory_limit in the dfx.json file
 */
export async function configureDfxJsonWasmMemorySettings(
    wasmMemoryThreshold: string | number,
    wasmMemoryLimit: string | number
): Promise<void> {
    const dfxJson = {
        canisters: {
            canister: {
                type: 'azle',
                main: 'src/index.ts',
                candid_gen: 'automatic',
                declarations: {
                    output: 'test/dfx_generated/canister',
                    node_compatibility: true
                },
                initialization_values: {
                    wasm_memory_threshold: wasmMemoryThreshold,
                    wasm_memory_limit: wasmMemoryLimit
                }
            }
        }
    };

    await writeFile('./dfx.json', JSON.stringify(dfxJson, null, 4));
}

/**
 * Resets the dfx.json configuration file to default settings.
 * This is typically called after tests to ensure a clean state.
 */
export async function resetDfxJson(): Promise<void> {
    const dfxJson = {
        canisters: {
            canister: {
                type: 'azle',
                main: 'src/index.ts',
                candid_gen: 'automatic',
                declarations: {
                    output: 'test/dfx_generated/canister',
                    node_compatibility: true
                }
            }
        }
    };
    await writeFile('./dfx.json', JSON.stringify(dfxJson, null, 4));
}
