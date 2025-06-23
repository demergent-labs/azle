import { execSync } from 'node:child_process';

import { expect } from '@jest/globals';
import { formatMemorySize, getRawMemorySize } from 'cuzz';

import { getCanisterConfig } from '#build/utils/get_canister_config';
import { getDfxRoot } from '#utils/dfx_root';

import { getCanisterNames } from './canister_names';

type HeapAllocations = {
    [canisterName: string]: number | null;
};

type MemorySizes = {
    [canisterName: string]: number | null;
};

type MemoryState = {
    correctness: {
        heapAllocations: HeapAllocations;
        memorySizes: MemorySizes;
    };
    fuzz: {
        heapAllocations: HeapAllocations;
        memorySizes: MemorySizes;
    };
};

export let startingMemoryState: MemoryState = {
    correctness: {
        heapAllocations: {},
        memorySizes: {}
    },
    fuzz: {
        heapAllocations: {},
        memorySizes: {}
    }
};

/**
 * Returns a snapshot of the current dfx/ICP memory size and the heap allocation for all canisters.
 */
export async function takeMemorySnapshot(): Promise<{
    heapAllocations: HeapAllocations;
    memorySizes: MemorySizes;
}> {
    const canisterNames = await getCanisterNames();

    const canisterSnapshots = await Promise.all(
        canisterNames.map(async (canisterName) => {
            const heapAllocation = getHeapAllocation(canisterName);

            console.info(
                `Canister ${canisterName} heap allocation: ${formatMemorySize(heapAllocation)}`
            );

            const memorySize = await getRawMemorySize(canisterName);

            console.info(
                `Canister ${canisterName} memory size: ${formatMemorySize(memorySize)}`
            );

            return {
                canisterName,
                heapAllocation,
                memorySize
            };
        })
    );

    const heapAllocations = canisterSnapshots.reduce<HeapAllocations>(
        (acc, { canisterName, heapAllocation }) => ({
            ...acc,
            [canisterName]: heapAllocation
        }),
        {}
    );

    const memorySizes = canisterSnapshots.reduce<MemorySizes>(
        (acc, { canisterName, memorySize }) => ({
            ...acc,
            [canisterName]: memorySize
        }),
        {}
    );

    return { heapAllocations, memorySizes };
}

/**
 * Checks the increases in memory size and heap allocation for all canisters.
 *
 * @remarks
 *
 * If a canister's heap allocation increases by more than 100_000 bytes this will throw a jest failure.
 * If a canister's memory size increases by more than 100_000 bytes and the canister's `memorySizeIncreaseExpected` is not set to true in the canister's config, this will throw a jest failure.
 */
export async function checkMemoryChanges(
    startingHeapAllocations: HeapAllocations,
    startingMemorySizes: MemorySizes
): Promise<void> {
    const canisterNames = await getCanisterNames();

    for (const canisterName of canisterNames) {
        const canisterConfig = await getCanisterConfig(canisterName);

        const clearHeapMethods = canisterConfig.custom?.clearHeapMethods;

        for (const clearHeapMethod of clearHeapMethods ?? []) {
            execSync(
                `dfx canister call ${canisterName} ${clearHeapMethod} --output json`,
                {
                    cwd: getDfxRoot(),
                    encoding: 'utf-8'
                }
            );
        }

        const finalHeapAllocation = getHeapAllocation(canisterName);
        const startingHeapAllocation = startingHeapAllocations[canisterName];

        const finalMemorySize = await getRawMemorySize(canisterName);
        const startingMemorySize = startingMemorySizes[canisterName];

        if (
            finalHeapAllocation === null ||
            startingHeapAllocation === null ||
            finalMemorySize === null ||
            startingMemorySize === null
        ) {
            throw new Error(
                `At least one of the memory sizes or heap allocations for canister ${canisterName} is null. This most likely indicates an error in fetching the data.`
            );
        }

        const heapAllocationIncrease =
            finalHeapAllocation - startingHeapAllocation;
        const heapAllocationIncreaseText =
            heapAllocationIncrease === 0
                ? 'no change'
                : heapAllocationIncrease > 0
                  ? `+${formatMemorySize(heapAllocationIncrease)}`
                  : `-${formatMemorySize(heapAllocationIncrease)}`;

        console.info(
            `Canister ${canisterName} final heap allocation: ${formatMemorySize(finalHeapAllocation)} (${heapAllocationIncreaseText})`
        );

        const memorySizeIncrease = finalMemorySize - startingMemorySize;
        const memorySizeIncreaseText =
            memorySizeIncrease === 0
                ? 'no change'
                : memorySizeIncrease > 0
                  ? `+${formatMemorySize(memorySizeIncrease)}`
                  : `-${formatMemorySize(memorySizeIncrease)}`;

        console.info(
            `Canister ${canisterName} final memory size: ${formatMemorySize(finalMemorySize)} (${memorySizeIncreaseText})`
        );

        expect(heapAllocationIncrease).toBeLessThanOrEqual(100_000);

        const memorySizeIncreaseExpected =
            canisterConfig.custom?.memorySizeIncreaseExpected === true;

        if (memorySizeIncreaseExpected === false) {
            expect(memorySizeIncrease).toBeLessThanOrEqual(100_000);
        }
    }
}

function getHeapAllocation(canisterName: string): number | null {
    try {
        return Number(
            execSync(
                `dfx canister call ${canisterName} _azle_heap_current_allocation --output json`,
                {
                    cwd: getDfxRoot(),
                    encoding: 'utf-8'
                }
            )
        );
    } catch {
        return null;
    }
}
