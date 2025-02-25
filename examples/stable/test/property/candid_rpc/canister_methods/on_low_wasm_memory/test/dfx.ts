import { ActorSubclass } from '@dfinity/agent';
import { getCanisterActor } from 'azle/test';
import { execSync } from 'child_process';

export type CanisterStatus = {
    memorySize: number;
    wasmMemoryLimit: number;
    wasmMemoryThreshold: number;
};

/**
 * Gets the current status of the canister including memory information
 *
 * @returns Object containing status, memory size, and Wasm memory limit
 * @throws Error if canister doesn't exist or status can't be parsed
 */
export function getCanisterStatus(canisterName: string): CanisterStatus {
    const output = execSync(`dfx canister status ${canisterName}`, {
        encoding: 'utf-8'
    });

    const memorySizeMatch = output.match(/Memory Size: ([0-9_]+) Bytes/);
    const wasmMemoryLimitMatch = output.match(
        /Wasm memory limit: ([0-9_]+) Bytes/
    );
    const wasmMemoryThresholdMatch = output.match(
        /Wasm memory threshold: ([0-9_]+) Bytes/
    );

    if (
        memorySizeMatch === null ||
        wasmMemoryLimitMatch === null ||
        wasmMemoryThresholdMatch === null
    ) {
        throw new Error('Failed to parse canister status output');
    }

    return {
        memorySize: parseInt(memorySizeMatch[1].replace(/_/g, '')),
        wasmMemoryLimit: parseInt(wasmMemoryLimitMatch[1].replace(/_/g, '')),
        wasmMemoryThreshold: parseInt(
            wasmMemoryThresholdMatch[1].replace(/_/g, '')
        )
    };
}

/**
 * Completely removes the canister and redeploys it
 *
 * @remarks
 * This is necessary because the changes to the Wasm memory limit and threshold are only applied on canister creation.
 */
export async function deployFreshCanister<T>(
    canisterName: string,
    wasmMemoryThreshold?: string | number,
    wasmMemoryLimit?: string | number
): Promise<ActorSubclass<T>> {
    execSync(`dfx canister stop ${canisterName} || true`, {
        stdio: 'inherit'
    });
    execSync(`dfx canister delete ${canisterName} --no-withdrawal || true`, {
        stdio: 'inherit'
    });
    const wasmMemoryThresholdArg = wasmMemoryThreshold
        ? `--wasm-memory-threshold ${wasmMemoryThreshold}`
        : '';
    const wasmMemoryLimitArg = wasmMemoryLimit
        ? `--wasm-memory-limit ${wasmMemoryLimit}`
        : '';
    const noWalletArg =
        wasmMemoryLimit || wasmMemoryThreshold ? '--no-wallet' : '';
    execSync(
        `dfx canister create ${canisterName} ${noWalletArg} ${wasmMemoryThresholdArg} ${wasmMemoryLimitArg}`,
        {
            stdio: 'inherit'
        }
    );
    execSync(`dfx deploy ${canisterName}`, {
        stdio: 'inherit'
    });
    execSync(`dfx generate ${canisterName}`, {
        stdio: 'inherit'
    });
    return await getCanisterActor<T>(canisterName);
}
