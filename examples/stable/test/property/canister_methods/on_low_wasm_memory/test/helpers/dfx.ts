import { ActorSubclass } from '@dfinity/agent';
import { getCanisterActor } from 'azle/test';
import { execSync } from 'child_process';

export interface CanisterStatus {
    status: string;
    memorySize: number;
    wasmMemoryLimit: number;
}

/**
 * Gets the current status of the canister including memory information
 *
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
 * Completely removes the canister and redeploys it
 *
 * @remarks
 * This is necessary because the changes to the dfx.json are only applied on canister creation.
 */
export async function deployFreshCanister<T>(
    canisterName: string,
    _wasmMemoryThreshold?: string | number,
    wasmMemoryLimit?: string | number
): Promise<ActorSubclass<T>> {
    execSync(`dfx canister stop ${canisterName} || true`, {
        stdio: 'inherit'
    });
    execSync(`dfx canister delete ${canisterName} --no-withdrawal || true`, {
        stdio: 'inherit'
    });
    // TODO: Add back in when this is resolved https://github.com/demergent-labs/azle/issues/2606
    // ${
    //     wasmMemoryThreshold
    //         ? `--wasm-memory-threshold ${wasmMemoryThreshold}`
    //         : ''
    // }
    execSync(
        `dfx canister create ${canisterName} --no-wallet ${wasmMemoryLimit ? `--wasm-memory-limit ${wasmMemoryLimit}` : ''}`,
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
