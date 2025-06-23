import { execSync } from 'node:child_process';

import { expect } from '@jest/globals';
import { formatMemorySize, getRawMemorySize } from 'cuzz';

import { getDfxRoot } from '#utils/dfx_root';

import { getCanisterNames } from './canister_names';
import { getCuzzConfig } from './fuzz';

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

export let memoryState: MemoryState = {
    correctness: {
        heapAllocations: {},
        memorySizes: {}
    },
    fuzz: {
        heapAllocations: {},
        memorySizes: {}
    }
};

export async function takeMemorySnapshot(): Promise<{
    heapAllocations: HeapAllocations;
    memorySizes: MemorySizes;
}> {
    const canisterNames = await getCanisterNames();

    const canisterSnapshots = await Promise.all(
        canisterNames.map(async (canisterName) => {
            const memorySize = await getRawMemorySize(canisterName);

            console.info(
                `Canister ${canisterName} memory size: ${formatMemorySize(memorySize)}`
            );

            const heapAllocation = getHeapAllocation(canisterName);

            console.info(
                `Canister ${canisterName} heap allocation: ${formatMemorySize(heapAllocation)}`
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

export async function checkMemoryChanges(
    startingHeapAllocations: HeapAllocations,
    startingMemorySizes: MemorySizes
): Promise<void> {
    const cuzzConfig = getCuzzConfig();
    const canisterNames = await getCanisterNames();

    for (const canisterName of canisterNames) {
        const finalMemorySize = await getRawMemorySize(canisterName);
        const startingMemorySize = startingMemorySizes[canisterName];

        const finalHeapAllocation = getHeapAllocation(canisterName);
        const startingHeapAllocation = startingHeapAllocations[canisterName];

        if (startingMemorySize === null || startingMemorySize === undefined) {
            console.info(
                `Canister ${canisterName} final memory size: ${formatMemorySize(finalMemorySize)} (starting size unknown)`
            );
        } else {
            const memoryIncrease =
                finalMemorySize === null
                    ? null
                    : finalMemorySize - startingMemorySize;
            const increaseText =
                memoryIncrease === null
                    ? 'unknown'
                    : memoryIncrease === 0
                      ? 'no change'
                      : memoryIncrease > 0
                        ? `+${formatMemorySize(memoryIncrease)}`
                        : `-${formatMemorySize(memoryIncrease)}`;

            console.info(
                `Canister ${canisterName} final memory size: ${formatMemorySize(finalMemorySize)} (${increaseText})`
            );
        }

        if (
            startingHeapAllocation === null ||
            startingHeapAllocation === undefined
        ) {
            console.info(
                `Canister ${canisterName} final heap allocation: ${formatMemorySize(finalHeapAllocation)} (starting size unknown)`
            );
        } else {
            const heapAllocationIncrease =
                finalHeapAllocation - startingHeapAllocation;
            const increaseText =
                heapAllocationIncrease === 0
                    ? 'no change'
                    : heapAllocationIncrease > 0
                      ? `+${formatMemorySize(heapAllocationIncrease)}`
                      : `-${formatMemorySize(heapAllocationIncrease)}`;

            console.info(
                `Canister ${canisterName} final heap allocation: ${formatMemorySize(finalHeapAllocation)} (${increaseText})`
            );
        }

        const memoryIncrease =
            finalMemorySize === null || startingMemorySize === null
                ? null
                : finalMemorySize - startingMemorySize;

        // TODO we really need to be able to set the memoryIncreaseExpected per canister right?
        // TODO maybe this should be done in the dfx.json custom section per canister?
        // TODO I don't even think cuzz does anything with this memoryIncreaseExpected
        if (cuzzConfig.memoryIncreaseExpected !== true) {
            expect(memoryIncrease).not.toBeNull();
            expect(memoryIncrease).toBeLessThanOrEqual(100_000);
        }

        const heapAllocationIncrease =
            startingHeapAllocation === null
                ? null
                : finalHeapAllocation - startingHeapAllocation;

        expect(heapAllocationIncrease).not.toBeNull();
        expect(heapAllocationIncrease).toBeLessThanOrEqual(100_000);
    }
}

function getHeapAllocation(canisterName: string): number {
    return Number(
        execSync(
            `dfx canister call ${canisterName} _azle_heap_current_allocation --output json`,
            {
                cwd: getDfxRoot(),
                encoding: 'utf-8'
            }
        )
    );
}
