import { ActorSubclass } from '@dfinity/agent';
import { getCanisterActor } from 'azle/test';
import { execSync } from 'child_process';
import { writeFile } from 'fs/promises';

export interface CanisterStatus {
    status: string;
    memorySize: number;
    wasmMemoryLimit: number;
}

/**
 * Gets the current status of the canister including memory information
 * @returns Object containing status, memory size, and wasm memory limit
 * @throws Error if canister doesn't exist or status can't be parsed
 */
export function getCanisterStatus(canisterName: string): CanisterStatus {
    const output = execSync(`dfx canister status ${canisterName}`, {
        encoding: 'utf-8'
    });

    const statusMatch = output.match(/Status: ([^\n]+)/);
    const memorySizeMatch = output.match(/Memory Size: Nat\((\d+)\)/);
    const wasmMemoryLimitMatch = output.match(
        /Wasm memory limit: ([0-9_]+) Bytes/
    );

    if (!statusMatch || !memorySizeMatch || !wasmMemoryLimitMatch) {
        throw new Error('Failed to parse canister status output');
    }

    return {
        status: statusMatch[1],
        memorySize: parseInt(memorySizeMatch[1]),
        wasmMemoryLimit: parseInt(wasmMemoryLimitMatch[1].replace(/_/g, ''))
    };
}

/**
 * Generates and writes a dfx.json configuration file with specified memory settings.
 * This configuration is used to test the canister's behavior under different memory constraints.
 *
 * @param wasmMemoryThreshold - The to set wasm_memory_threshold in the dfx.json file
 * @param wasmMemoryLimit - The to set wasm_memory_limit in the dfx.json file
 */
export async function configureDfxJsonWasmMemorySettings(
    canisterName: string,
    wasmMemoryThreshold: string | number,
    wasmMemoryLimit: string | number
): Promise<void> {
    const dfxJson = {
        canisters: {
            [canisterName]: {
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
export async function resetDfxJson(canisterName: string): Promise<void> {
    const dfxJson = {
        canisters: {
            [canisterName]: {
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
    await writeFile('./dfx.json', `${JSON.stringify(dfxJson, null, 4)}\n`);
}

/**
 * Completely removes the canister and redeploys it
 *
 * @remarks
 * This is necessary because the changes to the dfx.json are only applied on canister creation.
 */
export async function deployFreshCanister<T>(
    canisterName: string
): Promise<ActorSubclass<T>> {
    execSync(`dfx canister stop ${canisterName} || true`, {
        stdio: 'inherit'
    });
    execSync(`dfx canister delete ${canisterName} --no-withdrawal || true`, {
        stdio: 'inherit'
    });
    execSync(`dfx deploy ${canisterName} --no-wallet`, {
        stdio: 'inherit'
    });
    execSync(`dfx generate ${canisterName}`, {
        stdio: 'inherit'
    });
    return await getCanisterActor<T>(canisterName);
}
